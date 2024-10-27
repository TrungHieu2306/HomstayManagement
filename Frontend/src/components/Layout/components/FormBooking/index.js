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
// import { useState, useMemo } from "react";
// import classNames from "classnames/bind";
// import Payment from "../Payment";
// import styles from "./FormBooking.module.scss";
// import Button from "src/components/Button";
// import Image from "src/components/Image";
// import Swal from 'sweetalert2';
// import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
// import AddServiceBooking from "src/components/componentOfAdmin/AddServiceBooking";

// const cx = classNames.bind(styles);

// function FormBooking({ fromDate, toDate, room }) {
//     const [closeForm, setCloseForm] = useState(true);
//     const [openPayment, setOpenPayment] = useState(false);
//     const [service, setService] = useState([]);
//     const [openAddServiceBooking, setOpenAddServiceBooking] = useState(false);
//     const [totalamountService, setTotalAmountService] = useState(0);
//     const [previousTotal, setPreviousTotal] = useState(room.previousTotal || 0);


//     const form = new Date(fromDate);
//     const to = new Date(toDate);
//     const timeDate = to.getTime() - form.getTime();
//     const totaldays = timeDate / (1000 * 3600 * 24) + 1;

//     const totalamount = useMemo(() => {
//         let total = 0;
//         let totalamountservice = 0;
//         total = totaldays * room.price[1];
//         if (service.length > 0) {
//             service.forEach(serviceItem => totalamountservice += serviceItem.totalamount);
//             total += totalamountservice;
//         }
//         setTotalAmountService(totalamountservice);

//         // return total;
//         return total; // Cộng dồn tiền đặt trước đó
//     }, [totaldays, room.price, service]);


//     const closeFormHandle = (e) => {
//         e.preventDefault();
//         if (e.target === e.currentTarget) {
//             setCloseForm(false);
//         }
//     };

//     // Hàm kiểm tra ngày hợp lệ
//     const isDateValid = (fromDate, toDate, existingBookings) => {
//         const from = new Date(fromDate);
//         const to = new Date(toDate);

//         // Kiểm tra ngày bắt đầu và ngày kết thúc có hợp lệ không
//         if (from > to) {
//             return { valid: false, message: "Ngày vào ở không thể lớn hơn ngày đi!" };
//         }

//         // Kiểm tra xem ngày đặt phòng có chồng chéo với các booking hiện tại không
//         for (const booking of existingBookings) {
//             const existingFrom = new Date(booking.fromdate);
//             const existingTo = new Date(booking.todate);
//             if (!((from >= existingTo) || (to <= existingFrom))) {
//                 return { valid: false, message: "Thật không may, ngày này đã được đặt trước. Xin hãy chọn một ngày khác!" };
//             }
//         }

//         return { valid: true };
//     };

//     // Xử lý thanh toán
//     const handlePayment = () => {
//         const existingBookings = room.currentBooking || [];
//         const validation = isDateValid(fromDate, toDate, existingBookings);
//         if (!validation.valid) {
//             // alert(validation.message);
//             Swal.fire({
//                 icon: 'warning',
//                 title: 'Phòng đã được đặt',
//                 text: 'Thật không may, ngày đặt phòng này đã được đặt trước! Vui lòng chọn một ngày khác.',
//             });
//             return;
//         }

//         setOpenPayment(true);
//         setCloseForm(false);
//     };

//     // Format currency
//     const formatter = new Intl.NumberFormat('vi-VN', {
//         style: 'currency',
//         currency: 'VND',
//     });

//     return (
//         <>
//             {closeForm ? (
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
//                                         onClick={handlePayment} // Gọi hàm kiểm tra trước khi thanh toán
//                                     >
//                                         Thanh Toán
//                                     </Button>
//                                 </div>
//                             </div>
//                             <div className={cx("closeBtn")}>
//                                 <AiOutlineClose className={cx("icon")} onClick={closeFormHandle} />
//                             </div>
//                         </div>
//                     </div>
//                 </>
//             ) : (
//                 openPayment ? (
//                     <>
//                         <Payment
//                             room={room}
//                             service={service}
//                             fromDate={fromDate}
//                             toDate={toDate}
//                             totaldays={totaldays}
//                             totalamount={totalamount}
//                         />
//                     </>
//                 ) : (<></>)
//             )}
//             {openAddServiceBooking && (
//                 <AddServiceBooking
//                     openAddServiceBooking={(data) => setOpenAddServiceBooking(data)}
//                     listService={data => setService(data)}
//                 />
//             )}
//         </>
//     );
// }

