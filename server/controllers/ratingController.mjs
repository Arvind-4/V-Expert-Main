import logger from "../utils/logger.mjs";
import {
  createRatingService,
  getAllRatingService,
} from "../services/ratingServices.mjs";

const createRating = async (req, res) => {
  try {
    const ratingObject = await createRatingService(req.body);
    if (ratingObject)
      res.status(201).json({
        success: true,
        message: "Rating Created",
        data: ratingObject,
      });
    else
      res.status(404).json({
        success: false,
        message: "Unable to create rating",
        data: null,
      });
  } catch (e) {
    logger.error(`Enable to call DB functions ${e}`);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      data: null,
    });
  }
};

const getAllRatings = async (req, res) => {
  try {
    const allRatings = await getAllRatingService();
    if (allRatings)
      res.status(200).json({
        success: true,
        message: "Ratings fetched",
        data: allRatings,
      });
    else
      res.status(404).json({
        success: false,
        message: "No Ratings found",
        data: null,
      });
  } catch (e) {
    logger.error(`Enable to call DB functions ${e}`);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      data: null,
    });
  }
};
export { createRating, getAllRatings };
