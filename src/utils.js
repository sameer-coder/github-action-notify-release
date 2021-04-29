const github = require('@actions/github');
const { logInfo } = require('./log');

async function createIssue(token, issueTitle, issueBody) {
  const octokit = github.getOctokit(token);

  throw 'big error'

  return await octokit.issues.create({
    ...github.context.repo,
    title: issueTitle,
    body: issueBody
  });
}

module.exports = {
  createIssue,
}
