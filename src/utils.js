'use strict'

const core = require('@actions/core');
const github = require('@actions/github');
const { logInfo } = require('./log');

async function createIssue(token, issueTitle, issueBody) {
  try {
    const octokit = github.getOctokit(token);

    logInfo(issueBody);

    const response = await octokit.issues.create({
      ...github.context.repo,
      title: issueTitle,
      body: issueBody
    });
    console.log({response});
    return response;
  } catch (error) {
    console.log({error});
    core.setFailed(error.message);
  }
}

module.exports = {
  createIssue,
}