// export default FormBooking;


// import { useState, useMemo } from "react";
// import classNames from "classnames/bind";
// import Payment from "../Payment";
// import styles from "./FormBooking.module.scss";
// import Button from "src/components/Button";
// import Image from "src/components/Image";
// import Swal from 'sweetalert2';
// import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
// import AddServiceBooking from "src/components/componentOfAdmin/AddServiceBooking";

// const cx = classNames.bind(styles);

// function FormBooking({ fromDate, toDate, room }) {
//     const [closeForm, setCloseForm] = useState(true);
//     const [openPayment, setOpenPayment] = useState(false);
//     const [service, setService] = useState([]);
//     const [openAddServiceBooking, setOpenAddServiceBooking] = useState(false);
//     const [totalamountService, setTotalAmountService] = useState(0);
//     const [previousTotal, setPreviousTotal] = useState(room.previousTotal || 0);

//     const form = new Date(fromDate);
//     const to = new Date(toDate);
//     const timeDate = to.getTime() - form.getTime();
//     const totaldays = timeDate / (1000 * 3600 * 24) + 1;

//     // Tính tổng tiền bao gồm tiền phòng và tiền dịch vụ
//     const totalamount = useMemo(() => {
//         let total = totaldays * room.price[1];
//         let totalamountservice = 0;

//         if (service.length > 0) {
//             service.forEach(serviceItem => totalamountservice += serviceItem.totalamount);
//             total += totalamountservice;
//         }

//         setTotalAmountService(totalamountservice);
//         return total;
//     }, [totaldays, room.price, service]);

//     const closeFormHandle = (e) => {
//         e.preventDefault();
//         if (e.target === e.currentTarget) {
//             setCloseForm(false);
//         }
//     };

//     // Hàm thêm dịch vụ mới vào danh sách và tính lại tổng tiền
//     const handleAddService = (newServices) => {
//         setService(prevServices => [...prevServices, ...newServices]); // Cập nhật dịch vụ mới
//     };

//     // Hàm xóa dịch vụ
//     const handleRemoveService = (serviceIndex) => {
//         const updatedServices = service.filter((_, index) => index !== serviceIndex);
//         setService(updatedServices);
//     };

//     const handleRemoveServiceWithConfirmation = (serviceIndex) => {
//         // Hiển thị thông báo xác nhận từ SweetAlert2
//         Swal.fire({
//             title: 'Bạn có chắc muốn xóa dịch vụ này?',
//             text: "Bạn sẽ không thể hoàn tác sau khi xóa!",
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#3085d6',
//             cancelButtonColor: '#d33',
//             confirmButtonText: 'Xóa',
//             cancelButtonText: 'Hủy'
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 // Gọi hàm xóa dịch vụ khi người dùng xác nhận
//                 handleRemoveService(serviceIndex);
//                 Swal.fire(
//                     'Đã xóa!',
//                     'Dịch vụ đã được xóa.',
//                     'success'
//                 );
//             }
//         });
//     };

//     // Hàm kiểm tra ngày hợp lệ
//     const isDateValid = (fromDate, toDate, existingBookings) => {
//         const from = new Date(fromDate);
//         const to = new Date(toDate);

//         if (from > to) {
//             return { valid: false, message: "Ngày vào ở không thể lớn hơn ngày đi!" };
//         }

//         for (const booking of existingBookings) {
//             const existingFrom = new Date(booking.fromdate);
//             const existingTo = new Date(booking.todate);
//             if (!((from >= existingTo) || (to <= existingFrom))) {
//                 return { valid: false, message: "Thật không may, ngày này đã được đặt trước. Xin hãy chọn một ngày khác!" };
//             }
//         }

//         return { valid: true };
//     };

//     // Xử lý thanh toán
//     const handlePayment = () => {
//         const existingBookings = room.currentBooking || [];
//         const validation = isDateValid(fromDate, toDate, existingBookings);
//         if (!validation.valid) {
//             Swal.fire({
//                 icon: 'warning',
//                 title: 'Phòng đã được đặt',
//                 text: 'Thật không may, ngày đặt phòng này đã được đặt trước! Vui lòng chọn một ngày khác.',
//             });
//             return;
//         }

//         setOpenPayment(true);
//         setCloseForm(false);
//     };

//     const formatter = new Intl.NumberFormat('vi-VN', {
//         style: 'currency',
//         currency: 'VND',
//     });

