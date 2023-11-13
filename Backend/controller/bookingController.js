const Booking = require("../models/booking");   
const Room = require("../models/room");
const Receipt = require("../models/receipt");

const bookingController = {
    // create booking
    bookingRoom: async(req, res) => {
        const {room,
            userid,
            fromdate,
            todate,
            type,
            totaldays,
            totalamount,
            orderdate,
            address,
            phone,
            cccd,
            deposits,
            requests,
            nameuserorder,} = req.body;
        try {
            // add currentBooking for room
            const roomtemp = await Room.findOne({_id: room._id});

            var availability = false;
            if (roomtemp.currentBooking.length !== 0) {
               roomtemp.currentBooking.forEach((currentBookingVal) => {
                if (!((fromdate > currentBookingVal.fromdate) && (fromdate < currentBookingVal.todate))
                        && !((todate > cucrrentBookingVal.fromdate) && (todate < currentBookingVal.todate)))
                        {
                            if ((fromdate !== currentBookingVal.fromdate) 
                                && (fromdate !== currentBookingVal.todate) 
                                && (todate !== currentBookingVal.fromdate)
                                && (todate !== currentBookingVal.todate))
                                {availability = true}
                        }
                }) 
            } else {availability=true}
            
            console.log("booking booking");

            if (availability) {
                const newbooking = new Booking({
                    room : room.name,
                    roomid: room._id,
                    userid,
                    fromdate,
                    todate,
                    orderdate,
                    totalamount,
                    totaldays,
                    nameuserorder,
                    address,
                    phone,
                    type,
                    deposits : deposits,
                    cccd,
                    transactionId: '1234',
                    requests,
                })
                const booking = await newbooking.save();
                roomtemp.currentBooking.push({
                    bookingid: booking._id,
                    deposits,
                    fromdate,
                    todate,
                    userid,
                    status: booking.status,
                });
                await roomtemp.save();
    
                return res.status(200).json(true);
            }
            return res.status(200).json(false);
        } catch (error) {
            return res.status(400).json({message:error});
        }
    },

// create receipt
// createReceipt : async(req,res) =>{
//     const {
//         name,
//         branch,
//         nameEmployee,
//         note,
//         price,
//         type,
//         date,
//         isPayment} = req.body;
//     try {
//         console.log("add receipt ")
//         const newreceipt = new Receipt({
//             name,
//             branch,
//             nameEmployee,
//             note,
//             price,
//             type,
//             date,
//             isPayment,});
        
//         const receipt = await newreceipt.save();

//         const receipts = await Receipt.find({});
//         return res.json(receipts);
//         } catch (error) {
//             console.log(error);
//         }
//     },

    checkoutBooking: async(req, res) => {
        console.log("checkout booking")
        const {booking} = req.body;
        try {
            const room = await Room.findOne({_id: booking.roomid})
            console.log("room:",room);
            // create receipt
            const receipts = await Receipt.find({}) 
            const newreceipt = new Receipt({
                name: "TM0000" + receipts.length,
                branch: room.branch,
                nameEmployee: booking.nameuserorder,
                note: "",
                price: booking.totalamount,
                type: "Tiền khách hàng thanh toán phòng",
                date: booking.orderdate,
                isPayment: false,
            });
            const receipt = await newreceipt.save();

            console.log("receipt",newreceipt);
            // xóa booking
            const bookingdel = await Booking.findByIdAndDelete(booking._id);
            // xóa currentbooking of room
            const bookingRoom = room.currentBooking
            const temp =  bookingRoom.filter(bookingVal => bookingVal.bookingid.toString()!==booking._id)
            room.currentBooking = temp;
            await room.save();
            return res.status(200).json(true);
        } catch (error) {
            console.log(error);
        }
    },




    // Get all booking of user by id
    getBookingsUserId : async(req,res) => {
        const userid = req.params.userid;
        try {
            const bookings = await Booking.find({userid: userid})
            res.send(bookings)
        } catch (error) {
            return res.status(400).json({message:error});
        }
    },
    // Get a booking
    getBookingById : async(req,res) => {
        // const userid = req.params.userid;
        try {
            const bookings = await Booking.find({_id: req.params.id})
            res.send(bookings)
        } catch (error) {
            return res.status(400).json({message:error});
        }
    },
    // Cancel booking
    cancelBooking : async(req, res) => {
        const {bookingid, roomid} = req.body
        console.log(bookingid, roomid);
        try {
            const bookingitem = await Booking.findOne({_id: bookingid})
            bookingitem.status = 'cancelled'
            await bookingitem.save()

            const room = await Room.findOne({_id: roomid})
            const bookingRoom = room.currentBooking
            const temp =  bookingRoom.filter(booking => booking.bookingid.toString()!==bookingid)
            room.currentBooking = temp

            await room.save()
            res.send('Cancel booking successful')
        } catch (error) {
            return res.status(400).json({message:error});
        }
    },
    // Get all booking
    getAllBooking : async(req, res) => {
        try {
            const bookings = await Booking.find({})      
            return res.json(bookings);      
        } catch (error) {
            return res.status(400).json({message:error});
        }
    },
    // delete room by id
    deleteBooking: async(req, res) => {
    console.log("delete booking");
    // console.log(req.params.id)
    try {
        const bookingdel = await Booking.findByIdAndDelete(req.params.id);
        res.send("delete booking successfully");
    } catch (error) {
        return res.status(400).json({message:error});
    }
    },
 }
module.exports = bookingController;