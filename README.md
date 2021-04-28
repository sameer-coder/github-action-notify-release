# github-action-notify-release

## Usage
Configure this action in your workflows providing the inputs described below in order to get notified in `x` days after teh repo has been updated but no npm release has happened.

### `github-token`
**Required** A GitHub token. See below for additional information.

### `days-to-ignore: 0`
_Optional_ The number of days after which unreleased commits should be considered stale and should notify for a release. Default is `7`.

## Notes
- Checks and compares npm last modified date and git latest repo update.
- If the repo doesn't have an npm package linked the run will exit with a warning log.
- A GitHub token is automatically provided by Github Actions, which can be accessed using `secrets.GITHUB_TOKEN` and supplied to the action as an input `github-token`.
- The example below sets a scheduled job to happen once a day that checks for a stale release. Adjust to the desired frequency.

## Example
```
name: notify-pending-release
on:
  workflow_dispatch:
    branches:
      - main
  schedule:
    - cron: '30 8 * * *'
jobs:
  setup:
    runs-on: ubuntu-latest
    steps:
      - name: Notify pending release
        id: notify
        uses: nearform/github-action-notify-release@main
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          days-to-ignore: 7
```
