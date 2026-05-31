const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  phone: { type: String, required: true, trim: true, maxlength: 20 },
  propertyInterest: { type: String, required: true, trim: true },
  budget: { type: String, required: true, trim: true },
  message: { type: String, trim: true, maxlength: 1000, default: '' },
  source: {
    type: String,
    enum: ['landing_page', 'contact_form', 'whatsapp', 'other'],
    default: 'landing_page',
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'viewing_scheduled', 'converted', 'lost'],
    default: 'new',
  },
}, { timestamps: true });

leadSchema.index({ status: 1, createdAt: -1 });
leadSchema.index({ phone: 1 });

module.exports = mongoose.model('Lead', leadSchema);
