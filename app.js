const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

app.get(`/api/v1/tours/:id`, (req, res) => {
  const { id } = req.params;
  console.log('id: ', id);
  //console.log(tours);
  const tour = tours.filter((tour) => tour.id == id);
  console.log('tour: ', tour);
  res.status(200).json({
    status: 'success',
  });
});

app.post(`/api/v1/tours`, (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
});

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
