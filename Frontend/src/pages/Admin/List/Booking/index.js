import classNames from "classnames/bind";
import style from './Booking.module.scss';
import Slidebar from "src/components/componentOfAdmin/Slidebar";
import Header from "src/components/componentOfAdmin/Header";
import Button from "src/components/Button";
import useFetch from "src/Hook/useFetch";
import Loader from "src/components/Loader";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const cx = classNames.bind(style);

function Booking() {
  const { data, loading } = useFetch('/api/booking/getallbooking');
  const [booking, setBooking] = useState([]);

  useEffect(() => {
    setBooking(data);
  }, [data]);

  // Delete booking by ID
  // const deleteHandle = async (bookingid) => {
  //   try {
  //     await axios.delete(`/api/booking/deletebookingbyid/${bookingid}`);
  //     await Swal.fire({
  //       icon: 'success',
  //       title: 'Xóa đơn đặt phòng thành công',
  //       text: 'Đơn đặt phòng đã được xóa khỏi danh sách',
  //     });
  //     setBooking(prevBooking => prevBooking.filter(el => el._id !== bookingid));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleConfirm = async (bookingid) => {
  //   try {
  //     const result = await axios.post(`/api/booking/confirmbooking/${bookingid}`);
  //     await Swal.fire({
  //       icon: 'success',
  //       title: 'Xác nhận đơn đặt phòng thành công',
  //       text: 'Đơn đặt phòng đã được xác nhận',
  //     });
  //     const allBookings = (await axios.get('/api/booking/getallbooking')).data;
  //     setBooking(allBookings);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleCancel = async (bookingid, roomid) => {
  //   try {
  //     await axios.post('/api/booking/cancelbooking', { bookingid, roomid });
  //     Swal.fire('Hủy Đơn Thành Công', 'Đơn phòng của bạn đã được hủy', 'success');
  //     const allBookings = (await axios.get('/api/booking/getallbooking')).data;
  //     setBooking(allBookings);
  //   } catch (error) {
  //     console.log(error);
  //     Swal.fire('Hủy Đơn Thất Bại', 'Đơn phòng của bạn chưa được hủy', 'error');
  //   }
  // };

  const deleteHandle = async (bookingid) => {
    // Thêm thông báo xác nhận trước khi xóa đơn
    Swal.fire({
      title: 'Xác nhận xóa đơn đặt phòng?',
      text: 'Bạn chắc chắn muốn xóa đơn đặt phòng này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`/api/booking/deletebookingbyid/${bookingid}`);
          await Swal.fire({
            icon: 'success',
            title: 'Xóa đơn đặt phòng thành công',
            text: 'Đơn đặt phòng đã được xóa khỏi danh sách',
          });
          setBooking(prevBooking => prevBooking.filter(el => el._id !== bookingid));
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const handleConfirm = async (bookingid) => {
    // Thêm thông báo xác nhận trước khi xác nhận đơn
    Swal.fire({
      title: 'Xác nhận xác nhận đơn đặt phòng?',
      text: 'Bạn chắc chắn muốn xác nhận đơn đặt phòng này?',
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const result = await axios.post(`/api/booking/confirmbooking/${bookingid}`);
          await Swal.fire({
            icon: 'success',
            title: 'Xác nhận đơn đặt phòng thành công',
            text: 'Đơn đặt phòng đã được xác nhận',
          });
          const allBookings = (await axios.get('/api/booking/getallbooking')).data;
          setBooking(allBookings);
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const handleCancel = async (bookingid, roomid) => {
    // Thêm thông báo xác nhận trước khi hủy đơn
    Swal.fire({
      title: 'Xác nhận hủy đơn đặt phòng?',
      text: 'Bạn chắc chắn muốn hủy đơn đặt phòng này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Hủy',
      cancelButtonText: 'Hủy bỏ',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.post('/api/booking/cancelbooking', { bookingid, roomid });
          Swal.fire('Hủy Đơn Thành Công', 'Đơn phòng của bạn đã được hủy', 'success');
          const allBookings = (await axios.get('/api/booking/getallbooking')).data;
          setBooking(allBookings);
        } catch (error) {
          console.log(error);
          Swal.fire('Hủy Đơn Thất Bại', 'Đơn phòng của bạn chưa được hủy', 'error');
        }
      }
    });
  };



  return (
    <div className={cx('wrapper')}>
      <div className={cx('inner')}>
        <Slidebar />
        <div className={cx("right")}>
          <Header />
          <div className={cx("title", "flex")}>
            <h2>Quản lý đơn đặt phòng</h2>
          </div>
          {loading ? <Loader /> : (
            <div className={cx("tableDiv")}>
              <table cellpadding="0" border="0">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th className={cx("nameTH")}>Tên khách hàng</th>
                    <th className={cx("roomTH")}>Tên phòng</th>
                    <th className={cx("dateTH")}>Ngày đặt</th>
                    <th className={cx("dateTH")}>Ngày đến</th>
                    <th className={cx("dateTH")}>Ngày đi</th>
                    <th>Trạng thái đặt phòng</th>
                    <th>Thành tiền</th>
                    <th>Trạng thái thanh toán</th>
                    <th style={{ textAlign: "center" }}>Thao tác</th>
                    <th>Xóa đơn</th>
                  </tr>
                </thead>
                <tbody>
                  {booking.length > 0 &&
                    booking.map((text, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{text.nameuserorder}</td>
                        <td>{text.room}</td>
                        <td>{text.orderdate}</td>
                        <td>{text.fromdate}</td>
                        <td>{text.todate}</td>
                        <td style={{ width: "270px" }}>
                          {text.status === "cancelled" ? (
                            <span style={{ color: "crimson", backgroundColor: "rgba(255,0,0,0.2)", padding: ".5rem" }}>
                              Đã hủy
                            </span>
                          ) : text.status === "success" ? (
                            <span style={{ color: "green", backgroundColor: "rgba(0,128,0,0.2)", padding: ".5rem" }}>
                              Đã xác nhận
                            </span>
                          ) : (
                            <span style={{ color: "#827717", backgroundColor: "#e6ee9c", padding: ".5rem", width: "200px" }}>
                              Chờ xác nhận
                            </span>
                          )}
                        </td>
                        <td>{text.totalamount}</td>
                        {/* <td>{text.paymentStatus === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán'}</td> */}
                        <td>
                          {text.paymentStatus === 'paid' ? (
                            <span style={{ color: "green", backgroundColor: "rgba(0,128,0,0.2)", padding: ".5rem" }}>
                              Đã thanh toán
                            </span>
                          ) : (
                            <span style={{ color: "crimson", backgroundColor: "rgba(255,0,0,0.2)", padding: ".5rem" }}>
                              Chưa thanh toán
                            </span>
                          )}
                        </td>
                        <td>
                          {text.status === "booked" ? (
                            <div className={cx("flex")}>
                              <Button feature className={cx("btn", "updateBtn")} style={{ padding: "1rem" }} onClick={() => { handleConfirm(text._id) }}>Xác nhận</Button>
                              <Button feature className={cx("btn", "cancelBtn")} style={{ padding: "1rem" }} onClick={() => { handleCancel(text._id, text.roomid) }}>Hủy</Button>
                            </div>
                          ) : (
                            <div className={cx("flex")}>
                              <Button disable feature className={cx("btn", "updateBtn")} style={{ padding: "1rem" }}>Xác nhận</Button>
                              <Button disable feature className={cx("btn", "cancelBtn")} style={{ padding: "1rem" }}>Hủy</Button>
                            </div>
                          )}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <MdDelete onClick={() => { deleteHandle(text._id) }} className={cx("iconDelete")} />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Booking;

