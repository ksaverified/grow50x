# Documentation Agent

## Purpose

The Documentation Agent is a lightweight steward for the `docs/proj` folder. It is responsible for checking the documentation set on a regular basis, identifying missing documents, stale content markers, and review opportunities.

## Responsibilities

- Verify that all core documentation files are present.
- Scan documents for TODOs, TBDs, and FIXME markers.
- Report files that may need updates or removal.
- Run automatically once per day via scheduled automation.

## How it works

1. A review script (`scripts/docs-review.js`) scans `docs/proj`.
2. The script checks each Markdown file for issue markers and last Git commit dates.
3. A daily scheduled workflow runs the script automatically.
4. If issues are found, the workflow output will call attention to the affected documents.

## Usage

Run the steward locally:

```bash
npm run docs:review
```

## Future enhancements

- Add file relevance checks against the live application.
- Generate a daily change log or pull request with documentation updates.
- Add inline review suggestions for sections that have not been updated recently.
