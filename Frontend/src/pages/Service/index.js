import classNames from 'classnames/bind';
import styles from './Service.module.scss';
import Image from 'src/components/Image';
import Button from 'src/components/Button';
const cx = classNames.bind(styles);
function Service() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                <div className={cx("img")}>
                    <Image src="dv.webp" alt="dichvu" />
                </div>
                <div className={cx("dichvu")}>
                    <div className={cx("khoi")}>
                        <Image src="phuongtien.jpg" alt="phuongtien" id="pt" />
                        <Button className={cx("dv")}>Thuê xe đạp</Button>
                    </div>
                    <div className={cx("khoi")}>
                        <Image src="trangphuc.jpg" alt="trangphuc" id="tp" />
                        <Button className={cx("dv")}>Thuê xe máy</Button>
                    </div>
                    <div className={cx("khoi")}>
                        <Image src="hdv.jpeg" alt="huongdanvien" id="hdv" />
                        <Button className={cx("dv")} >Thuê lều trại</Button>
                    </div>
                    <div className={cx("khoi")}>
                        <Image src="thucan.jpg" alt="thucan" id="ta" />
                        <Button className={cx("dv")}>Thuê hướng dẫn viên du lịch</Button>
                    </div>
                    <div className={cx("khoi")}>
                        <Image src="phuongtien.jpg" alt="phuongtien" id="pt" />
                        <Button className={cx("dv")}>Thuê hồ bơi</Button>
                    </div>
                    <div className={cx("khoi")}>
                        <Image src="trangphuc.jpg" alt="trangphuc" id="tp" />
                        <Button className={cx("dv")}>Tour tham quan địa phương</Button>
                    </div>
                    <div className={cx("khoi")}>
                        <Image src="hdv.jpeg" alt="huongdanvien" id="hdv" />
                        <Button className={cx("dv")} >Thuê xe tự lái hoặc có tài xế</Button>
                    </div>
                    <div className={cx("khoi")}>
                        <Image src="thucan.jpg" alt="thucan" id="ta" />
                        <Button className={cx("dv")}>Trải nghiệm ẩm thực</Button>
                    </div>
                    <div className={cx("khoi")}>
                        <Image src="phuongtien.jpg" alt="phuongtien" id="pt" />
                        <Button className={cx("dv")}>Tour phiêu lưu và hoạt động thể thao</Button>
                    </div>
                    <div className={cx("khoi")}>
                        <Image src="trangphuc.jpg" alt="trangphuc" id="tp" />
                        <Button className={cx("dv")}>Tour du lịch tâm linh</Button>
                    </div>
                    <div className={cx("khoi")}>
                        <Image src="hdv.jpeg" alt="huongdanvien" id="hdv" />
                        <Button className={cx("dv")} >Dịch vụ spa và thư giãn</Button>
                    </div>
                    <div className={cx("khoi")}>
                        <Image src="thucan.jpg" alt="thucan" id="ta" />
                        <Button className={cx("dv")}>Dịch vụ chụp ảnh chuyên nghiệp</Button>
                    </div>
                    <div className={cx("khoi")}>
                        <Image src="phuongtien.jpg" alt="phuongtien" id="pt" />
                        <Button className={cx("dv")}>Tour sinh thái và nông nghiệp</Button>
                    </div>
                    <div className={cx("khoi")}>
                        <Image src="trangphuc.jpg" alt="trangphuc" id="tp" />
                        <Button className={cx("dv")}>Tour trải nghiệm văn hóa</Button>
                    </div>
                    <div className={cx("khoi")}>
                        <Image src="trangphuc.jpg" alt="trangphuc" id="tp" />
                        <Button className={cx("dv")}>Trải nghiệm chợ nổi</Button>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Service;
