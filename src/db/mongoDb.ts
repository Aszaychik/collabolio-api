import mongoose from 'mongoose';

// mongoose
//   .connect(process.env.MONGO_DB)
//   .then(() => console.log('Database Connected'))
//   .catch((error) => console.log(error.message));

mongoose.connect(process.env.MONGO_DB);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
  console.log('Database Connected');
});

export default db;