//     return (
//         <>
//             {closeForm ? (
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
//                                         <span><h3>CHI TIẾT ĐẶT PHÒNG</h3></span>
//                                     </div>
//                                     <div className={cx("type")}>
//                                         Loại phòng: {room.type}
//                                     </div>
//                                     <div className={cx("maxCount")}>
//                                         Sức chứa: 0{room.maxcount} người
//                                     </div>
//                                     <div className={cx("branch")}>
//                                         Chi nhánh: 0{room.branch}
//                                     </div>
//                                     <div className={cx("price")}>
//                                         Giá thuê mỗi ngày: {formatter.format(room.price[1])}
//                                         <span className={cx("text")}></span>
//                                     </div>


//                                     <div className={cx("servicesList")}>
//                                         <h3>Dịch vụ đã chọn:</h3>
//                                         {service.length > 0 ? (
//                                             service.map((s, index) => (
//                                                 <div key={index} className={cx('btnservicesList')}>
//                                                     <div>{s.name}: {formatter.format(s.totalamount)}</div>
//                                                     <div>
//                                                         <Button
//                                                             className={cx("removeBtn")}
//                                                             onClick={() => handleRemoveServiceWithConfirmation(index)}
//                                                         >
//                                                             Xóa
//                                                         </Button>
//                                                     </div>
//                                                 </div>
//                                             ))
//                                         ) : (
//                                             <p>Chưa có dịch vụ nào</p>
//                                         )}
//                                     </div>

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
//                                         Tổng số ngày: 0{totaldays} ngày
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
//                                         onClick={handlePayment}
//                                     >
//                                         Thanh Toán
//                                     </Button>
//                                 </div>
//                             </div>
//                             <div className={cx("closeBtn")}>
//                                 <AiOutlineClose className={cx("icon")} onClick={closeFormHandle} />
//                             </div>
//                         </div>
//                     </div>
//                 </>
//             ) : (
//                 openPayment ? (
//                     <>
//                         <Payment
//                             room={room}
//                             service={service}
//                             fromDate={fromDate}
//                             toDate={toDate}
//                             totaldays={totaldays}
//                             totalamount={totalamount}
//                         />
//                     </>
//                 ) : (<></>)
//             )}
//             {openAddServiceBooking && (
//                 <AddServiceBooking
//                     openAddServiceBooking={(data) => setOpenAddServiceBooking(data)}
//                     listService={handleAddService}  // Truyền hàm handleAddService vào
//                 />
//             )}
//         </>
//     );
// }

// export default FormBooking;


import { useState, useMemo, useEffect } from "react";
import classNames from "classnames/bind";
import Payment from "../Payment";
import styles from "./FormBooking.module.scss";
import Button from "src/components/Button";
import Image from "src/components/Image";
import Swal from 'sweetalert2';
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import AddServiceBooking from "src/components/componentOfAdmin/AddServiceBooking";
import dayjs from 'dayjs';

const cx = classNames.bind(styles);

