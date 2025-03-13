require('dotenv').config();

const googleApiController = {};

googleApiController.getEvents = async (req, res, next) => {
  try {
    const { gptResponse } = res.locals;

    const url = 'https://places.googleapis.com/v1/places:searchText';

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': process.env.GOOGLE_API_KEY,
        'X-Goog-FieldMask': `places.displayName,places.formattedAddress,places.priceLevel,places.rating,places.types,places.googleMapsUri,places.photos`,
      },
      body: JSON.stringify({ textQuery: gptResponse }),
    });

    const data = await response.json();

    if (!data.places) {
      return res.status(404).json({ message: 'No places found' });
    }
    data.places.map((place) => {
      if (place.photos && place.photos.length > 0) {
        place.photoUrl = `https://places.googleapis.com/v1/${place.photos[0].name}/media?maxWidthPx=400&key=${process.env.GOOGLE_API_KEY}`;
      }
    });
    // console.log('data.places.photos', data.places);
    res.locals.googleResponse = data;
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
