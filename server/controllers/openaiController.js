const OpenAI = require('openai');

require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const openaiApiController = {};

openaiApiController.userQuery = async (req, res, next) => {
  try {
    const { parsedQuery, parsedLocation } = res.locals;

    const prompt = `
    You are a genius at writing prompts for the google places api.
    You must create a prompt that will contain a query and a location. example: i want pizza near new york.
    You are going to receieve a query.
    You are going to receieve a location.
    Your response must be one sentence long.
    Your response must be a string.
    Do not include markdown in your response
    query: ${parsedQuery}
    location : ${parsedLocation}
    `;
    const result = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      store: true,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0, // temperature is 'sampling temperature' (between 0 and 2)- higher values like 0.8 produce more random outputs, while lower values like 0.2 make outputs more focused and deterministic.
    });
    // console.log(result.choices[0].message.content);
    res.locals.gptResponse = result.choices[0].message.content;
    return next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
};

openaiApiController.createResponse = async (req, res, next) => {
  try {
    const { googleResponse, gptResponse } = res.locals;
    const prompt = `
    You are an expert at using the Google Places API. 
    You are an expert at recommending activities.
    You will be given an array of objects.
    These objects will contain fields such as:

    places.displayName,
    places.formattedAddress,
    places.priceLevel,
    places.rating,
    places.types,
    places.googleMapsUri
    
    You will be given a user query.
    Your objective is to decide the 3 best activities to recommend based on the user query.
    Do not include any markdown in your response.
    Your response must be an array of objects.
    Your response must maintain the same format that you were given, and leave the top 3 objects within the array that best align with the user query.
    The keys in your response should not be in quotes, example: places.rating: 4.5
    array of objects: ${googleResponse}
    user query: ${gptResponse}
    `;
    const result = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      store: true,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.2,
    });
    console.log('THIS IS GONNA BE AN ARRAY OF 3 OBJECTS', result.choices[0].message.content);
    res.locals.gptFields = result.choices[0].message.content;
    return next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
};
module.exports = openaiApiController;
