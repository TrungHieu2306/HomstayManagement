// import classNames from "classnames/bind";
// import style from './ListBooked.module.scss'
// import Button from "src/components/Button";
// import Loader from "src/components/Loader";
// import useFetch from "src/Hook/useFetch";
// import { useEffect, useState } from "react";
// import { BiSolidError } from "react-icons/bi";
// import Chip from '@mui/material-next/Chip';

// import axios from "axios";
// import Swal from "sweetalert2";
// const cx = classNames.bind(style);
// function ListBooked() {
//     const [bookings, setBookings] = useState([])
//     const user = JSON.parse(localStorage.getItem('currentUser'))
//     const { data, loading } = useFetch(`/api/booking/getbookingsbyuserid/${user._id}`)
//     useEffect(() => {
//         setBookings(data);
//     }, [data])
//     async function cancelBooking(bookingid, roomid) {
//         try {
//             const result = (await axios.post('/api/booking/cancelbooking', { bookingid, roomid })).data
//             Swal.fire('Hủy Đơn Thành Công', 'Đơn phòng của bạn đã được hủy', 'success').then(result => { window.location.reload() })
//         } catch (error) {
//             console.log(error)
//             Swal.fire('Hủy Đơn Thất Bại', 'Đơn phòng của bạn chưa được hủy', 'error')
//         }
//     }
//     async function deleteBooking(bookingid) {
//         try {
//             const result = (await axios.delete(`/api/booking/deletebookingbyid/${bookingid}`)).data
//             Swal.fire('Xóa Đơn Thành Công', 'Đơn phòng của bạn đã được xóa', 'success').then(result => { window.location.reload() })
//         } catch (error) {
//             console.log(error)
//             Swal.fire('Xóa Đơn Thất Bại', 'Đơn phòng của bạn chưa được xóa', 'error')
//         }
//     }
//     return (
//         <div className={cx('wrapper')}>
//             <h2>DANH SÁCH THÔNG TIN CÁC PHÒNG ĐÃ ĐẶT</h2>
//             <div className={cx('inner', 'flex')}>
//                 {loading ? (<Loader />) : (
//                     (bookings.length > 0 ? (
//                         bookings.map((booking, index) => (
//                             <div className={cx('cart')} key={index}>
//                                 <div className={cx('nameCart')}>
//                                     <h3>{booking.room}</h3>
//                                 </div>
//                                 <div className={cx('bodyCart')}>
//                                     <div className={cx('bodyCart1')}>
//                                         <div className={cx('idBookingCart', 'flex')}>
//                                             <h4>Tên người đặt phòng: {booking.nameuserorder}</h4>
//                                         </div>
//                                         <div className={cx('idBookingCart', 'flex')}>
//                                             <h4>Số điện thoại: {booking.phone}</h4>
//                                         </div>
//                                         <div className={cx('idBookingCart', 'flex')}>
//                                             <h4>Mã đơn phòng: {booking._id}</h4>
//                                         </div>
//                                         <div className={cx('idBookingCart', 'flex')}>
//                                             <h4>Loại phòng: {booking.type}</h4>
//                                         </div>
//                                     </div>
//                                     <div className={cx('bodyCart2')}>
//                                         <div className={cx('checkinBookingCart', 'flex')}>
//                                             <h4>Ngày đặt phòng: {booking.orderdate}</h4>
//                                         </div>
//                                         <div className={cx('checkinBookingCart', 'flex')}>
//                                             <h4>Ngày đến: {booking.fromdate}</h4>
//                                         </div>
//                                         <div className={cx('checkoutBookingCart', 'flex')}>
//                                             <h4>Ngày đi: {booking.todate}</h4>
//                                         </div>
//                                         <div className={cx('checkoutBookingCart', 'flex')}>
//                                             <h4>Tổng số ngày: {booking.totaldays} ngày</h4>
//                                         </div>
//                                         <div className={cx('amountBookingCart', 'flex')}>
//                                             <h4>Tổng thành tiền :</h4>
//                                             <h4 style={{ color: "#00897b" }}>{booking.totalamount}</h4>
//                                         </div>
//                                         <div className={cx('statusBookingCart', 'flex')}>
//                                             <h4>Trạng Thái:</h4>
//                                             {booking.status === 'booked' &&
//                                                 (
//                                                     <Chip
//                                                         sx={{ fontSize: "14px", fontWeight: "bold", m: "0 0 0 1rem ", color: "" }}
//                                                         color="warning"
//                                                         size="small"
//                                                         label="Chờ xác nhận"
//                                                         variant="filled"
//                                                     />
//                                                 )}
//                                             {booking.status === 'cancelled' &&
//                                                 (
//                                                     <Chip
//                                                         sx={{ fontSize: "14px", fontWeight: "bold", m: "0 0 0 1rem " }}
//                                                         color="error"
//                                                         size="small"
//                                                         label="Đã hủy"
//                                                         variant="filled"
//                                                     />
//                                                 )}
//                                             {booking.status === 'success' &&
//                                                 (
//                                                     <Chip
//                                                         sx={{ fontSize: "14px", fontWeight: "bold", m: "0 0 0 1rem " }}
//                                                         color="success"
//                                                         size="small"
//                                                         label="Đã được xác nhận"
//                                                         variant="filled"
//                                                     />
//                                                 )}
//                                         </div>
//                                     </div>
//                                 </div>
//                                 {booking.status !== 'cancelled' ? (
//                                     <div className={cx('btnBookingCart', 'flex')}>
//                                         <Button
//                                             className={cx('btn', 'cancelBtn')}

