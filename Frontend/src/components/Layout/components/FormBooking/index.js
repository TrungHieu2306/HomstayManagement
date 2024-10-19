// // import { useState, useMemo } from "react";
// // import classNames from "classnames/bind";
// // import Payment from "../Payment";
// // import styles from "./FormBooking.module.scss";
// // import Button from "src/components/Button";
// // import Image from "src/components/Image";
// // import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai"
// // import AddServiceBooking from "src/components/componentOfAdmin/AddServiceBooking";
// // const cx = classNames.bind(styles);

// // function FormBooking({ fromDate, toDate, room }) {
// //     const [closeForm, setCloseForm] = useState(true);
// //     const [openPayment, setOpenPayment] = useState(false);
// //     const [service, setService] = useState([]);
// //     const [openAddServiceBooking, setOpenAddServiceBooking] = useState(false);
// //     const [totalamountService, setTotalAmountService] = useState(0)

// //     const form = new Date(fromDate);
// //     const to = new Date(toDate);
// //     const timeDate = to.getTime() - form.getTime();
// //     const totaldays = timeDate / (1000 * 3600 * 24) + 1;
// //     const totalamount = useMemo(() => {
// //         let total = 0;
// //         let totalamountservice = 0;
// //         total = totaldays * room.price[1];
// //         if (service.length > 0) {
// //             service.forEach(serviceItem => totalamountservice += serviceItem.totalamount)
// //             total += totalamountservice;
// //         }
// //         setTotalAmountService(totalamountservice);

// //         return total;
// //     }
// //         , [totaldays, room.price, service]);
// //     const closeFormHandle = (e) => {
// //         e.preventDefault();
// //         if (e.target === e.currentTarget) {
// //             setCloseForm(false)
// //         }
// //     }

// //     // format currency
// //     const formatter = new Intl.NumberFormat('vi-VN', {
// //         style: 'currency',
// //         currency: 'VND',
// //         // maximumFractionDigits: 3,
// //     });
// //     // const 
// //     return (
// //         <>
// //             {(closeForm) ? (
// //                 <>
// //                     <div onClick={closeFormHandle} className={cx("wrapper")}>
// //                         <div className={cx("inner")}>
// //                             <div className={cx("left")}>
// //                                 <div className={cx("nameRoom")}>
// //                                     Tên phòng:
// //                                     <h3>{room.name}</h3>
// //                                 </div>
// //                                 <div className={cx("imgRoom")}>
// //                                     <Image src={room.imgs[0].src} alt={room.imgs[0].alt} className={cx("img")}></Image>
// //                                 </div>
// //                             </div>
// //                             <div className={cx("right")}>
// //                                 <div className={cx("body")}>
// //                                     <div className={cx("titleForm")}>
// //                                         <h3>CHI TIẾT ĐẶT PHÒNG</h3>
// //                                     </div>
// //                                     <div className={cx("type")}>
// //                                         Loại phòng: {room.type}
// //                                     </div>
// //                                     <div className={cx("maxCount")}>
// //                                         Sức chứa: {room.maxcount} người
// //                                     </div>
// //                                     <div className={cx("branch")}>
// //                                         Chi nhánh: {room.branch}
// //                                     </div>
// //                                     <div className={cx("price")}>
// //                                         Giá thuê mỗi ngày: {formatter.format(room.price[1])}
// //                                         <span className={cx("text")}></span>
// //                                     </div>
// //                                     {/* payment */}
// //                                     <div className={cx("titlePayment")}>
// //                                         <h3>THÀNH TIỀN</h3>
// //                                     </div>
// //                                     <div className={cx("fromDate")}>
// //                                         Ngày vào ở: {fromDate}
// //                                     </div>
// //                                     <div className={cx("toDate")}>
// //                                         Ngày đi: {toDate}
// //                                     </div>
// //                                     <div className={cx("totalDate")}>
// //                                         Tổng số ngày: {totaldays} ngày
// //                                     </div>
// //                                     <div className={cx("price")}>
// //                                         <span className={cx("text")}>Giá thuê dịch vụ: {formatter.format(totalamountService)}</span>
// //                                     </div>
// //                                     <div className={cx("totalAmount")}>
// //                                         <span className={cx("text", "totalamount")}>TỔNG THANH TOÁN: {formatter.format(totalamount)}</span>
// //                                     </div>
// //                                 </div>
// //                                 <div className={cx("btnPayment", "flex")}>
// //                                     <Button
// //                                         leftIcon={<AiOutlinePlus />}
// //                                         feature
// //                                         className={cx("btn", "addBtn")}
// //                                         onClick={() => setOpenAddServiceBooking(true)}
// //                                     >
// //                                         Thêm dịch vụ
// //                                     </Button>
// //                                     <Button
// //                                         primary
// //                                         onClick={() => {
// //                                             setOpenPayment(true)
// //                                             setCloseForm(false)
// //                                         }}
// //                                     >
// //                                         Thanh Toán
// //                                     </Button>
// //                                 </div>
// //                             </div>
// //                             <div className={cx("closeBtn")}
// //                             >
// //                                 <AiOutlineClose className={cx("icon")} onClick={closeFormHandle} />
// //                             </div>
// //                         </div>

