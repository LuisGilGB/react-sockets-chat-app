const mongoose = require("mongoose");
const chalk = require("chalk");

const connectDB = async () => {
  try {
    console.log("Connecting with database...");
    await mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log(chalk.green("Database successfully connected"));
  } catch (err) {
    console.error(err);
    throw new Error("Database Connection Error");
  }
};

module.exports = {
  connectDB,
};
