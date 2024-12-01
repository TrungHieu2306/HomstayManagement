
import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import style from './Service.module.scss';
import Slidebar from "src/components/componentOfAdmin/Slidebar";
import Header from "src/components/componentOfAdmin/Header";
import Button from "src/components/Button";
import useFetch from "src/Hook/useFetch";
import Loader from "src/components/Loader";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import Swal from "sweetalert2";
import AddService from "src/components/componentOfAdmin/AddService/index.";
import { FaRegEdit } from "react-icons/fa";

const cx = classNames.bind(style);

function Service() {
  const { data, loading } = useFetch('/api/service/getallservices');
  const [service, setService] = useState([]);
  const [checked, setChecked] = useState(0);
  const [currentService, setCurrentService] = useState(null); // New state for current service being edited

  useEffect(() => {
    try {
      setService(data);
    } catch (error) {
      console.log(error);
    }
  }, [data]);

  const deleteServiceHandle = async (serviceid) => {
    try {
      await axios.delete(`/api/service/deleteservicebyid/${serviceid}`);
      Swal.fire({
        icon: 'success',
        title: 'Xóa dịch vụ thành công',
        text: 'Dịch vụ đã được xóa khỏi danh sách',
      });
      setService(prevService => prevService.filter(el => el._id !== serviceid));
    } catch (error) {
      console.log(error);
    }
  };

  const editServiceHandle = (serviceData) => {
    setChecked(2); // Set to edit mode
    setCurrentService(serviceData); // Set the selected service data
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('inner')}>
        <Slidebar />
        <div className={cx("right")}>
          <Header />

          {(checked === 0) ? (
            <>
              <div className={cx("title", "flex")}>
                <h2>Quản lý dịch vụ</h2>
                <Button feature className={cx("btn", "updateBtn")} onClick={() => setChecked(1)}>Thêm</Button>
              </div>
              {loading ? <Loader /> : (
                <div className={cx("tableDiv")}>
                  <table>
                    <thead>
                      <tr>
                        <th>stt</th>
                        <th>tên</th>
                        <th>giá</th>
                        <th>số lượng</th>
                        <th>mô tả</th>
                        <th>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {service.length && service.map((text, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{text.name}</td>
                          <td>{text.price}</td>
                          <td>{text.quantity}</td>
                          <td>{text.desc}</td>
                          <td style={{ textAlign: "center" }}>
                            <FaRegEdit onClick={() => editServiceHandle(text)} className={cx("iconEdit")} />
                            <MdDelete onClick={() => deleteServiceHandle(text._id)} className={cx("iconDelete")} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          ) : (
            <AddService
              sendData={(data) => setChecked(data)}
              sendAllServices={(data) => setService(data)}
              service={service}
              initialData={checked === 2 ? currentService : null} // Pass initial data if editing
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Service;


