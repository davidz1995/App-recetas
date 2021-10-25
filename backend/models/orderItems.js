const mongoose = require('mongoose');

const orderItemsSchema = mongoose.Schema({
    product: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },
    quantity: {
        type:Number,
        required:true
    }
})

orderItemsSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

orderItemsSchema.set('toJSON', {
    virtuals:true
})

exports.OrderItems = mongoose.model('OrderItems', orderItemsSchema)