function FormBooking({ fromDate: searchFromDate, toDate: searchToDate, room }) {
    const [closeForm, setCloseForm] = useState(true);
    const [openPayment, setOpenPayment] = useState(false);
    const [service, setService] = useState([]);
    const [openAddServiceBooking, setOpenAddServiceBooking] = useState(false);
    const [totalamountService, setTotalAmountService] = useState(0);
    const [previousTotal, setPreviousTotal] = useState(room.previousTotal || 0);

    // Initialize date fields with today’s date or search-provided dates
    const today = new Date().toISOString().split("T")[0];
    const [fromDate, setFromDate] = useState(searchFromDate || today);
    const [toDate, setToDate] = useState(searchToDate || today);

    useEffect(() => {
        if (searchFromDate) {
            const [month, day, year] = searchFromDate.split('-');
            setFromDate(`${year}-${month}-${day}`);
        }
        if (searchToDate) {
            const [month, day, year] = searchToDate.split('-');
            setToDate(`${year}-${month}-${day}`);
        }
    }, [searchFromDate, searchToDate]);

    // Handle change for fromDate
    const handleFromDateChange = (e) => {
        const [month, day, year] = e.target.value.split('-');
        setFromDate(`${month}-${day}-${year}`);
    };

    // Handle change for toDate
    const handleToDateChange = (e) => {
        const [month, day, year] = e.target.value.split('-');
        setToDate(`${month}-${day}-${year}`);
    };

    // const totaldays = useMemo(() => {
    //     const form = new Date(fromDate);
    //     const to = new Date(toDate);
    //     const timeDate = to.getTime() - form.getTime();
    //     return timeDate / (1000 * 3600 * 24) + 1;
    // }, [fromDate, toDate]);

    const totaldays = useMemo(() => {
        const form = new Date(fromDate);
        const to = new Date(toDate);

        if (isNaN(form.getTime()) || isNaN(to.getTime())) {
            return 0;
        }

        const timeDate = to.getTime() - form.getTime();
        return timeDate / (1000 * 3600 * 24) + 1;
    }, [fromDate, toDate]);


    // Tính tổng tiền bao gồm tiền phòng và tiền dịch vụ
    const totalamount = useMemo(() => {
        let total = totaldays * room.price[1];
        let totalamountservice = 0;

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

    // Hàm thêm dịch vụ mới vào danh sách và tính lại tổng tiền
    const handleAddService = (newServices) => {
        setService(prevServices => [...prevServices, ...newServices]); // Cập nhật dịch vụ mới
    };

    // Hàm xóa dịch vụ
    const handleRemoveService = (serviceIndex) => {
        const updatedServices = service.filter((_, index) => index !== serviceIndex);
        setService(updatedServices);
    };

    const handleRemoveServiceWithConfirmation = (serviceIndex) => {
        // Hiển thị thông báo xác nhận từ SweetAlert2
        Swal.fire({
            title: 'Bạn có chắc muốn xóa dịch vụ này?',
            text: "Bạn sẽ không thể hoàn tác sau khi xóa!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy'
        }).then((result) => {
            if (result.isConfirmed) {
                // Gọi hàm xóa dịch vụ khi người dùng xác nhận
                handleRemoveService(serviceIndex);
                Swal.fire(
                    'Đã xóa!',
                    'Dịch vụ đã được xóa.',
                    'success'
                );
            }
        });
    };

    // Hàm kiểm tra ngày hợp lệ
    const isDateValid = (fromDate, toDate, existingBookings) => {
        const from = new Date(fromDate);
        const to = new Date(toDate);

        if (from > to) {
            return { valid: false, message: "Ngày vào ở không thể lớn hơn ngày đi!" };
        }

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
                                        <span><h3>CHI TIẾT ĐẶT PHÒNG</h3></span>
                                    </div>
                                    <div className={cx("type")}>
                                        Loại phòng: {room.type}
                                    </div>
                                    <div className={cx("maxCount")}>
                                        Sức chứa: 0{room.maxcount} người
                                    </div>
                                    <div className={cx("branch")}>
                                        Chi nhánh: 0{room.branch}
                                    </div>
                                    <div className={cx("price")}>
                                        Giá thuê mỗi ngày: {formatter.format(room.price[1])}
                                        <span className={cx("text")}></span>
                                    </div>


                                    <div className={cx("servicesList")}>
                                        <h3>Dịch vụ đã chọn:</h3>
                                        {service.length > 0 ? (
                                            service.map((s, index) => (
                                                <div key={index} className={cx('btnservicesList')}>
                                                    <div>{s.name}: {formatter.format(s.totalamount)}</div>
                                                    <div>
                                                        <Button
                                                            className={cx("removeBtn")}
                                                            onClick={() => handleRemoveServiceWithConfirmation(index)}
                                                        >
                                                            Xóa
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p>Chưa có dịch vụ nào</p>
                                        )}
                                    </div>

                                    <div className={cx("titlePayment")}>
                                        <h3>THÀNH TIỀN</h3>
                                    </div>

                                    <div className={cx('date-Input')}>
                                        <label htmlFor="fromDate">Ngày vào ở:</label>
                                        <div className={cx('input')}>
                                            <input
                                                type="date"
                                                id="fromDate"
                                                value={fromDate}
                                                onChange={handleFromDateChange}
                                                min={today} // Ensure past dates are not selectable
                                            />
                                        </div>
                                    </div>

                                    {/* Check-out Date */}
                                    <div className={cx('date-Input')}>
                                        <label htmlFor="toDate">Ngày đi:</label>
                                        <div className={cx('input')}>
                                            <input
                                                type="date"
                                                id="toDate"
                                                value={toDate}
                                                onChange={handleToDateChange}
                                                min={fromDate} // Ensure checkout date can't be before check-in date
                                            />
                                        </div>
                                    </div>

                                    <div className={cx("totalDate")}>
                                        Tổng số ngày: 0{totaldays} ngày
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
                                        onClick={handlePayment}
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
                    listService={handleAddService}  // Truyền hàm handleAddService vào
                />
            )}
        </>
    );
}

export default FormBooking;






