const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello from the server', app: 'natours' });
});

app.post('/', (req, res) => res.send('You can pot to this endpoint'));

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
