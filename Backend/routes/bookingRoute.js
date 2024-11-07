const express = require("express");
const router = express.Router();

const bookingController = require("../controller/bookingController")
// routers
router.get('/getbookingsbyuserid/:userid', bookingController.getBookingsUserId)
router.get('/getallbooking/', bookingController.getAllBooking)
router.get('/getbookingbyid/:id', bookingController.getBookingById)
router.post('/bookroom/', bookingController.bookingRoom);
router.post('/cancelbooking', bookingController.cancelBooking)
router.post('/checkoutBooking', bookingController.checkoutBooking);
router.post('/confirmbooking/:id', bookingController.confirmBooking);
router.delete('/deletebookingbyid/:id', bookingController.deleteBooking);

// Route mới để kiểm tra phòng trống
router.post('/check-availability', bookingController.checkAvailability);
router.post('/process-Payment', bookingController.processPayment);

module.exports = router;