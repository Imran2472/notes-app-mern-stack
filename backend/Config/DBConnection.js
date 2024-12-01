import mongoose from "mongoose";

const DBConnect = async () => {
  try {
    await mongoose.connect(
      `${process.env.MONGOURI}`,
      {
        dbName: "Notes_App",
      },
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
};

export default DBConnect;
