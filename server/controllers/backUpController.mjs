import logger from "../utils/logger.mjs";
import { getAllDataService } from "../services/backUpServices.mjs";

const downloadData = async (req, res) => {
  try {
    const allData = await getAllDataService();
    if (allData)
      res.status(200).json({
        success: true,
        message: "All Data fetched",
        data: {
          bookings: allData[0],
          // users: allData[1],
          // ratings: allData[2],
        },
      });
    else
      res.status(404).json({
        success: false,
        message: "No Data found",
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

export { downloadData };
