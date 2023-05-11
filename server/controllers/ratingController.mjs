import logger from "../utils/logger.mjs";
import { createRatingService } from "../services/ratingServices.mjs";

const createRating = async (req, res) => {
  try {
    const ratingObject = await createRatingService(req.body);
    if (ratingObject)
      res.status(201).json({
        success: true,
        message: "Rating Email Sent",
        data: null,
      });
    else
      res.status(400).json({
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

export { createRating };