// //                     </div></>) : (openPayment ? (
// //                         <>
// //                             <Payment
// //                                 room={room}
// //                                 service={service}
// //                                 fromDate={fromDate}
// //                                 toDate={toDate}
// //                                 totaldays={totaldays}
// //                                 totalamount={totalamount}
// //                             >
// //                             </Payment>
// //                         </>) : (<></>))
// //             }
// //             {(openAddServiceBooking) && (
// //                 <AddServiceBooking
// //                     openAddServiceBooking={(data) => setOpenAddServiceBooking(data)}
// //                     listService={data => setService(data)}
// //                 />
// //             )}
// //         </>
// //     )
// // }

// // export default FormBooking;



// import { useState, useMemo } from "react";
// import classNames from "classnames/bind";
// import Payment from "../Payment";
// import styles from "./FormBooking.module.scss";
// import Button from "src/components/Button";
// import Image from "src/components/Image";
// import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai"
// import AddServiceBooking from "src/components/componentOfAdmin/AddServiceBooking";
// const cx = classNames.bind(styles);

// function FormBooking({ fromDate, toDate, room }) {
//     const [closeForm, setCloseForm] = useState(true);
//     const [openPayment, setOpenPayment] = useState(false);
//     const [service, setService] = useState([]);
//     const [openAddServiceBooking, setOpenAddServiceBooking] = useState(false);
//     const [totalamountService, setTotalAmountService] = useState(0)

//     const form = new Date(fromDate);
//     const to = new Date(toDate);
//     const timeDate = to.getTime() - form.getTime();
//     const totaldays = timeDate / (1000 * 3600 * 24) + 1;
//     const totalamount = useMemo(() => {
//         let total = 0;
//         let totalamountservice = 0;
//         total = totaldays * room.price[1];
//         if (service.length > 0) {
//             service.forEach(serviceItem => totalamountservice += serviceItem.totalamount)
//             total += totalamountservice;
//         }
//         setTotalAmountService(totalamountservice);

//         return total;
//     }
//         , [totaldays, room.price, service]);
//     const closeFormHandle = (e) => {
//         e.preventDefault();
//         if (e.target === e.currentTarget) {
//             setCloseForm(false)
//         }
//     }

