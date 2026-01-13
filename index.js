// By VishwaGauravIn (https://itsvg.in)

const { TwitterApi } = require("twitter-api-v2");
const SECRETS = require("./SECRETS");

const twitterClient = new TwitterApi({
  appKey: process.env.APP_KEY,
  appSecret: process.env.APP_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
  accessSecret: process.env.ACCESS_SECRET,
});


const generationConfig = {
  maxOutputTokens: 400,
};

async function run() {
  try {
    const text = "abc";

    console.log("Generated tweet:", text);

    await sendTweet(text);
  } catch (error) {
    console.error("Error during generation or tweeting:", error);
    process.exit(1);
  }
}

run();

async function sendTweet(tweetText) {
  try {
    await twitterClient.v2.tweet(tweetText);
    console.log("Tweet sent successfully!");
  } catch (error) {
    console.error("Error sending tweet:", error);
    throw error;
  }
}
