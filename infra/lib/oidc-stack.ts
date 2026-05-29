import { Stack, StackProps, CfnOutput, Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as s3 from 'aws-cdk-lib/aws-s3';

export interface OidcStackProps extends StackProps {
  /** S3 bucket the deploy syncs to (reused for both sites). */
  bucketName: string;
  /** GitHub repos allowed to assume the role, as "owner/name". */
  githubRepos: string[];
  /**
   * Create the GitHub OIDC provider. Leave false to import the one that
   * already exists in the account (it was created by hand). Set true only
   * if the account has no token.actions.githubusercontent.com provider yet.
   */
  createProvider?: boolean;
}

export class OidcStack extends Stack {
  constructor(scope: Construct, id: string, props: OidcStackProps) {
    super(scope, id, props);

    const providerArn = `arn:aws:iam::${this.account}:oidc-provider/token.actions.githubusercontent.com`;

    const provider = props.createProvider
      ? new iam.OpenIdConnectProvider(this, 'GithubOidcProvider', {
          url: 'https://token.actions.githubusercontent.com',
          clientIds: ['sts.amazonaws.com'],
        })
      : iam.OpenIdConnectProvider.fromOpenIdConnectProviderArn(this, 'GithubOidcProvider', providerArn);

    // Trust: only the listed repos, only the STS audience.
    const principal = new iam.OpenIdConnectPrincipal(provider, {
      StringEquals: {
        'token.actions.githubusercontent.com:aud': 'sts.amazonaws.com',
      },
      StringLike: {
        'token.actions.githubusercontent.com:sub': props.githubRepos.map((r) => `repo:${r}:*`),
      },
    });

    const role = new iam.Role(this, 'GithubActionsDeployRole', {
      assumedBy: principal,
      description: 'GitHub Actions OIDC deploy role (S3 + CloudFront) for resume + devouch homepage',
      maxSessionDuration: Duration.hours(1),
    });

    // S3: read/write the site bucket (covers sync --delete).
    const bucket = s3.Bucket.fromBucketName(this, 'SiteBucket', props.bucketName);
    bucket.grantReadWrite(role);

    // CloudFront: the deploy lists distributions then invalidates the matched one.
    role.addToPolicy(
      new iam.PolicyStatement({
        sid: 'CloudFrontList',
        actions: ['cloudfront:ListDistributions'],
        resources: ['*'],
      }),
    );
    role.addToPolicy(
      new iam.PolicyStatement({
        sid: 'CloudFrontInvalidate',
        actions: ['cloudfront:CreateInvalidation'],
        resources: [`arn:aws:cloudfront::${this.account}:distribution/*`],
      }),
    );

    new CfnOutput(this, 'RoleArn', {
      value: role.roleArn,
      description: 'Set as AWS_ROLE_TO_ASSUME secret in simonloach/resume-online and devouch/homepage',
    });
  }
}
