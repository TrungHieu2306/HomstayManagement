import classNames from 'classnames/bind';
import styles from './News.module.scss';
const cx = classNames.bind(styles);
function News() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("news")}>
                <h1>TIN TỨC</h1>
                <p>Tin tức từ Homestay</p>
            </div>
            <span className={cx("breadcrumbs-nav")}>
                <div>
                    <a>   <i className={cx("fas fa-home icon-white")} style={{ paddingRight: "3px" }}></i>
                    </a> TIN TỨC
                </div>
            </span>
            <div className={cx("line")}>

            </div>

            <div className={cx("content")}>
                <div className={cx("news-list")}>
                    <h3>Mục tin mới</h3>
                    <div className={cx("news-new")}>
                        <div className={cx("card-1 card")}>
                            <img className={cx("square-zoom")} src="http://localhost:5000/images/homestaytruyenthong.jpg" alt=""></img>
                            <h2>Homestay chủ đề văn hóa Việt Nam: Nét đẹp truyền thống giữa lòng thành phố</h2>
                            <p>Homestay chủ đề văn hóa Việt Nam là một xu hướng mới của du lịch, mang đến cho du khách trải
                                nghiệm văn hóa truyền thống Việt Nam.... <a>Xem thêm</a> </p>
                            <div className={cx("short-line")}></div>
                        </div>
                        <div className={cx("card-2")}>
                            <table>
                                <tr>
                                    <td>
                                        <div className={cx("card")}>
                                            <img className={cx("square")} src="http://localhost:5000/images/homestaynongtrai.jpg" alt=""></img>
                                            <h2>Homestay nông trại: Trải nghiệm cuộc sống bình dị</h2>
                                            <p>Homestay nông trại là lựa chọn lý tưởng cho những du khách muốn trải nghiệm cuộc sống bình dị, gần
                                                gũi với thiên nhiên. Tại đây, du khách có thể tham gia các hoạt động như trồng trọt, chăn nuôi, thu
                                                hoạch nông sản,...</p>
                                            <div className={cx("short-line")}></div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={cx("card")}>
                                            <img className={cx("square")} src="http://localhost:5000/images/homestaychude.png" alt=""></img>
                                            <h2>Homestay theo chủ đề: Thỏa sức sáng tạo</h2>
                                            <p>Ngày nay, có rất nhiều homestay theo chủ đề khác nhau, từ homestay chủ đề phim ảnh, truyện tranh đến
                                                homestay chủ đề cổ tích,... Những homestay này mang đến cho du khách những trải nghiệm độc đáo và thú
                                                vị.</p>
                                            <div className={cx("short-line")}></div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className={cx("card")}>
                                            <img className={cx("square")} src="http://localhost:5000/images/homestaygiare.jpg" alt=""></img>
                                            <h2>Homestay giá rẻ: Lựa chọn tiết kiệm</h2>
                                            <p>Homestay là lựa chọn lưu trú tiết kiệm hơn so với khách sạn. Tại Việt Nam, có rất nhiều homestay giá rẻ,
                                                phù hợp với mọi đối tượng du khách.</p>
                                            <div className={cx("short-line")}></div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={cx("card")}>
                                            <img className={cx("square")} src="http://localhost:5000/images/homestayganbien.jpg" alt=""></img>
                                            <h2>Homestay gần biển: Tận hưởng không khí biển cả</h2>
                                            <p>Những homestay gần biển là lựa chọn lý tưởng cho những du khách muốn tận hưởng không khí biển cả. Tại
                                                đây, du khách có thể tắm biển, tham gia các hoạt động thể thao dưới nước,...</p>
                                            <div className={cx("short-line")}></div>
                                        </div>
                                    </td>
                                </tr>
                            </table>

                        </div>
                    </div>
                    <div className={cx("see-more")}>Xem thêm</div>
                </div>
                <div className={cx("line")}></div>
                <div className={cx("news-list")}>
                    <h3>Mục tin nổi bật</h3>
                    <table>
                        <tr>
                            <td>
                                <div className={cx("card")}>
                                    <img className={cx("hot-square")} src="http://localhost:5000/images/homestayvinhdanh.jpg" alt=""></img>
                                    <h2>Homestay Việt Nam được vinh danh trong top 100 homestay tốt nhất thế giới</h2>
                                    <p>Vào tháng 7 năm 2023, homestay Việt Nam đã được vinh danh trong top 100 homestay tốt
                                        nhất thế giới...
                                    </p>
                                    <div className={cx("short-line")}></div>
                                </div>
                            </td>
                            <td>
                                <div className={cx("card")}>
                                    <img className={cx("hot-square")} src="http://localhost:5000/images/homestaynongtrai.webp" alt=""></img>
                                    <h2>Homestay nông trại: Xu hướng mới của du lịch Việt Nam</h2>
                                    <p>Trong những năm gần đây, homestay nông trại đang trở thành xu hướng mới của du lịch
                                        Việt Nam...
                                    </p>
                                    <div className={cx("short-line")}></div>
                                </div>
                            </td>
                            <td>
                                <div className={cx("card")}>
                                    <img className={cx("hot-square")} src="http://localhost:5000/images/homestaychude.jpg" alt=""></img>
                                    <h2>Homestay theo chủ đề: Trải nghiệm độc đáo, thú vị</h2>
                                    <p>Ngày nay, có rất nhiều homestay theo chủ đề khác nhau, từ homestay chủ đề phim ảnh,
                                        truyện tranh..
                                    </p>
                                    <div className={cx("short-line")}></div>
                                </div>
                            </td>
                        </tr>
                    </table>
                    <div className={cx("see-more")}>Xem thêm</div>
                </div>
            </div>
        </div>
    );
}

export default News;
