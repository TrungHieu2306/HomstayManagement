import classNames from "classnames/bind";
import style from './ListBooked.module.scss';
import Button from "src/components/Button";
import Loader from "src/components/Loader";
import useFetch from "src/Hook/useFetch";
import { useEffect, useState } from "react";
import { BiSolidError } from "react-icons/bi";
import { FaServicestack } from "react-icons/fa";
import Chip from '@mui/material-next/Chip';
import axios from "axios";
import Swal from "sweetalert2";

const cx = classNames.bind(style);

function ListBooked() {
    const [bookings, setBookings] = useState([]);
    const [currentImages, setCurrentImages] = useState({});
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const { data, loading } = useFetch(`/api/booking/getbookingsbyuserid/${user._id}`);

    useEffect(() => {
        if (data) {
            setBookings(data);
            const initialImages = {};
            data.forEach((booking, index) => {
                initialImages[index] = 0; // Start with the first image for each booking
            });
            setCurrentImages(initialImages);
        }
    }, [data]);

    const handleImageChange = (index, direction) => {
        setCurrentImages((prev) => {
            const totalImages = bookings[index]?.imgs.length || 0;
            const currentIndex = prev[index] || 0;

            if (totalImages > 1) {
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
            onApprove: async (data, actions) => {
                const details = await actions.order.capture();
                Swal.fire("Payment Successful", `Transaction completed by ${details.payer.name.given_name}`, "success");

                // Call the payment success endpoint here
                try {
                    await axios.post('/api/booking/process-Payment', { transactionId: details.id, bookingId: booking._id });
                    // Optionally reload or refresh bookings
                    setBookings((prevBookings) => prevBookings.map(b => b._id === booking._id ? { ...b, paymentStatus: 'paid' } : b));
                } catch (error) {
                    console.error("Failed to update payment status:", error);
                    Swal.fire("Error", "Failed to update payment status", "error");
                }
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
                if (booking.paymentStatus === 'unpaid') {
                    renderPayPalButton(booking, index);
                }
            });
        });
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [bookings]);

    const statusMapping = {
        booked: "Chờ xác nhận",
        success: "Đã xác nhận",
        cancelled: "Đã hủy"
    };
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
                                    <div className={cx('bodyCart0')}>
                                        {booking.imgs && booking.imgs.length > 0 ? (
                                            <div className={cx('image-slider')}>
                                                <div className={cx('main-image-wrapper')}>
                                                    <img
                                                        src={booking.imgs[currentImages[index]]?.src}
                                                        alt={booking.imgs[currentImages[index]]?.alt}
                                                        className={cx('main-image')}
                                                    />
                                                </div>
                                                <div className={cx('slider-controls')}>
                                                    <button
                                                        onClick={() => handleImageChange(index, 'prev')}
                                                        className={cx('slider-button')}
                                                    >
                                                        &#10094;
                                                    </button>
                                                    <button
                                                        onClick={() => handleImageChange(index, 'next')}
                                                        className={cx('slider-button')}
                                                    >
                                                        &#10095;
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
                                                <h4>Mã đơn phòng:  &#160;</h4>{booking._id}
                                            </div>
                                            <div className={cx('idBookingCart', 'flex')}>
                                                <h4>Tên khách hàng:  &#160;</h4> {booking.nameuserorder}
                                            </div>
                                            <div className={cx('idBookingCart', 'flex')}>
                                                <h4>Số điện thoại:  &#160;</h4>0{booking.phone}
                                            </div>
                                            <div className={cx('idBookingCart', 'flex')}>
                                                <h4>Loại phòng:  &#160;</h4>{booking.type}
                                            </div>
                                        </div>
                                        <div className={cx('bodyCart12')}>
                                            {booking.services && booking.services.length > 0 && (
                                                <div className={cx('servicesBookingCart', 'flex')}>
                                                    <FaServicestack className={cx('service')} />
                                                    <div className={cx('box')}>
                                                        <h4>Dịch vụ đã đặt: &#160;</h4>
                                                        <ul>
                                                            {groupServices(booking.services).map((service, index) => (
                                                                <li key={index}>
                                                                    {service.name}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
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
                                            <h4>Tổng số tiền:  &#160;</h4>{booking.totalamount} VND
                                        </div>
                                        <div className={cx('checkoutBookingCart', 'flex')}>
                                            <h4>Trạng thái đặt phòng: &#160;</h4>
                                            {/* <Chip
                                                label={statusMapping[booking.status] || booking.status}
                                                color={booking.status === 'pending' ? 'warning' : (booking.status === 'approved' ? 'success' : 'error')}
                                            /> */}
                                            <Chip
                                                label={statusMapping[booking.status] || booking.status}
                                                color={
                                                    booking.status === 'booked' ? 'warning' :
                                                        (booking.status === 'success' ? 'success' :
                                                            'error')
                                                }
                                                className={cx('large-text')}
                                            />

                                        </div>
                                        <div className={cx('checkoutBookingCart', 'flex')}>
                                            <h4>Trạng thái thanh toán:  &#160;</h4>
                                            <Chip
                                                label={booking.paymentStatus === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán'}
                                                color={booking.paymentStatus === 'paid' ? 'success' : 'error'}
                                                className={cx('large-text')}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('actionButtons')}>
                                    {booking.paymentStatus === 'unpaid' && (
                                        <div id={`paypal-button-container-${index}`} className={cx('paypal-button')} />
                                    )}
                                    <Button onClick={() => cancelBooking(booking._id, booking.roomid)}>Hủy đơn</Button>
                                    <Button onClick={() => deleteBooking(booking._id)}>Xóa đơn</Button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Bạn chưa có đơn phòng nào!</p>
                    )
                )}
            </div>
        </div>
    );
}

export default ListBooked;




