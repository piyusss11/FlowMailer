import Agenda from 'agenda';

const agenda = new Agenda({
  db: { address: process.env.MONGO_URI as string, collection: "jobs" },
});

export default agenda;
