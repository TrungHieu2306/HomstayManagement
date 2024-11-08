import classNames from "classnames/bind";
import styles from "./Payment.module.scss";
import Button from "src/components/Button";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import { AiOutlineClose } from 'react-icons/ai';
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import axios from "axios";

const cx = classNames.bind(styles);

function Payment({ room, fromDate, toDate, totaldays, totalamount, service }) {
    const [paypalLoaded, setPaypalLoaded] = useState(false);
    const [paypalError, setPaypalError] = useState(false);

    const user = JSON.parse(localStorage.getItem('currentUser'));
    const [paymentMethod, setPaymentMethod] = useState(""); // Phương thức thanh toán
    const [nameuserorderVal, setNameUserOrderVal] = useState("");
    const [phoneVal, setPhoneVal] = useState("");
    const [close, setClose] = useState(true);
    const [paymentsuccessful, setPaymentSuccessful] = useState(false);
    const { register, handleSubmit, formState: { errors, isSubmitSuccessful }, reset } = useForm({
        defaultValues: {
            nameuserorder: JSON.parse(localStorage.getItem('currentUser')).name,
            address: user.address || "",
            phone: user.phone || "",
            cccd: user.cccd || "",
            request: user.request || "",
        }
    });
    var date = moment();
    var currentDate = date.format('DD-MM-YYYY');

    const onSubmit = async (data) => {
        const { address, phone, cccd, request, nameuserorder } = data;

        const booking = {
            room,
            userid: JSON.parse(localStorage.getItem("currentUser"))._id,
            fromdate: fromDate,
            todate: toDate,
            type: room.type,
            totaldays,
            totalamount,
            orderdate: currentDate,
            address: address,
            phone: phone,
            cccd: cccd,
            deposits: 0,
            services: service,
            requests: request,
            status: "booked",
            nameuserorder: nameuserorder,
        };

        setNameUserOrderVal(nameuserorder);
        setPhoneVal(phone);

        try {
            const result = (await axios.post('/api/booking/bookroom', booking)).data;
            setClose(false);
            if (result) {
                setPaymentSuccessful(true);
            } else {
                await Swal.fire({
                    icon: 'error',
                    title: 'Đặt phòng thất bại',
                    text: 'Phòng này đã có người đặt! Vui lòng chọn phòng khác.',
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Phòng đã được đặt",
                text: "Hãy chọn một phòng khác thích hợp nhé!",
            });
        }
    };

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                nameuserorder: JSON.parse(localStorage.getItem('currentUser')).name,
                address: "",
                phone: "",
                cccd: "",
                request: "",
            });
        }
    }, [isSubmitSuccessful, reset]);

    const closePaymentHandle = (e) => {
        if (e.target === e.currentTarget) {
            setClose(false);
        }
    };

    const closePaymentSuccess = (e) => {
        if (e.target === e.currentTarget) {
            setPaymentSuccessful(false);
        }
    };

    // format currency
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    useEffect(() => {
        if (paymentMethod === "paypal" && !paypalLoaded) {
            const script = document.createElement("script");
            script.src = `https://www.paypal.com/sdk/js?client-id=AQwWQk8e-iTJ1Rb5SM--Ri3thLZGAZnv3tx6WFsx_aeayTXyLlLgeMHA3KCyACslC4YXPmM3WwvTnSlr&currency=USD`;
            script.async = true;
            script.onload = () => setPaypalLoaded(true);
            script.onerror = () => setPaypalError(true);
            document.body.appendChild(script);
        }
    }, [paymentMethod]); // Load PayPal script when paymentMethod changes

    const handlePaymentSuccess = async (details, data, booking) => {
        // Lấy transactionId từ dữ liệu trả về của PayPal
        const transactionId = data.orderID;

        // Tạo đối tượng booking đã được cập nhật với transactionId
        const bookingWithPaypal = {
            ...booking,
            transactionId,
            status: "booked", // Cập nhật trạng thái đơn đặt phòng
        };

        try {
            // Gửi yêu cầu cập nhật booking đến server
            await axios.post('/api/booking/bookroom', bookingWithPaypal);


            // Cập nhật trạng thái thanh toán thành công
            setPaymentSuccessful(true);
        } catch (error) {
            console.error(error);
            // Hiển thị thông báo lỗi nếu có sự cố xảy ra trong quá trình gửi yêu cầu
            Swal.fire({
                icon: "error",
                title: "Thanh toán thất bại",
                text: "Vui lòng thử lại.",
            });
        }
    };




    useEffect(() => {
        if (paypalLoaded && paymentMethod === "paypal") {
            window.paypal.Buttons({
                createOrder: (data, actions) => {
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                value: (totalamount / 23000).toFixed(2), // USD value
                            },
                        }],
                    });
                },
                onApprove: (data, actions) => {
                    return actions.order.capture().then(details => handlePaymentSuccess(details, data));
                },
                onError: (err) => {
                    Swal.fire({
                        icon: "error",
                        title: "Thanh toán thất bại",
                        text: "Vui lòng thử lại sau.",
                    });
                },
            }).render('#paypal-button-container');
        }
    }, [paypalLoaded, paymentMethod, totalamount]);



    return (
        <>
            {close ? (
                <div onClick={closePaymentHandle} className={cx("wrapper")}>
                    <div className={cx('inner')}>
                        <div className={cx("closeBtn")}>
                            <AiOutlineClose className={cx("icon")} onClick={closePaymentHandle} />
                        </div>
                        <h2 className={cx('heading')}>XÁC NHẬN VÀ THANH TOÁN</h2>
                        <p className={cx('desc')}>Tìm kiếm Homestay đơn giản với TuungHeeu</p>
                        <h4 className={cx('orderDate')}>Ngày đặt phòng: <span style={{ color: "green" }}>{currentDate}</span></h4>
                        <form
                            className={cx('formPayment')}
                            id="form"
                            key={1}
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div className={cx("top", 'flex')}>
                                {/* left */}
                                <div className={cx("left")}>
                                    <div className={cx("headFormDiv", 'flex')}>
                                        <label className={cx('form-label')}>Phòng:&#160;</label>
                                        <h4 className={cx('roomname')}>{room.name}</h4>
                                    </div>
                                    <div className={cx("headFormDiv", 'flex')}>
                                        <label className={cx('form-label')}>Loại phòng:&#160;</label>
                                        <h4>{room.type}</h4>
                                    </div>
                                    {/* Name User */}
                                    <div className={cx('form-group')}>
                                        <label htmlFor="NameUser" className={cx('form-label')}>
                                            Tên khách hàng
                                        </label>
                                        <input
                                            {...register("nameuserorder", {
                                                required: {
                                                    value: true,
                                                    message: "Vui lòng nhập đầy đủ họ và tên"
                                                },
                                            })}
                                            id="NameUser"
                                            name="NameUser"
                                            type="text"
                                            placeholder="Nhập tên người đặt"
                                            className={cx('form-control')}
                                        ></input>
                                        <div className={cx("errorDiv")}>
                                            {errors.nameuserorder && (
                                                <span className={cx("error")}>{errors.nameuserorder.message}</span>
                                            )}
                                        </div>
                                    </div>
                                    {/* Address */}
                                    <div className={cx('form-group')}>
                                        <label htmlFor="address" className={cx('form-label')}>
                                            Địa chỉ
                                        </label>
                                        <input
                                            {...register("address", {
                                                required: {
                                                    value: true,
                                                    message: "Vui lòng nhập đầy đủ địa chỉ"
                                                },
                                            })}
                                            id="address"
                                            name="address"
                                            type="text"
                                            placeholder="Nhập địa chỉ của người đặt"
                                            className={cx('form-control')}
                                        ></input>
                                        <div className={cx("errorDiv")}>
                                            {errors.address && (
                                                <span className={cx("error")}>{errors.address.message}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {/* right */}
                                <div className={cx("right")}>
                                    <div className={cx("headFormDiv", 'flex')}>
                                        <label className={cx('form-label')}>Giá phòng:&#160;</label>
                                        <h4>{formatter.format(room.price[1])} </h4>
                                    </div>
                                    <div className={cx("headFormDiv", 'flex')}>
                                        <label className={cx('form-label')}>Tổng thanh toán:&#160;</label>
                                        <h4 style={{ color: "#e64a19" }}>  {formatter.format(totalamount)} </h4>
                                    </div>
                                    {/* Number Phone */}
                                    <div className={cx('form-group')}>
                                        <label htmlFor="CCCD" className={cx('form-label')}>
                                            Căn cước công dân
                                        </label>
                                        <input
                                            {...register("cccd", {
                                                required: {
                                                    value: true,
                                                    message: "Vui lòng nhập đầy đủ số CCCD"
                                                },
                                                valueAsNumber: {
                                                    value: true,
                                                    message: "Căn Cước Công Dân bắt buộc là chữ số"
                                                },
                                            })}
                                            id="CCCD"
                                            name="CCCD"
                                            type="number"
                                            placeholder="Nhập Căn cước công dân"
                                            className={cx('form-control')}
                                        ></input>
                                        <div className={cx("errorDiv")}>
                                            {errors.cccd && (
                                                <span className={cx("error")}>{errors.cccd.message}</span>
                                            )}
                                        </div>
                                    </div>
                                    {/* CCCD */}
                                    <div className={cx('form-group')}>
                                        <label htmlFor="phone" className={cx('form-label')}>
                                            Số điện thoại
                                        </label>
                                        <input
                                            {...register("phone", {
                                                required: {
                                                    value: true,
                                                    message: "Vui lòng nhập đầy đủ số điện thoại"
                                                },
                                                valueAsNumber: {
                                                    value: true,
                                                    message: "Số điện thoại bắt buộc là chữ số"
                                                },
                                            })}
                                            id="phone"
                                            name="phone"
                                            type="number"
                                            placeholder="Nhập số điện thoại"
                                            className={cx('form-control')}
                                        ></input>
                                        <div className={cx("errorDiv")}>
                                            {errors.phone && (
                                                <span className={cx("error")}>{errors.phone.message}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* bot */}
                            <div className={cx("bot")}>
                                <div className={cx("form-group")}>
                                    <label htmlFor="content" className={cx('form-label')}>
                                        Những yêu cầu đặc biệt
                                    </label>
                                    <textarea
                                        {...register("request")}
                                        id="content"
                                        name="content"
                                        type="text"
                                        placeholder="Những yêu cầu đặt biệt của bạn"
                                        className={cx('form-control')}
                                    ></textarea>
                                </div>
                            </div>
                        </form>

                        <div className={cx('paymentMethod')}>
                            <label htmlFor="paymentMethod" className={cx('form-label')}>Chọn phương thức thanh toán</label>
                            <div>
                                <input
                                    type="radio"
                                    id="direct"
                                    name="paymentMethod"
                                    value="direct"
                                    checked={paymentMethod === "direct"}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                <label htmlFor="direct">Nhận phòng và thanh toán tại quầy</label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    id="paypal"
                                    name="paymentMethod"
                                    value="paypal"
                                    checked={paymentMethod === "paypal"}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                <label htmlFor="paypal">Thanh toán qua PayPal</label>
                            </div>

                            {/* Render PayPal button if the method is selected and loaded */}
                            <div className={cx('paypal')}>
                                {paymentMethod === "paypal" && paypalLoaded && (
                                    <div className={cx('paypalContainer')}>
                                        <div id="paypal-button-container" style={{ width: 200 }}></div>
                                    </div>
                                )}

                                {paymentMethod === "paypal" && paypalError && (
                                    <div>Không thể tải PayPal. Vui lòng thử lại sau.</div>
                                )}
                            </div>
                        </div>

                        {paymentMethod === "direct" && (
                            <Button className={cx('form-submit')} onClick={handleSubmit(onSubmit)} primary small>
                                Xác nhận thanh toán
                            </Button>
                        )}

                        {paymentMethod === "bank" && (
                            <div className={cx('paymentOptions')}>
                                <Button className={cx('form-submit')} onClick={() => alert("Thanh toán bằng thẻ ghi nợ")} primary small>
                                    Thanh toán bằng thẻ ghi nợ
                                </Button>
                                <Button className={cx('form-submit')} onClick={() => alert("Thanh toán bằng PayPal")} primary small>
                                    Thanh toán bằng PayPal
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                paymentsuccessful && (
                    <div className={cx("wrapper")} onClick={closePaymentSuccess}>
                        <div className={cx("paymentSuccessful", "flex")}>
                            <div className={cx("iconPaymentSuccess")}>
                                <img src="https://media.istockphoto.com/id/1451590744/vi/vec-to/ch%C3%BAc-m%E1%BB%ABng-poster-thi%E1%BB%87p-ch%C3%BAc-m%E1%BB%ABng-%C4%91%E1%BA%B9p-banner.jpg?s=612x612&w=0&k=20&c=-UcD8QB71BlQtz-_lkqc-7h4aXIU3jpbWapBpCQe734="></img>
                            </div>
                            <div className={cx("titlePaymentSuccess")}>
                                <h2>Cảm ơn bạn đã đặt phòng</h2>
                            </div>
                            <div className={cx("bodyPaymentSuccess")}>
                                <div className={cx("descPaymentSuccess")}>
                                    <p>Đơn đặt phòng của bạn đã được nhận</p>
                                    <p style={{ color: "#ef4e4e" }}>Vui lòng chờ xác nhận từ phía của Homestay</p>
                                </div>

                                <div className={cx("textGroup", 'flex')}>
                                    <p className={cx("textName")}>Ngày đặt phòng: </p>
                                    <p>{currentDate}</p>
                                </div>
                                <div className={cx("textGroup", 'flex')}>
                                    <p className={cx("textName")}>Trạng thái đặt phòng: </p>
                                    <p>Chờ xác nhận</p>
                                </div>
                                <div className={cx('notePayment')}>
                                    <ul>
                                        <li>Thời gian Checkin và Checkout là 14:00 hôm trước và 12:00 trưa hôm sau</li>
                                        <li>Khách hàng có thể hủy đặt phòng trong vòng 48 giờ sau khi thanh toán để không bị mất phí</li>
                                        <li>Trường hợp thanh toán bằng Paypal, quý khách muốn hủy đặt phòng vui lòng liên hệ hostline để được hoàn tiền</li>
                                    </ul>
                                </div>
                                <Button className={cx("btnMakeAnotherBooking")} primary onClick={() => setPaymentSuccessful(false)}>
                                    Đặt thêm phòng khác
                                </Button>
                            </div>
                        </div>
                    </div>
                )
            )}
        </>
    );
}

export default Payment;
