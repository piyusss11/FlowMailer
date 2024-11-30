import Agenda from "agenda";
import mongoose from "mongoose";

const agenda = new Agenda({
  db: { address: process.env.MONGO_URI as string, collection: "jobs" },
});
let isConnected = false;
agenda
  .on("ready", () => {
    isConnected = true;
    console.log("Agenda is connected to the database");
  })
  .on("error", (err) => {
    console.error("Agenda connection error:", err);
    isConnected = false;
  });

export const startAgenda = async () => {
  try {
    if (!mongoose.connection.readyState) {
      throw new Error(
        "MongoDB is not connected. Please connect to MongoDB before starting Agenda."
      );
    }

    if (!isConnected) {
      await agenda.start();
      console.log("Agenda started");
    }
  } catch (err) {
    console.log(err, "bt in agenda");
  }
};
export default agenda;
