'use strict'

const core = require('@actions/core')
const github = require('@actions/github')

async function createIssue(daysSinceRelease) {
  try {
    const token = core.getInput('github-token', { required: true })
    const octokit = github.getOctokit(token)

    const issue = await octokit.issues.create({
      ...github.context.repo,
      title: 'Release pending!',
      body: `Unreleased commits have been found which are pending since ${daysSinceRelease} days, please publish the changes`,
    })

    console.log('New issue has been created', issue.data.number)
  } catch (error) {
    core.setFailed(error.message)
  }
}

exports.createIssue = createIssue
