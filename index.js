// By VishwaGauravIn (https://itsvg.in)

const GenAI = require("@google/generative-ai");
const { TwitterApi } = require("twitter-api-v2");
const SECRETS = require("./SECRETS");

const twitterClient = new TwitterApi({
  appKey: SECRETS.APP_KEY,
  appSecret: SECRETS.APP_SECRET,
  accessToken: SECRETS.ACCESS_TOKEN,
  accessSecret: SECRETS.ACCESS_SECRET,
});

const genAI = new GenAI.GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generationConfig = {
  maxOutputTokens: 400,
};

async function run() {
  try {
    const model = genAI.getGenerativeModel({
      model: "models/gemini-2.0-flash",
      generationConfig,
    });

    const prompt =
      "Generate a unique web development tip, advice, rant, or insight as a tweet. Under 280 characters, plain text, emojis allowed.";

    const result = await model.generateContent(prompt);
    const text = result.response.text();

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