//                                             onClick={() => { cancelBooking(booking._id, booking.roomid) }}
//                                         >
//                                             Huỷ Đơn
//                                         </Button>
//                                         <Button
//                                             className={cx('btn', 'addBtn')}

//                                             to={`/Book/${booking.roomid}/${booking.fromdate}/${booking.todate}`}
//                                         >
//                                             Xem Chi Tiết
//                                         </Button>
//                                     </div>) : (
//                                     <div className={cx('btnBookingCart', 'flex')}>
//                                         <Button
//                                             className={cx('btn', 'cancelBtn')}
//                                             onClick={() => { deleteBooking(booking._id, booking.roomid) }}
//                                         >
//                                             Xóa đơn
//                                         </Button>

//                                     </div>
//                                 )}
//                             </div>
//                         )))
//                         : (
//                             <div className={cx("infoErorr", "flex")}>
//                                 <BiSolidError className={cx("icon")}></BiSolidError>
//                                 <h3> Không có đơn đặt phòng! </h3>
//                             </div>
//                         )
//                     ))

//                 }
//             </div>
//         </div>
//     );
// }

// export default ListBooked;



import classNames from "classnames/bind";
import style from './ListBooked.module.scss'
import Button from "src/components/Button";
import Loader from "src/components/Loader";
import useFetch from "src/Hook/useFetch";
import { useEffect, useState } from "react";
import { BiSolidError } from "react-icons/bi";
import Chip from '@mui/material-next/Chip';
import axios from "axios";
import Swal from "sweetalert2";
const cx = classNames.bind(style);

