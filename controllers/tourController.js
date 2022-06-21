const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours.json`)
);

//=====================
//ROUTE HANDLERS
//=====================
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    time: req.requestTime,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
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
    tour: tour,
  });
};

exports.createTour = (req, res) => {
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

exports.updateTour = (req, res) => {
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

exports.deleteTour = (req, res) => {
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
};