//     // format currency
//     const formatter = new Intl.NumberFormat('vi-VN', {
//         style: 'currency',
//         currency: 'VND',
//         // maximumFractionDigits: 3,
//     });
//     // const 
//     return (
//         <>
//             {(closeForm) ? (
//                 <>
//                     <div onClick={closeFormHandle} className={cx("wrapper")}>
//                         <div className={cx("inner")}>
//                             <div className={cx("left")}>
//                                 <div className={cx("nameRoom")}>
//                                     Tên phòng:
//                                     <h3>{room.name}</h3>
//                                 </div>
//                                 <div className={cx("imgRoom")}>
//                                     <Image src={room.imgs[0].src} alt={room.imgs[0].alt} className={cx("img")}></Image>
//                                 </div>
//                             </div>
//                             <div className={cx("right")}>
//                                 <div className={cx("body")}>
//                                     <div className={cx("titleForm")}>
//                                         <h3>CHI TIẾT ĐẶT PHÒNG</h3>
//                                     </div>
//                                     <div className={cx("type")}>
//                                         Loại phòng: {room.type}
//                                     </div>
//                                     <div className={cx("maxCount")}>
//                                         Sức chứa: {room.maxcount} người
//                                     </div>
//                                     <div className={cx("branch")}>
//                                         Chi nhánh: {room.branch}
//                                     </div>
//                                     <div className={cx("price")}>
//                                         Giá thuê mỗi ngày: {formatter.format(room.price[1])}
//                                         <span className={cx("text")}></span>
//                                     </div>
//                                     {/* payment */}
//                                     <div className={cx("titlePayment")}>
//                                         <h3>THÀNH TIỀN</h3>
//                                     </div>
//                                     <div className={cx("fromDate")}>
//                                         Ngày vào ở: {fromDate}
//                                     </div>
//                                     <div className={cx("toDate")}>
//                                         Ngày đi: {toDate}
//                                     </div>
//                                     <div className={cx("totalDate")}>
//                                         Tổng số ngày: {totaldays} ngày
//                                     </div>
//                                     <div className={cx("price")}>
//                                         <span className={cx("text")}>Giá thuê dịch vụ: {formatter.format(totalamountService)}</span>
//                                     </div>
//                                     <div className={cx("totalAmount")}>
//                                         <span className={cx("text", "totalamount")}>TỔNG THANH TOÁN: {formatter.format(totalamount)}</span>
//                                     </div>
//                                 </div>
//                                 <div className={cx("btnPayment", "flex")}>
//                                     <Button
//                                         leftIcon={<AiOutlinePlus />}
//                                         feature
//                                         className={cx("btn", "addBtn")}
//                                         onClick={() => setOpenAddServiceBooking(true)}
//                                     >
//                                         Thêm dịch vụ
//                                     </Button>
//                                     <Button
//                                         primary
//                                         onClick={() => {
//                                             setOpenPayment(true)
//                                             setCloseForm(false)
//                                         }}
//                                     >
//                                         Thanh Toán
//                                     </Button>
//                                 </div>
//                             </div>
//                             <div className={cx("closeBtn")}
//                             >
//                                 <AiOutlineClose className={cx("icon")} onClick={closeFormHandle} />
//                             </div>
//                         </div>

//                     </div></>) : (openPayment ? (
//                         <>
//                             <Payment
//                                 room={room}
//                                 service={service}
//                                 fromDate={fromDate}
//                                 toDate={toDate}
//                                 totaldays={totaldays}
//                                 totalamount={totalamount}
//                             >
//                             </Payment>
//                         </>) : (<></>))
//             }
//             {(openAddServiceBooking) && (
//                 <AddServiceBooking
//                     openAddServiceBooking={(data) => setOpenAddServiceBooking(data)}
//                     listService={data => setService(data)}
//                 />
//             )}
//         </>
//     )
// }

// export default FormBooking;


//lan2
import { useState, useMemo } from "react";
import classNames from "classnames/bind";
import Payment from "../Payment";
import styles from "./FormBooking.module.scss";
import Button from "src/components/Button";
import Image from "src/components/Image";
import Swal from 'sweetalert2';
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import AddServiceBooking from "src/components/componentOfAdmin/AddServiceBooking";

const cx = classNames.bind(styles);

