import mongoose from 'mongoose';

const clubSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  city: String,
  description: String,
  location: {
    lat: Number,
    lng: Number,
  },
  competitions: [String]
});

const Club = mongoose.model('Club', clubSchema);

export default Club;
