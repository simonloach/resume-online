#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { OidcStack } from '../lib/oidc-stack';

const app = new cdk.App();

new OidcStack(app, 'ResumeOidcStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION ?? 'eu-central-1',
  },
  bucketName: app.node.tryGetContext('bucketName') ?? 'simon-resume-bucket',
  githubRepos: ['simonloach/resume-online', 'devouch/homepage'],
  // Provider already exists (created by hand). Pass -c createProvider=true only if it doesn't.
  createProvider: app.node.tryGetContext('createProvider') === 'true',
});
