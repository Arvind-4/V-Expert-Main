import { db } from "../index.mjs";
import { v4 as uuidv4 } from "uuid";
import logger from "../utils/logger.mjs";

const createRatingService = async (body) => {
  try {
    const ratingCollection = await db.collection("ratings");
    const { name, ratingScore, review } = body;
    if (!name || !ratingScore || !review) {
      return null;
    }
    const ratingId = uuidv4();

    const ratingObj = {
      id: ratingId,
      name: name,
      rating: ratingScore,
      review: review,
    };

    await ratingCollection.set(ratingId, ratingObj);
    return ratingObj;
  } catch (e) {
    logger.error(`Enable to call DB functions ${e}`);
    return null;
  }
};

const getAllRatingService = async () => {
  const ratingsCollection = await db.collection("ratings");
  const { results } = await ratingsCollection.list();
  const ratings = await Promise.all(
    results.map(async ({ key }) => (await ratingsCollection.get(key)).props)
  );
  if (ratings) {
    return ratings;
  } else {
    return null;
  }
};

export { createRatingService, getAllRatingService };
