#!/usr/bin/env python3
"""
generate_pdf_cv.py
Clean, robust PDF generation for recruiters. No emoji/icons to avoid rendering artifacts.
Produces html/cv.pdf from `resume_data.yaml` using Jinja2 + WeasyPrint.
"""
import yaml
from jinja2 import Template
from weasyprint import HTML
import os
from typing import Dict, Any
from generate_resume import fetch_github_projects

TEMPLATE = r"""
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>{{ personal_info.name }} - CV</title>
  <style>
    @page { size: A4; margin: 2cm; }
    body { font-family: Arial, Helvetica, sans-serif; color: #222; font-size: 11pt; }
    .header { text-align: center; border-bottom: 3px solid #4ecdc4; padding-bottom: 10px; margin-bottom: 12px; }
    h1 { margin: 6px 0; font-size: 20pt; }
    .contact { font-size: 9pt; color: #555; margin-top: 6px; }
    .section { margin-top: 14px; }
    .section-title { font-weight: bold; color: #2c3e50; margin-bottom: 6px; font-size: 12pt; }
    .job { margin-bottom: 8px; }
    .job-title { font-weight: bold; }
    .company { color: #4ecdc4; font-weight: 600; }
    .meta { color: #777; font-size: 9pt; margin-bottom: 6px; }
    ul { margin: 4px 0 8px 18px; }
    .skills { display: block; font-size: 9pt; color: #333; }
    .learning-tag { display:inline-block; background:#ecf8f6; color:#0e7c6d; padding:2px 6px; border-radius:3px; margin:2px; font-size:9pt; }
  </style>
</head>
<body>
  <div class="header">
    <h1>{{ personal_info.name }}</h1>
    <div class="contact">{{ personal_info.email }} | {{ personal_info.phone }} | {{ personal_info.location }}</div>
  </div>

  <div class="section">
    <div class="section-title">Professional Summary</div>
    <div class="summary">{{ about.summary }}</div>
  </div>

  <div class="section">
    <div class="section-title">Professional Experience</div>
    {% for company in experience.corporate %}
      {% for position in company.positions %}
        <div class="job">
          <div class="job-title">{{ position.title }}</div>
          <div class="company">{{ company.company }}</div>
          <div class="meta">{{ position.duration }} | {{ position.location }} | {{ position.type }}</div>
          {% if position.responsibilities %}
          <ul>
            {% for r in position.responsibilities[:6] %}
            <li>{{ r }}</li>
            {% endfor %}
          </ul>
          {% endif %}
          {% if position.daily_stack %}
          <div class="skills"><strong>Technologies:</strong> {{ position.daily_stack[:10] | join(', ') }}</div>
          {% endif %}
        </div>
      {% endfor %}
    {% endfor %}
  </div>

  <div class="section">
    <div class="section-title">Education & Other Experience</div>
    {% for item in experience.other %}
      <div class="job">
        <div class="job-title">{{ item.title }}</div>
        <div class="company">{{ item.organization }}</div>
        <div class="meta">{{ item.duration }} | {{ item.type }}</div>
        {% if item.key_learnings %}
        <div>
          {% for k in item.key_learnings %}
            <span class="learning-tag">{{ k }}</span>
          {% endfor %}
        </div>
        {% endif %}
      </div>
    {% endfor %}
  </div>

  {% if projects and projects|length > 0 %}
  <div class="section">
    <div class="section-title">Featured Projects</div>
    {% for project in projects[:4] %}
      <div class="job">
        <div class="job-title">{{ project.name|title }}</div>
        <div class="company">{{ project.language }} | ⭐ {{ project.stars }} stars</div>
        <div class="meta">{{ project.url }}</div>
        <div style="margin-top: 4px;">{{ project.description }}</div>
        {% if project.topics %}
        <div style="margin-top: 6px;">
          {% for topic in project.topics[:5] %}
            <span class="learning-tag">{{ topic }}</span>
          {% endfor %}
        </div>
        {% endif %}
      </div>
    {% endfor %}
  </div>
  {% endif %}

</body>
</html>
"""


def load_data(path: str = 'resume_data.yaml') -> Dict[str, Any]:
    with open(path, 'r', encoding='utf-8') as f:
        return yaml.safe_load(f)


def generate_html(data: Dict[str, Any]) -> str:
    tpl = Template(TEMPLATE)
    return tpl.render(**data)


def write_pdf(html_str: str, out_path: str = 'html/cv.pdf') -> None:
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    HTML(string=html_str).write_pdf(out_path)


def main():
    data = load_data()
    
    # Fetch GitHub projects if GitHub URL is provided
    github_url = data.get("personal_info", {}).get("social", {}).get("github")
    if github_url and (not data.get("projects") or len(data.get("projects", [])) == 0):
        print("🔍 Fetching GitHub projects for PDF...")
        github_token = os.environ.get("GITHUB_TOKEN")  # Optional token for higher rate limits
        projects = fetch_github_projects(github_url, github_token)
        data["projects"] = projects
        
        if projects:
            print(f"📦 Added {len(projects)} GitHub projects to PDF")
        else:
            print("⚠️  No GitHub projects found for PDF")
    
    html = generate_html(data)
    write_pdf(html)
    print('✅ PDF generated at html/cv.pdf')


if __name__ == '__main__':
    main()
