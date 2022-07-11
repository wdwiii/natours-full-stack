const mongoose = require('mongoose');

const dotenv = require('dotenv');

dotenv.config({ path: `./config.env` }); //Needs to be required before it reads the app file

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => {
    console.log(con.connections);
  });

const port = process.env.PORT || 3000;

const toursSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A name is required'],
    unique: true,
  },
  rating: { type: Number, required: false, default: 4.5 },
  price: { type: Number, required: [true, 'A price is required'] },
});

const Tour = mongoose.model('Tour', toursSchema);

//=====================
//LISTENER
//=====================
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
