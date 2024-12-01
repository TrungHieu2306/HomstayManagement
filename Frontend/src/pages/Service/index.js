
import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import style from './Service.module.scss';
import Loader from "src/components/Loader";
import axios from "axios";

const cx = classNames.bind(style);

function CustomerService() {
  const [services, setServices] = useState([]); // Danh sách dịch vụ
  const [selectedService, setSelectedService] = useState(null); // Dịch vụ được chọn
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [error, setError] = useState(null); // Lưu lỗi khi gọi API

  // Lấy danh sách dịch vụ từ server
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("/api/service/getallservices");
        setServices(response.data);
      } catch (err) {
        setError("Không thể tải danh sách dịch vụ. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  // Hàm hiển thị thông tin chi tiết dịch vụ
  const handleViewService = (service) => {
    setSelectedService(service); // Đặt dịch vụ được chọn
  };

  return (
    <div className={cx("body")}>
      <div className={cx("wrapper")}>
        <h1 className={cx("title")}>DỊCH VỤ KHÁCH SẠN</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <p className={cx("error")}>{error}</p>
        ) : (
          <div className={cx("services")}>
            {services.map((service, index) => (
              <div
                key={service._id}
                className={cx("service-item")}
                onClick={() => handleViewService(service)}
              >
                <h2 className={cx("service-name")}>{service.name}</h2>
                <p className={cx("service-price")}>
                  Giá: {service.price.toLocaleString()} VNĐ
                </p>
                <p className={cx("service-desc")}>
                  {service.desc.substring(0, 50)}...
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Hiển thị thông tin chi tiết dịch vụ */}
        {selectedService && (
          <div className={cx("service-detail")}>
            <div className={cx("overlay")} onClick={() => setSelectedService(null)}></div>
            <div className={cx("detail-content")}>
              <h2>{selectedService.name}</h2>
              <p><strong>Giá:</strong> {selectedService.price.toLocaleString()} VNĐ</p>
              <p><strong>Số lượng còn:</strong> {selectedService.quantity} lượt</p>
              <p><strong>Mô tả:</strong> {selectedService.desc}</p>
              <button
                className={cx("close-btn")}
                onClick={() => setSelectedService(null)}
              >
                Đóng
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomerService;
