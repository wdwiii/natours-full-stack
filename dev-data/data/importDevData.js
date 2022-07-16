const dotenv = require('dotenv');

const mongoose = require('mongoose');

const fs = require('fs');

const Tour = require('../../models/tourModel');

dotenv.config({ path: `./config.env` }); //Needs to be required before it reads the app file

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    //console.log(con.connections);
  });

//Reading json file
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

//Import data into database
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data Saved');
  } catch (err) {
    console.error(err);
  }
  process.exit();
};

//Delete All Data From DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data Deleted');
  } catch (err) {
    console.error(err);
  }
  process.exit();
};

console.log('process args: ', process.argv);
if (process.argv.at(2) === '--import') {
  importData();
} else if (process.argv.at(2) === '--delete') {
  deleteData();
}
