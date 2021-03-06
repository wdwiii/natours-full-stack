const fs = require('fs');

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`)
);

//=====================
//ROUTE HANDLERS
//=====================
exports.checkID = (req, res, next, val) => {
  const id = +req.params.id;
  if (id > users.length) {
    return res
      .status(404)
      .json({ status: 'failed', message: 'The user cannot be found' });
  }
  next();
};

exports.getAllUsers = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: { users },
  });
};

exports.getUser = (req, res) => {
  const user = users.find((user) => user.id === id);
  res.status(200).json({
    status: 'success',
    retrievedAt: new Date().toISOString(),
    user: user,
  });
};

exports.createUser = (req, res) => {
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

exports.updateUser = (req, res) => {
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

exports.deleteUser = (req, res) => {
  exports.user = users.find((user) => user.id === id);
  res.status(200).json({
    message: 'User deleted',
    name: user.name,
    id: id,
    data: null,
  });
};
