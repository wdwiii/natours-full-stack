const { application } = require('express');
const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

const app = express();
const port = 3000;

//=====================
//MIDDLEWARE
//=====================
app.use(express.json());

// app.use((req, res, next) => {
//   console.log('Hello from Middleware');
//   next();
// });

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use(morgan('dev'));

//READ TOURS.JSON FILE
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours.json`)
);

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/users.json`)
);

//=====================
//ROUTE HANDLERS
//=====================
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
};

const getAllUsers = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: { users },
  });
};

const getUser = (req, res) => {
  const id = +req.params.id;
  if (id > users.length) {
    res.status(404).json({
      status: 'failed',
      message: 'User does not exist',
    });
  }

  const user = users.find((user) => user.id === id);
  res.status(200).json({
    status: 'success',
    retrievedAt: new Date().toISOString(),
    data: user,
  });
};

const createUser = (req, res) => {
  const newId = users[users.length] + 1;
  const newUser = Object.assign({ id: newId }, req.body);
  users.push(newUser);
  fs.writeFile(
    `${__dirname}/dev-data/dev/users.json`,
    JSON.stringify(users),
    (err) => {
      res.status(201).json({
        message: 'New user created',
        data: { newUser },
      });
    }
  );
};

const updateUser = (req, res) => {
  const id = +req.params.id;
  if (id > users.length) {
    res.status(404).json({
      status: 'Not Found',
      message: 'You have entered an invalid id',
    });
  }
  const user = users.find((user) => user.id === id);
  const newUser = Object.assign(
    { name: 'Willie Whitfield', role: 'Admin' },
    req.body
  );
  res.status(200).json({
    status: 'success',
    message: 'User has been updated',
    updatedAt: new Date().toISOString(),
    data: { user: newUser },
  });
};

const deleteUser = (req, res) => {
  const id = +req.params.id;
  if (id > users.length) {
    res.status(404).json({
      status: 'Not Found',
      message: 'You have entered an invalid id',
    });
  }
  const user = users.find((user) => user.id === id);
  res.status(200).json({
    message: 'User deleted',
    name: user.name,
    id: id,
    data: null,
  });
};

//=====================
//ROUTES
//=====================

//** Tours **//
app.route('/api/v1/tours').get(getAllTours).post(createTour);

app
  .route(`/api/v1/tours/:id`)
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

//** Users **//
app.route(`/api/v1/users`).get(getAllUsers).post(createUser);
app
  .route('/api/v1/users/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

// app
//   .route(`/api/v1/users/:id`)
//   .get(getUser)
//   .patch(updateUser)
//   .delete(deleteUser);

//=====================
//LISTENER
//=====================
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
