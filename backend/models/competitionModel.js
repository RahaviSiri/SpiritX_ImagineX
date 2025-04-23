import mongoose from 'mongoose';

const competitionSchema = new mongoose.Schema({
  posterImage: {
    type: String,
    required: true,
  },
  registrationLink: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Competition = mongoose.model('Competition', competitionSchema);
export default Competition;
