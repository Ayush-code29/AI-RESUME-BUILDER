
require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

const PORT = Number.parseInt(process.env.PORT, 10) || 5000;

const startServer = async () => {
  try {
    await connectDB();

    const server = app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/api/health`);
      console.log(`Resume API: http://localhost:${PORT}/api/resumes`);
    });

    const shutdown = (signal) => {
      console.log(`${signal} received. Closing server...`);

      server.close(async () => {
        const mongoose = require("mongoose");
        await mongoose.connection.close();
        process.exit(0);
      });
    };

    process.on("SIGINT", () => shutdown("SIGINT"));
    process.on("SIGTERM", () => shutdown("SIGTERM"));
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();