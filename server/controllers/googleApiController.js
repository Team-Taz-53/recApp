require('dotenv').config();

const googleApiController = {};

googleApiController.getEvents = async (req, res, next) => {
  try {
    const { gptResponse } = res.locals;

    const url = 'https://places.googleapis.com/v1/places:searchText';

    // const requestBody = {
    //   textQuery: `Find dog-friendly restaurants in Florida where I can grab a bite to eat.`,
    // };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': process.env.GOOGLE_API_KEY,
        'X-Goog-FieldMask': `places.displayName,places.formattedAddress,places.priceLevel,places.rating,places.types,places.googleMapsUri`,
      },
      body: JSON.stringify({ textQuery: gptResponse }),
    });

    const data = await response.json();
    console.log('data.places', data.places);
    res.locals.googleResponse = data
    return next();
  } catch (err) {
    return next({
      log: 'You are receiving an error from the googleApiController.getEvents',
      status: 500,
      message: { err: 'This is a 500 error message' },
    });
  }
};

module.exports = googleApiController;
