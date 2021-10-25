const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    image: {
        type:String,
        default:''
    },
    countInStock: Number,
    description: {
        type: String,
        required:true
    },
    price: {
        type: Number,
        default: 0
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required: true
    },
    isFeatured:{
        type:Boolean,
        default: false
    },
    dateCreated:{
        type:Date,
        default: Date.now
    }
})

productSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

productSchema.set('toJSON', {
    virtuals:true
})

exports.Product = mongoose.model('Product', productSchema)
