import logger from "./utils/logger.mjs";
import { app } from "./app.mjs";
import { PORT } from "./constants/index.mjs";

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
