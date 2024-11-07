const mongoose = require('mongoose');
const { Schema } = mongoose;
const mongooseSchema = new Schema({
    room: {
        type: String, 
        require: true,
    },
    roomid: {
        type: String, 
        require: true,
    },
    userid: {
        type: String, 
        require: true,
    },
    type: {
        type: String, 
        require: true,
    },
    fromdate: {
        type: String, 
        require: true,
    },
    todate: {
        type: String, 
        require: true,
    },
    orderdate: {
        type: String, 
        require: true,
    },
    totalamount: {
        type: Number, 
        require: true,
    },
    totaldays: {
        type: Number, 
        require: true,
    },
    deposits: {
        type: Number,
        require: true, 
    },
    nameuserorder: {
        type: String, 
        require: true,
    },
    address: {
        type: String, 
        require: true,
    },
    phone: {
        type: Number, 
        require: true,
    },
    cccd: {
        type: Number, 
        require: true,
    },
    transactionId: {
        type: String, 
        require: true,
    },
    status: {
        type: String, 
        require: true,
        default: 'booked'
    },
    paymentStatus: { // Thêm trạng thái thanh toán
        type: String,
        require: true,
        default: 'unpaid' // Giá trị mặc định là 'unpaid'
    },
    requests:{
        type: String, 
        // require: true,
    },
    services:{
        type: [Schema.Types.Mixed],
    },
    imgs: [{ src: String, alt: String }],
},{
    timestamps: true,
})
const Booking = mongoose.model('bookings',mongooseSchema)
module.exports = Booking