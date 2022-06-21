const app = require('./app');
const port = 3000;

//=====================
//LISTENER
//=====================
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
