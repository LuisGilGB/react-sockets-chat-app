const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Database successfully connected");
  } catch (err) {
    console.error(err);
    throw new Error("Database Connection Error");
  }
};

module.exports = {
  connectDB,
};
