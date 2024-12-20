const Booking = require("../models/booking");
const Room = require("../models/room");
const Receipt = require("../models/receipt");

const bookingController = {
    // Kiểm tra tình trạng đặt phòng
    checkAvailability: async (roomId, fromDate, toDate) => {
        try {
            const room = await Room.findOne({ _id: roomId });
            const currentBookings = room.currentBooking || [];

            // Kiểm tra sự có mặt của booking trong khoảng thời gian đã chọn
            for (const currentBooking of currentBookings) {
                const isOverlapping = !((fromDate > currentBooking.fromdate && fromDate >= currentBooking.todate) ||
                    (toDate < currentBooking.fromdate && toDate <= currentBooking.todate));
                if (isOverlapping) {
                    return false; // Phòng không có sẵn
                }
            }
            return true; // Phòng có sẵn
        } catch (error) {
            console.error("Lỗi kiểm tra tình trạng đặt phòng:", error);
            throw new Error('Lỗi server');
        }
    },

//     create booking
    bookingRoom: async (req, res) => {
        console.log("ooooooooooooooooooooooo");
        const {
            room,
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
            services,
            deposits,
            requests,
            status,
            nameuserorder,
        } = req.body;

        try {
            // Kiểm tra tình trạng đặt phòng
            const isAvailable = await bookingController.checkAvailability(room._id, fromdate, todate);

            if (!isAvailable) {
                return res.status(200).json(false); // Phòng đã được đặt
            }

            // Tạo mới booking nếu phòng trống
            const newbooking = new Booking({
                room: room.name,
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
                services,
                type,
                deposits: deposits,
                cccd,
                transactionId: '1234',
                requests,
                status: status || "booked",
                paymentStatus: "unpaid",
                imgs: room.imgs.map(img => ({ src: img.src, alt: img.alt }))
            });

            const booking = await newbooking.save();
            const roomtemp = await Room.findOne({ _id: room._id });

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
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    },

    checkoutBooking: async (req, res) => {
        console.log("checkout booking");
        const { booking } = req.body;
        try {
            const room = await Room.findOne({ _id: booking.roomid });
            console.log("room:", room);
            // create receipt
            const receipts = await Receipt.find({});
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

            console.log("receipt", newreceipt);
            // xóa booking
            const bookingdel = await Booking.findByIdAndDelete(booking._id);
            // xóa currentbooking of room
            const bookingRoom = room.currentBooking;
            const temp = bookingRoom.filter(bookingVal => bookingVal.bookingid.toString() !== booking._id);
            room.currentBooking = temp;
            await room.save();
            return res.status(200).json(true);
        } catch (error) {
            console.log(error);
        }
    },

    // Get all booking of user by id
    getBookingsUserId: async (req, res) => {
        const userid = req.params.userid;
        try {
            const bookings = await Booking.find({ userid: userid });
            res.send(bookings);
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    },


    // Get a booking
    getBookingById: async (req, res) => {
        try {
            const bookings = await Booking.find({ _id: req.params.id });
            res.send(bookings);
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    },


    // Get all booking
    getAllBooking: async (req, res) => {
        try {
            const bookings = await Booking.find({});
            return res.json(bookings);
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    },


    // Delete booking by id
    deleteBooking: async (req, res) => {
        console.log("delete booking");
        try {
            const bookingitem = await Booking.findOne({ _id: req.params.id });
            const room = await Room.findOne({ _id: bookingitem.roomid });

            const bookingRoom = room.currentBooking;
            if (bookingRoom.length > 0) {
                let temp = [];
                temp = bookingRoom.filter(booking => booking.bookingid.toString() !== req.params.id);
                room.currentBooking = temp;
                await room.save();
            }
            const bookingdel = await Booking.findByIdAndDelete(req.params.id);
            res.send("delete booking successfully");
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    },

    // Cancel booking
    cancelBooking: async (req, res) => {
        const { bookingid, roomid } = req.body;
        console.log(bookingid, roomid);

        try {
            const bookingitem = await Booking.findOne({ _id: bookingid });
            bookingitem.status = 'cancelled';
            await bookingitem.save();

            const room = await Room.findOne({ _id: roomid });
            const bookingRoom = room.currentBooking;
            const temp = bookingRoom.filter(booking => booking.bookingid.toString() !== bookingid);
            room.currentBooking = temp;

            await room.save();
            res.send('Cancel booking successful');
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    },

    processPayment: async (req, res) => {
        const { bookingId, transactionId } = req.body;
        try {
            const booking = await Booking.findById(bookingId);
            if (!booking) {
                return res.status(404).json({ message: 'Không tìm thấy đặt phòng' });
            }

            // Cập nhật trạng thái thanh toán
            booking.paymentStatus = 'paid';
            booking.transactionId = transactionId;

            await booking.save();

            return res.status(200).json({ message: 'Thanh toán đã được xử lý thành công', booking });
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    },

    confirmBooking: async (req, res) => {
        console.log("confirm booking");
        try {
            const bookingitem = await Booking.findOne({ _id: req.params.id });
            bookingitem.status = "success";
            await bookingitem.save();
            const room = await Room.findOne({ _id: bookingitem.roomid });
            const bookingRoom = room.currentBooking;
            const temp = bookingRoom.map(booking => {
                if (booking.bookingid.toString() === req.params.id) {
                    booking.status = 'success';
                }
                return booking;
            });

            room.currentBooking = temp;
            await room.save().then(() => { console.log("Cập nhật thành công") });
            console.log(room);
            const roomupdate = await Room.findByIdAndUpdate(room._id, room, { returnDocument: 'after' });
            res.send("confirm booking successfully");
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    },


};

module.exports = bookingController;



