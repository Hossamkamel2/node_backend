const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  products: [
    {
      product: { type: Object, required: true },
      quantity: { type: Number, required: true }
    }
  ],
  user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
  },
  date:{
    type: Date,
    required: true
  },
  status: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Order', orderSchema);