require("dotenv").config();
const express = require("express");
const { logger } = require("./src/logger/logger");
const cors = require("cors");
const { checkDBConnection } = require("./src/db/models/index");
const { gracefulShutDown } = require("./src/helper/gracefulShutdown.helper.js");
const { userRouter } = require("./src/routes/user.route.js");
const { roleRouter } = require("./src/routes/role.route.js");
const { adminRouter } = require("./src/routes/admin.route.js");
const { authMiddleware } = require("./src/middleware/authentication/authentication.middleware.js");

(async () => {
     try {
          const app = express();
          app.use(express.json());
          const corsOptions = {
               credentials: true,
               origin: "*",
               methods: ["GET, POST, PUT, PATCH, DELETE"],
          };
          app.use(cors(corsOptions));
          await checkDBConnection();
          app.use("/", userRouter);
          app.use("/role", authMiddleware, roleRouter);
          app.use("/admin", authMiddleware, adminRouter);
          const PORT = process.env.PORT || 3000;
          app.listen(PORT, () => logger.info(`server - Server running on port ${PORT}`));
     } catch (err) {
          logger.error(`server - Exception while running server - ${err.message}`);
          process.exit(1);
     }
})();

process.on("SIGTERM", gracefulShutDown);
process.on("SIGINT", gracefulShutDown);
