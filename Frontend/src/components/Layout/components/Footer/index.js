import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import Marquee from 'react-fast-marquee';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles); //return function cx
function Footer() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('content')}>
                    <div className={cx('description')}>
                        TungHeeu Homestay
                        <div className={cx('description-content')}>
                            Nằm cách Công viên Yersin 2,1 km, TungHeeu Homestay có chỗ nghỉ, nhà hàng,
                            quầy bar, sảnh khách chung và khu vườn. Biệt thự cung cấp miễn phí cả
                            WiFi lẫn chỗ đỗ xe riêng. Một số căn tại đây có TV truyền hình cáp màn
                            hình phẳng, khu vực bếp ăn đầy đủ tiện nghi với minibar và phòng tắm
                            riêng đi kèm vòi sen cùng dép đi trong phòng. Du khách nghỉ tại TungHeeu Homestay có thể thưởng thức bữa sáng kiểu lục địa hoặc bữa sáng kiểu Á. Chỗ
                            nghỉ có sân hiên. TungHeeu Homestay cung cấp dịch vụ cho thuê xe đạp và xe
                            hơi trong khi du khách có thể đi xe đạp ở khu vực gần đó. Hồ Xuân Hương
                            và Quảng trường Lâm Viên đều nằm trong bán kính 2,3 km từ biệt thự. Sân
                            bay gần nhất là sân bay Liên Khương, cách TungHeeu Homestay 22 km.
                        </div>
                    </div>
                    <div className={cx('info')}>
                        <div className={cx('infoContact', 'bold')}>
                            Liên hệ
                            <div className={cx('phone')}>
                                Số điện thoại
                                <p className={cx('infoContact-content')}>035 351 4931</p>
                            </div>
                            <div className={cx('address')}>
                                Địa chỉ
                                <p className={cx('infoContact-content')}>
                                    131 Hoàng Hoa Thám, Phường 10, Thành phố Đà Lạt, Lâm Đồng
                                </p>
                            </div>
                            <div className={cx('time')}>
                                Thời gian nhận & trả phòng
                                <p className={cx('infoContact-content')}>
                                    Nhận phòng từ 14:00 và trả phòng từ 12:00 trưa
                                </p>
                            </div>
                            <div className={cx('price')}>
                                Mức giá
                                <p className={cx('infoContact-content')}>Giá phòng từ 399.000 VND</p>
                            </div>
                        </div>
                        <div className={cx('infoAbout')}>
                            <Link to="/"><div className={cx('infoAbout', 'Home')}>Về chúng tôi</div></Link>
                            <Link to="/Room"><div className={cx('infoAbout', 'Room')}>Phòng Nghỉ</div></Link>
                            <Link to="/Service"><div className={cx('infoAbout', 'Service')}>Dịch Vụ</div></Link>
                            <Link to="/News"><div className={cx('infoAbout', 'News')}>Tin Tức</div></Link>
                            <Link to="/Contact"><div className={cx('infoAbout', 'Contact')}>Tư Vấn</div></Link>
                        </div>
                    </div>
                </div>
                <div className={cx('copyRight')}>Copyright © 2024 TungHeeu Homestay</div>
            </div>
            <Marquee className={cx('marquee')}>
                TungHeeu Homestay lựa chọn hàng đầu trong việc đặt phòng Homestay tại Đà Lạt.
            </Marquee>
        </div>
    );
}

export default Footer;
