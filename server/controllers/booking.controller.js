const Booking = require('../models/booking.model');

exports.createBooking = async (req, res) => {
  try {
    const booking = await Booking.create({
      user: req.user.id,
      room: req.body.room,
      date: req.body.date
    });
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('room');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
