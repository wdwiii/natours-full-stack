const express = require('express');
const router = express.Router();

const tourController = require('../controllers/tourController');
router.param('id', tourController.checkID);

const { getAllTours, createTour, getTour, updateTour, deleteTour, checkBody } =
  tourController;
//=====================
//ROUTES
//=====================
router.route('/').get(getAllTours).post(checkBody, createTour);

router.route(`/:id`).get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
