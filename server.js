const dotenv = require('dotenv');
dotenv.config({ path: `./config.env` }); //Needs to be required before it reads the app file

const app = require('./app');
const port = process.env.PORT || 3000;

//=====================
//LISTENER
//=====================
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
