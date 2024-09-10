const Booking = require('../Models/bookingModel');
const Event = require('../Models/eventModel');

// Create a new booking
exports.createBooking = async (req, res) => {
  const { name, email, numberOfTickets, eventId, userId } = req.body;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const totalPrice = event.price * numberOfTickets; // Assuming `price` is in the event model

    const booking = new Booking({
      name,
      email,
      numberOfTickets,
      eventId,
      userId,
      totalPrice,
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// View all bookings
exports.viewAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('eventId');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// View a single booking by ID
exports.viewBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('eventId');
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a booking
exports.editBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    Object.assign(booking, req.body);
    await booking.save();
    res.json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a booking
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    await booking.remove();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