function ListBooked() {
    const [bookings, setBookings] = useState([]);
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const { data, loading } = useFetch(`/api/booking/getbookingsbyuserid/${user._id}`);
    
    useEffect(() => {
        setBookings(data);
    }, [data]);
    
    async function cancelBooking(bookingid, roomid) {
        try {
            const result = (await axios.post('/api/booking/cancelbooking', { bookingid, roomid })).data;
            Swal.fire('Hủy Đơn Thành Công', 'Đơn phòng của bạn đã được hủy', 'success')
                .then(result => { window.location.reload(); });
        } catch (error) {
            console.log(error);
            Swal.fire('Hủy Đơn Thất Bại', 'Đơn phòng của bạn chưa được hủy', 'error');
        }
    }
    
    async function deleteBooking(bookingid) {
        try {
            const result = (await axios.delete(`/api/booking/deletebookingbyid/${bookingid}`)).data;
            Swal.fire('Xóa Đơn Thành Công', 'Đơn phòng của bạn đã được xóa', 'success')
                .then(result => { window.location.reload(); });
        } catch (error) {
            console.log(error);
            Swal.fire('Xóa Đơn Thất Bại', 'Đơn phòng của bạn chưa được xóa', 'error');
        }
    }

    // Hàm để gộp các dịch vụ cùng tên lại và tính tổng số lượng
    function groupServices(services) {
        const groupedServices = {};

        services.forEach(service => {
            if (groupedServices[service.name]) {
                groupedServices[service.name].quantity += service.quantity;
                groupedServices[service.name].totalamount += service.totalamount;
            } else {
                groupedServices[service.name] = { ...service };
            }
        });

        return Object.values(groupedServices);
    }

    return (
        <div className={cx('wrapper')}>
            <h2>DANH SÁCH THÔNG TIN CÁC PHÒNG ĐÃ ĐẶT</h2>
            <div className={cx('inner', 'flex')}>
                {loading ? (<Loader />) : (
                    bookings.length > 0 ? (
                        bookings.map((booking, index) => (
                            <div className={cx('cart')} key={index}>
                                <div className={cx('nameCart')}>
                                    <h3>{booking.room}</h3>
                                </div>
                                <div className={cx('bodyCart')}>
                                    {/* Thông tin phòng */}
                                    <div className={cx('bodyCart1')}>
                                        <div className={cx('idBookingCart', 'flex')}>
                                            <h4>Tên người đặt phòng: {booking.nameuserorder}</h4>
                                        </div>
                                        <div className={cx('idBookingCart', 'flex')}>
                                            <h4>Số điện thoại: {booking.phone}</h4>
                                        </div>
                                        <div className={cx('idBookingCart', 'flex')}>
                                            <h4>Mã đơn phòng: {booking._id}</h4>
                                        </div>
                                        <div className={cx('idBookingCart', 'flex')}>
                                            <h4>Loại phòng: {booking.type}</h4>
                                        </div>
                                                                                {/* Hiển thị các dịch vụ đã đặt nếu có */}
                                                                                {booking.services && booking.services.length > 0 && (
                                            <div className={cx('servicesBookingCart', 'flex')}>
                                                <h4>Dịch vụ đã đặt :</h4>
                                                <ul>
                                                    {groupServices(booking.services).map((service, index) => (
                                                        <li key={index}>
                                                            <h4>{service.name}</h4> {/* - Số lượng: {service.quantity}*/}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                    
                                    {/* Ngày và tổng tiền */}
                                    <div className={cx('bodyCart2')}>
                                        <div className={cx('checkinBookingCart', 'flex')}>
                                            <h4>Ngày đặt phòng: {booking.orderdate}</h4>
                                        </div>
                                        <div className={cx('checkinBookingCart', 'flex')}>
                                            <h4>Ngày đến: {booking.fromdate}</h4>
                                        </div>
                                        <div className={cx('checkoutBookingCart', 'flex')}>
                                            <h4>Ngày đi: {booking.todate}</h4>
                                        </div>
                                        <div className={cx('checkoutBookingCart', 'flex')}>
                                            <h4>Tổng số ngày: {booking.totaldays} ngày</h4>
                                        </div>
                                        <div className={cx('amountBookingCart', 'flex')}>
                                            <h4>Tổng thành tiền :</h4>
                                            <h4 style={{ color: "#00897b" }}>{booking.totalamount}</h4>
                                        </div>
                                        
                                        {/* Trạng thái đơn phòng */}
                                        <div className={cx('statusBookingCart', 'flex')}>
                                            <h4>Trạng Thái:</h4>
                                            {booking.status === 'booked' && (
                                                <Chip
                                                    sx={{ fontSize: "14px", fontWeight: "bold", m: "0 0 0 1rem " }}
                                                    color="warning"
                                                    size="small"
                                                    label="Chờ xác nhận"
                                                    variant="filled"
                                                />
                                            )}
                                            {booking.status === 'cancelled' && (
                                                <Chip
                                                    sx={{ fontSize: "14px", fontWeight: "bold", m: "0 0 0 1rem " }}
                                                    color="error"
                                                    size="small"
                                                    label="Đã hủy"
                                                    variant="filled"
                                                />
                                            )}
                                            {booking.status === 'success' && (
                                                <Chip
                                                    sx={{ fontSize: "14px", fontWeight: "bold", m: "0 0 0 1rem " }}
                                                    color="success"
                                                    size="small"
                                                    label="Đã được xác nhận"
                                                    variant="filled"
                                                />
                                            )}
                                        </div>


                                    </div>
                                </div>

                                {/* Các nút thao tác */}
                                {booking.status !== 'cancelled' ? (
                                    <div className={cx('btnBookingCart', 'flex')}>
                                        <Button
                                            className={cx('btn', 'cancelBtn')}
                                            onClick={() => { cancelBooking(booking._id, booking.roomid) }}
                                        >
                                            Huỷ Đơn
                                        </Button>
                                        <Button
                                            className={cx('btn', 'addBtn')}
                                            to={`/Book/${booking.roomid}/${booking.fromdate}/${booking.todate}`}
                                        >
                                            Xem Chi Tiết
                                        </Button>
                                    </div>
                                ) : (
                                    <div className={cx('btnBookingCart', 'flex')}>
                                        <Button
                                            className={cx('btn', 'cancelBtn')}
                                            onClick={() => { deleteBooking(booking._id) }}
                                        >
                                            Xóa đơn
                                        </Button>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className={cx("infoErorr", "flex")}>
                            <BiSolidError className={cx("icon")}></BiSolidError>
                            <h3>Không có đơn đặt phòng!</h3>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}

export default ListBooked;
