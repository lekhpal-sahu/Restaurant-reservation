import mongoose from "mongoose";

export const dbConnection = () => {
  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI is missing. Add it to backend/config/config.env.");
    return;
  }

  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "RESERVATIONS",
      serverSelectionTimeoutMS: 10000,
    })
    .then(() => {
      console.log("Connected to database!");
    })
    .catch((err) => {
      console.error("Could not connect to MongoDB.");
      console.error(`Reason: ${err.message}`);

      if (err.message.includes("querySrv")) {
        console.error(
          "MongoDB Atlas SRV lookup failed. Check that MONGO_URI has the exact cluster hostname from Atlas and that your DNS/network allows SRV lookups."
        );
      }
    });
};
