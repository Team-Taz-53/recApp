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
    You are going to receive a query.
    You are going to receive a location.
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
    const jsonGoogleResponse = JSON.stringify(googleResponse);
    const prompt = `
    You are an expert at using the Google Places API. 
    You are an expert at recommending activities.
    You will be given an array of objects.
    The format of the array of objects will be like:

    [
    {types: ['type 1','type 2']
    formattedAddress: 'address',
    rating: number
    googleMapsUri: 'url'
    priceLevel: 'price level'
    displayName: { text: 'name', languageCode: 'language' }
    photoUrl: 'url'
    }
  ]

  For example, if one of the objects in the given array looks like this:

      [{
    types: [
      'restaurant',
      'pub',
      'bar',
      'food',
      'point_of_interest',
      'establishment'
    ],
    formattedAddress: '1407 N Orange Ave, Orlando, FL 32804, USA',
    rating: 4.7,
    googleMapsUri: 'https://maps.google.com/?cid=12957464324064300201',
    priceLevel: 'PRICE_LEVEL_INEXPENSIVE',
    displayName: { text: 'Gnarly Barley', languageCode: 'en' }
    photoUrl: 'https://places.googleapis.com/v1/places/ChIJH5pPk-h854gRqUymsSYp0rM/photos/
    }
  ]
  You will be given a user query.
   The format of the user query will be a string that includes a query and a location. For example:
    "Find cheap restaurants in Florida where I can grab a bite to eat."
    You should recognize the relevance of key phrases such as:
    "cheap" in favor of 'PRICE_LEVEL_INEXPENSIVE'
    Your objective is to decide the 3 best activities to recommend based on the user query.
    Your response should only be an array of objects
    Your response must recommend 3 objects from this user query.
    Your must not change the information inside of the user query.
    Your response must be formatted like this the same as the array of objects
    Do not include any markdown in your response.
    
    array of objects: ${jsonGoogleResponse}
    user query: ${gptResponse}
    `;
    // console.log('gptResponse', gptResponse);
    const result = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      store: true,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.2,
    });
    const gptFields = result.choices[0].message.content;
    console.log('The value of gptFields is', gptFields);
    res.locals.gptFields = gptFields;
    return next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
};
module.exports = openaiApiController;
