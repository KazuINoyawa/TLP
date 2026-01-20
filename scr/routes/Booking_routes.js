const express = require('express');
const router = express.Router();
const controller = require('../controllers/Booking_controller');


router.get('/my', controller.getByUser);
router.post('/', controller.create);
router.post('/confirm/:id', controller.confirm);

module.exports = router;
