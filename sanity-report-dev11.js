const dotenv = require("dotenv");
const fs = require("fs");

dotenv.config();

const user1 = process.env.USER1;
const user2 = process.env.USER2;
const user3 = process.env.USER3;
const user4 = process.env.USER4;

const mochawesomeJsonOutput = fs.readFileSync(
  "./mochawesome-report/mochawesome.json",
  "utf8"
);
const mochawesomeReport = JSON.parse(mochawesomeJsonOutput);

const totalTests = mochawesomeReport.stats.tests;
const passedTests = mochawesomeReport.stats.passes;
const failedTests = mochawesomeReport.stats.failures;

let durationInSeconds = Math.floor(mochawesomeReport.stats.duration / 1000);
const durationInMinutes = Math.floor(durationInSeconds / 60);
durationInSeconds %= 60;

const resultMessage =
  passedTests === totalTests
    ? `:white_check_mark: Success (${passedTests} / ${totalTests} Passed)`
    : `:x: Failure (${passedTests} / ${totalTests} Passed)`;

const pipelineName = process.env.GO_PIPELINE_NAME;
const pipelineCounter = process.env.GO_PIPELINE_COUNTER;
const goCdServer = process.env.GOCD_SERVER;

const reportUrl = `http://${goCdServer}/go/files/${pipelineName}/${pipelineCounter}/sanity/1/sanity/test-results/mochawesome-report/sanity-report.html`;

let tagUsers = ``;
if (failedTests > 0) {
  tagUsers = `<@${user1}> <@${user2}> <@${user3}> <@${user4}>`;
}

const slackMessage = {
  text: `Dev11, SDK-Marketplace Sanity
*Result:* ${resultMessage}. ${durationInMinutes}m ${durationInSeconds}s
*Failed Tests:* ${failedTests}
<${reportUrl}|View Report>
${tagUsers}`,
};

const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;

const sendSlackMessage = async (message) => {
  const payload = {
    text: message,
  };

  try {
    const response = await fetch(slackWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Error sending message to Slack: ${response.statusText}`);
    }

    console.log("Message sent to Slack successfully");
  } catch (error) {
    console.error("Error:", error);
  }
};
sendSlackMessage(slackMessage.text);
