import logger from "./utils/logger.mjs";
import { app } from "./app.mjs";
import { PORT, DB } from "./constants/index.mjs";
import DynamoDb from "cyclic-dynamodb";

const db = DynamoDb(DB);
export { db };

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
