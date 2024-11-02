
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
    const [currentImages, setCurrentImages] = useState({});
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const { data, loading } = useFetch(`/api/booking/getbookingsbyuserid/${user._id}`);
    const [showPayPalButton, setShowPayPalButton] = useState({});


    useEffect(() => {
        setBookings(data);
    }, [data]);

    useEffect(() => {
        setBookings(data);
        // Initialize currentImages state for each booking
        const initialImages = {};
        data.forEach((booking, index) => {
            initialImages[index] = 0; // Start with the first image for each booking
        });
        setCurrentImages(initialImages);
    }, [data]);

    const handleImageChange = (index, direction) => {
        setCurrentImages((prev) => {
            const totalImages = bookings[index]?.imgs.length || 0;
            const currentIndex = prev[index] || 0;

            if (totalImages > 1) { // Check if there's more than one image
                const newIndex =
                    direction === 'next'
                        ? (currentIndex + 1) % totalImages
                        : (currentIndex - 1 + totalImages) % totalImages;
                return { ...prev, [index]: newIndex };
            } else {
                return prev; // If only one image, no update is needed
            }
        });
    };


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


    const renderPayPalButton = (booking, index) => {
        window.paypal.Buttons({
            createOrder: (data, actions) => {
                return actions.order.create({
                    purchase_units: [
                        {
                            amount: {
                                value: booking.totalamount.toString()
                            },
                        },
                    ],
                });
            },
            onApprove: (data, actions) => {
                return actions.order.capture().then((details) => {
                    Swal.fire("Payment Successful", `Transaction completed by ${details.payer.name.given_name}`, "success");
                });
            },
            onError: (err) => {
                console.error("PayPal Checkout Error:", err);
                Swal.fire("Payment Error", "An error occurred during the transaction", "error");
            },
        }).render(`#paypal-button-container-${index}`);
    };

    useEffect(() => {
        const script = document.createElement("script");
        script.src = `https://www.paypal.com/sdk/js?client-id=AfyKyOyZwHWh3q_H4ZGJphdfpvvzmXBSA7wALz_kwHoiu7rAaV62hwvWlPB6nuYIqKEmQBp21eh-4qyv&currency=USD`;
        script.addEventListener("load", () => {
            bookings.forEach((booking, index) => {
                if (showPayPalButton[index]) {
                    renderPayPalButton(booking, index);
                }
            });
        });
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [bookings, showPayPalButton]);


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
                                    <div className={cx('bodyCart0')}>
                                        {booking.imgs && booking.imgs.length > 0 ? (
                                            <div className={cx('image-slider')}>
                                                <div className={cx('main-image-wrapper')}>
                                                    <img
                                                        src={booking.imgs[currentImages[index]]?.src} // Use currentImages for the current image
                                                        alt={booking.imgs[currentImages[index]]?.alt}
                                                        className={cx('main-image')}
                                                    />
                                                </div>
                                                <div className={cx('slider-controls')}>
                                                    <button
                                                        onClick={() => handleImageChange(index, 'prev')} // Handle previous image
                                                        className={cx('slider-button')}
                                                    >
                                                        &#10094; {/* Left Arrow */}
                                                    </button>
                                                    <button
                                                        onClick={() => handleImageChange(index, 'next')} // Handle next image
                                                        className={cx('slider-button')}
                                                    >
                                                        &#10095; {/* Right Arrow */}
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <p>Không có hình ảnh nào</p>
                                        )}

                                    </div>
                                    <div className={cx('bodyCart1')}>
                                        <div className={cx('bodyCart11')}>
                                            <div className={cx('idBookingCart', 'flex')}>
                                                <h4>Tên người đặt phòng:  &#160;</h4> {booking.nameuserorder}
                                            </div>
                                            <div className={cx('idBookingCart', 'flex')}>
                                                <h4>Số điện thoại:  &#160;</h4>0{booking.phone}
                                            </div>
                                            <div className={cx('idBookingCart', 'flex')}>
                                                <h4>Mã đơn phòng:  &#160;</h4>{booking._id}
                                            </div>
                                            <div className={cx('idBookingCart', 'flex')}>
                                                <h4>Loại phòng:  &#160;</h4>{booking.type}
                                            </div>
                                        </div>
                                        <div className={cx('bodyCart12')}>
                                            {/* Hiển thị các dịch vụ đã đặt nếu có */}
                                            {booking.services && booking.services.length > 0 && (
                                                <div className={cx('servicesBookingCart', 'flex')}>
                                                    <h4>Dịch vụ đã đặt: &#160;</h4>
                                                    <ul>
                                                        {groupServices(booking.services).map((service, index) => (
                                                            <li key={index}>
                                                                {service.name} {/* - Số lượng: {service.quantity}*/}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                    </div>

                                    {/* Ngày và tổng tiền */}
                                    <div className={cx('bodyCart2')}>
                                        <div className={cx('checkinBookingCart', 'flex')}>
                                            <h4>Ngày đặt phòng:  &#160;</h4>{booking.orderdate}
                                        </div>
                                        <div className={cx('checkinBookingCart', 'flex')}>
                                            <h4>Ngày đến:  &#160;</h4>{booking.fromdate}
                                        </div>
                                        <div className={cx('checkoutBookingCart', 'flex')}>
                                            <h4>Ngày đi:  &#160;</h4>{booking.todate}
                                        </div>
                                        <div className={cx('checkoutBookingCart', 'flex')}>
                                            <h4>Tổng số ngày:  &#160;</h4>0{
                                                booking.totaldays} ngày
                                        </div>
                                        <div className={cx('amountBookingCart', 'flex')}>
                                            <h4>Tổng thành tiền:  &#160;</h4>
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
                                            className={cx('btn', 'paypalBtn')}
                                            onClick={() => setShowPayPalButton(prev => ({ ...prev, [index]: !prev[index] }))}
                                        >
                                            Thanh toán PayPal
                                        </Button>
                                        {showPayPalButton[index] && (
                                            <div id={`paypal-button-container-${index}`} className={cx('paypalButtonContainer')}></div>
                                        )}
                                        
                                        <Button
                                            className={cx('btn', 'cancelBtn')}
                                            onClick={() => { cancelBooking(booking._id, booking.roomid) }}
                                        >
                                            Huỷ đơn
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
