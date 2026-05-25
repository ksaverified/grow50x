const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const repoRoot = path.resolve(__dirname, '..');
const docsDir = path.join(repoRoot, 'docs', 'proj');
const requiredDocs = [
  'README.md',
  'solution-overview.md',
  'tech-stack.md',
  'admin-manual.md',
  'user-manual.md',
  'financial-manual.md',
  'deployment-guide.md',
  'security-and-compliance.md',
  'documentation-agent.md',
];

function readDocs() {
  return fs.readdirSync(docsDir).filter((name) => name.endsWith('.md'));
}

function getLastModified(filePath) {
  try {
    const output = execSync(`git log -1 --format=%ci -- "${filePath}"`, {
      cwd: repoRoot,
      stdio: ['ignore', 'pipe', 'pipe'],
      encoding: 'utf8',
    }).trim();
    return output || 'unknown';
  } catch {
    return 'unknown';
  }
}

function scanFile(fileName) {
  const fullPath = path.join(docsDir, fileName);
  const content = fs.readFileSync(fullPath, 'utf8');
  const lines = content.split(/\r?\n/);
  const issues = [];
  const todoRegex = /(TODO|TBD|FIXME|review|update)/i;

  lines.forEach((line, index) => {
    if (todoRegex.test(line)) {
      issues.push({ line: index + 1, text: line.trim() });
    }
  });

  return {
    fileName,
    lastModified: getLastModified(fullPath),
    issueCount: issues.length,
    issues,
  };
}

function report() {
  const docs = readDocs();
  const missingDocs = requiredDocs.filter((name) => !docs.includes(name));
  const results = docs.map(scanFile);

  console.log('Documentation Review Report');
  console.log('============================');
  console.log(`Checked ${results.length} markdown files in docs/proj`);
  console.log('');

  if (missingDocs.length) {
    console.log('Missing recommended documents:');
    missingDocs.forEach((name) => console.log(`- ${name}`));
    console.log('');
  }

  results.forEach((result) => {
    console.log(`File: ${result.fileName}`);
    console.log(`  Last modified: ${result.lastModified}`);
    console.log(`  Issues found: ${result.issueCount}`);
    if (result.issueCount > 0) {
      result.issues.forEach((issue) => {
        console.log(`    - Line ${issue.line}: ${issue.text}`);
      });
    }
    console.log('');
  });

  const totalIssues = results.reduce((sum, item) => sum + item.issueCount, 0);
  if (totalIssues === 0) {
    console.log('No TODO/TBD/FIXME markers detected. The docs look stable from this review.');
  } else {
    console.log(`Found ${totalIssues} issue marker(s) across the docs.`);
  }

  if (missingDocs.length === 0 && totalIssues === 0) {
    console.log('Documentation steward recommendation: No changes required at this time.');
  } else {
    console.log('Documentation steward recommendation: Review missing files and issue markers above.');
  }
}

report();