function FormBooking({ fromDate, toDate, room }) {
    const [closeForm, setCloseForm] = useState(true);
    const [openPayment, setOpenPayment] = useState(false);
    const [service, setService] = useState([]);
    const [openAddServiceBooking, setOpenAddServiceBooking] = useState(false);
    const [totalamountService, setTotalAmountService] = useState(0);

    const form = new Date(fromDate);
    const to = new Date(toDate);
    const timeDate = to.getTime() - form.getTime();
    const totaldays = timeDate / (1000 * 3600 * 24) + 1;

    const totalamount = useMemo(() => {
        let total = 0;
        let totalamountservice = 0;
        total = totaldays * room.price[1];
        if (service.length > 0) {
            service.forEach(serviceItem => totalamountservice += serviceItem.totalamount);
            total += totalamountservice;
        }
        setTotalAmountService(totalamountservice);

        return total;
    }, [totaldays, room.price, service]);

    const closeFormHandle = (e) => {
        e.preventDefault();
        if (e.target === e.currentTarget) {
            setCloseForm(false);
        }
    };

    // Hàm kiểm tra ngày hợp lệ
    const isDateValid = (fromDate, toDate, existingBookings) => {
        const from = new Date(fromDate);
        const to = new Date(toDate);

        // Kiểm tra ngày bắt đầu và ngày kết thúc có hợp lệ không
        if (from > to) {
            return { valid: false, message: "Ngày vào ở không thể lớn hơn ngày đi!" };
        }

        // Kiểm tra xem ngày đặt phòng có chồng chéo với các booking hiện tại không
        for (const booking of existingBookings) {
            const existingFrom = new Date(booking.fromdate);
            const existingTo = new Date(booking.todate);
            if (!((from >= existingTo) || (to <= existingFrom))) {
                return { valid: false, message: "Thật không may, ngày này đã được đặt trước. Xin hãy chọn một ngày khác!" };
            }
        }

        return { valid: true };
    };

    // Xử lý thanh toán
    const handlePayment = () => {
        const existingBookings = room.currentBooking || [];
        const validation = isDateValid(fromDate, toDate, existingBookings);
        if (!validation.valid) {
            // alert(validation.message);
            Swal.fire({
                icon: 'warning',
                title: 'Phòng đã được đặt',
                text: 'Thật không may, ngày đặt phòng này đã được đặt trước! Vui lòng chọn một ngày khác.',
            });
            return;
        }

        setOpenPayment(true);
        setCloseForm(false);
    };

    // Format currency
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    return (
        <>
            {closeForm ? (
                <>
                    <div onClick={closeFormHandle} className={cx("wrapper")}>
                        <div className={cx("inner")}>
                            <div className={cx("left")}>
                                <div className={cx("nameRoom")}>
                                    Tên phòng:
                                    <h3>{room.name}</h3>
                                </div>
                                <div className={cx("imgRoom")}>
                                    <Image src={room.imgs[0].src} alt={room.imgs[0].alt} className={cx("img")}></Image>
                                </div>
                            </div>
                            <div className={cx("right")}>
                                <div className={cx("body")}>
                                    <div className={cx("titleForm")}>
                                        <h3>CHI TIẾT ĐẶT PHÒNG</h3>
                                    </div>
                                    <div className={cx("type")}>
                                        Loại phòng: {room.type}
                                    </div>
                                    <div className={cx("maxCount")}>
                                        Sức chứa: {room.maxcount} người
                                    </div>
                                    <div className={cx("branch")}>
                                        Chi nhánh: {room.branch}
                                    </div>
                                    <div className={cx("price")}>
                                        Giá thuê mỗi ngày: {formatter.format(room.price[1])}
                                        <span className={cx("text")}></span>
                                    </div>
                                    {/* payment */}
                                    <div className={cx("titlePayment")}>
                                        <h3>THÀNH TIỀN</h3>
                                    </div>
                                    <div className={cx("fromDate")}>
                                        Ngày vào ở: {fromDate}
                                    </div>
                                    <div className={cx("toDate")}>
                                        Ngày đi: {toDate}
                                    </div>
                                    <div className={cx("totalDate")}>
                                        Tổng số ngày: {totaldays} ngày
                                    </div>
                                    <div className={cx("price")}>
                                        <span className={cx("text")}>Giá thuê dịch vụ: {formatter.format(totalamountService)}</span>
                                    </div>
                                    <div className={cx("totalAmount")}>
                                        <span className={cx("text", "totalamount")}>TỔNG THANH TOÁN: {formatter.format(totalamount)}</span>
                                    </div>
                                </div>
                                <div className={cx("btnPayment", "flex")}>
                                    <Button
                                        leftIcon={<AiOutlinePlus />}
                                        feature
                                        className={cx("btn", "addBtn")}
                                        onClick={() => setOpenAddServiceBooking(true)}
                                    >
                                        Thêm dịch vụ
                                    </Button>
                                    <Button
                                        primary
                                        onClick={handlePayment} // Gọi hàm kiểm tra trước khi thanh toán
                                    >
                                        Thanh Toán
                                    </Button>
                                </div>
                            </div>
                            <div className={cx("closeBtn")}>
                                <AiOutlineClose className={cx("icon")} onClick={closeFormHandle} />
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                openPayment ? (
                    <>
                        <Payment
                            room={room}
                            service={service}
                            fromDate={fromDate}
                            toDate={toDate}
                            totaldays={totaldays}
                            totalamount={totalamount}
                        />
                    </>
                ) : (<></>)
            )}
            {openAddServiceBooking && (
                <AddServiceBooking
                    openAddServiceBooking={(data) => setOpenAddServiceBooking(data)}
                    listService={data => setService(data)}
                />
            )}
        </>
    );
}

export default FormBooking;





