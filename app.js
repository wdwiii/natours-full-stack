const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello from Middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours.json`)
);
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    time: req.requestTime,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  const id = +req.params.id;
  const tour = tours.find((tour) => tour.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'failed',
      message: `Tour with id: ${id} is not found.`,
    });
  }

  res.status(200).json({
    status: 'success',
    data: { tour },
  });
};

const createTour = (req, res) => {
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
};

const updateTour = (req, res) => {
  const id = +req.params.id;
  // const tour = tours.find((tour) => tour.id === id);
  // if (!tour) {
  if (id > tours.length) {
    return res.status(404).json({
      status: 'failed',
      message: 'The tour you are looking for can not be found',
    });
  }
  res.status(200).json({
    status: 'success',
    data: { tour: '<UPDATED TOUR HERE>' },
  });
};

const deleteTour = (req, res) => {
  const id = +req.params.id;
  if (id > tours.length) {
    return res.status(404).json({
      status: 'failed',
      message: 'The tour you are looking for can not be found',
    });
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
  console.log({
    status: 'success',
    id: id,
    data: null,
  });
};

// app.get('/api/v1/tours', getAllTours);
// app.post(`/api/v1/tours`, createTour);
// app.get(`/api/v1/tours/:id`, getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

app.route('/api/v1/tours').get(getAllTours).post(createTour);

app
  .route(`/api/v1/tours/:id`)
  .get(getTour)
  .patch(createTour)
  .delete(deleteTour);

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
