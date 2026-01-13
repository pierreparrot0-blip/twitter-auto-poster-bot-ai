// By VishwaGauravIn (https://itsvg.in)

const { TwitterApi } = require("twitter-api-v2");

const twitterClient = new TwitterApi({
  appKey: process.env.APP_KEY,
  appSecret: process.env.APP_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
  accessSecret: process.env.ACCESS_SECRET,
});

async function run() {
  try {
    const text = "abc";
    console.log({
  appKey: !!process.env.APP_KEY,
  appSecret: !!process.env.APP_SECRET,
  accessToken: !!process.env.ACCESS_TOKEN,
  accessSecret: !!process.env.ACCESS_SECRET,
});

    console.log("Tweet content:", text);

    await sendTweet(text);
  } catch (error) {
    console.error("Error during tweeting:", error);
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
