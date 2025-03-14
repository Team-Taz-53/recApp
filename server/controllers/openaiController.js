const { json } = require('express');
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
    Limit the radius to 0 miles.
    Your response must be one sentence long.
    Your response must be a string.
    Do not include markdown in your response
    query: ${parsedQuery}
    location : ${parsedLocation}
    `;

    // console.time(openaiApiController.userQuery)
		const result = await openai.chat.completions.create({
			model: 'gpt-4o-mini',
			store: true,
			messages: [{ role: 'user', content: prompt }],
			temperature: 0, // temperature is 'sampling temperature' (between 0 and 2)- higher values like 0.8 produce more random outputs, while lower values like 0.2 make outputs more focused and deterministic.
		});
		// console.log(result.choices[0].message.content);
    // console.timeEnd(openaiApiController.userQuery)
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
    Your response should only be the indexes of the top 3 relevant places in the provided API response object.
    Your must not change the information inside of the user query.
    Your response must be formatted like this the same as the array of objects
    Do not include any markdown in your response.
    
    array of objects: ${jsonGoogleResponse}
    `;
    // console.log("prompt", prompt)
    // console.log('gptResponse', gptResponse);
    // console.time(openaiApiController.createResponse)
    const result = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      store: true,
      messages: [{ role: 'system', content: prompt }, { role: 'user', content: gptResponse }],
      temperature: 0.2,
    });
    // console.log(result)
    // console.timeEnd(openaiApiController.createResponse)
    const gptFields = result.choices[0].message.content;
    console.log('GPT FIELDS ADJFALKDAJFL;FJLSKJDLADJFSLKDJFS', gptFields)
    const indices = JSON.parse(gptFields);
    console.log(indices)
    const jsonGoogleResponseObjectified = JSON.parse(jsonGoogleResponse);
    let filteredRecs = indices.map(index => jsonGoogleResponseObjectified.places[index]);
    //! indices = [0, 3, 12]
    //! @index 0, val = 0
    //! gptFields.places[0]
    //! newList = [gptFields.places[0]]
    //! @index 1, val = 3
    //! gptFields.places[3]
    //! newList = [gptFields.places[0], gptFields.places[3]]
    //! @index 1, val = 12
    //! gptFields.places[12]
    //! newList = [gptFields.places[0], gptFields.places[3], gptFields.places[12]]
    // let filteredRecs2 = [];
    // for(let i = 0; i < indices.length; i++) {
    //   console.log('looping looping')
    //   console.log(jsonGoogleResponseObjectified.places[indices[i]]);
    //   filteredRecs2.push(jsonGoogleResponseObjectified.places[indices[i]]);
    // }

    // console.log(filteredRecs2)

    // console.log('The value of gptFields is', gptFields);
    console.log('filteredRecs',filteredRecs)
    res.locals.filteredRecs = filteredRecs;
    return next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
};
openaiApiController.createMusicResponse = async (req, res, next) => {
	try {
		const { googleResponse, gptResponse } = res.locals;
		const prompt = `
	You are an expert at using the Google Places API. 
    You are an expert at recommending activities involving music.
    You will be given an array of objects.
    These objects will contain fields such as:

    places.displayName,
    places.formattedAddress,
    places.priceLevel,
   	places.rating,
    places.types,
    places.googleMapsUri
    
    You will be given a user query.
    Your objective is to decide the 3 best activities involving music to recommend based on the user query.
    Do not include any markdown in your response.
    Your response must be an array of objects.
    Your response must maintain the same format that you were given, and leave the top 3 objects within the array that best align with the user query.
    The keys in your response should not be in quotes, example: places.rating: 4.5
    array of objects: ${googleResponse}
    user query: ${gptResponse}
    `;
		const result = await openai.chat.completions.create({
			model: `gpt-4o-mini`,
			store: true,
			messages: [{ role: 'user', content: prompt }],
			temperature: 0.2,
		});
		res.locals.gptMusicFields = result.choices[0].messages.content;
		return next();
	} catch (error) {
		return res
			.status(500)
			.json({ message: 'Internal Server Error', error: error.message });
	}
};

openaiApiController.createFoodResponse = async (req, res, next) => {
	try {
		const { googleResponse, gptResponse } = res.locals;
		const prompt = `
	You are an expert at using the Google Places API. 
    You are an expert at recommending restaurants.
    You will be given an array of objects.
    These objects will contain fields such as:

    places.displayName,
    places.formattedAddress,
    places.priceLevel,
   	places.rating,
    places.types,
    places.googleMapsUri
    
    You will be given a user query.
    Your objective is to decide the 3 best restaurants to recommend based on the user query.
    Do not include any markdown in your response.
    Your response must be an array of objects.
    Your response must maintain the same format that you were given, and leave the top 3 objects within the array that best align with the user query.
    The keys in your response should not be in quotes, example: places.rating: 4.5
    array of objects: ${googleResponse}
    user query: ${gptResponse}
    `;
		const result = await openai.chat.completions.create({
			model: `gpt-4o-mini`,
			store: true,
			messages: [{ role: 'user', content: prompt }],
			temperature: 0.2,
		});
		res.locals.gptFoodFields = result.choices[0].messages.content;
		return next();
	} catch (error) {
		return res
			.status(500)
			.json({ message: 'Internal Server Error', error: error.message });
	}
};

module.exports = openaiApiController;
