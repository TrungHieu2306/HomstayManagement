import classNames from 'classnames/bind';
import style from './Home.module.scss';
import RoomListVertical from 'src/components/Layout/components/RoomListVertical';
import SearchHorizontal from 'src/components/Layout/components/SearchHorizontal';
import { BiSolidError } from 'react-icons/bi';
import { AiOutlineHome } from 'react-icons/ai';
import { HiOutlineClipboardDocumentList, HiOutlineNewspaper } from 'react-icons/hi2';
import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'src/components/Image';
import { Diversity2Outlined } from '@mui/icons-material';

// import ok from 
// ---------------------------------------------------------------
import { Link } from 'react-router-dom';

const urlAdvertisiment = "https://img.freepik.com/free-photo/starry-sky-town_23-2151642624.jpg?t=st=1730045398~exp=1730048998~hmac=d74b4350b5ffe188fa32aef4908eec1fa791c00bdf7385ee43bcfad02be3f010&w=1380";
const cx = classNames.bind(style);
const steps = [
    {
        label: 'Đăng ký/Đăng nhập tài khoản',
        description: `Để trải nghiệm các tính năng tuyệt vời của trang web cũng như để biết
        được những dịch vụ mà Tung Heeu cung cấp bạn cần có 1 tài khoản để đăng nhập 
        vào hệ thống.`,
    },
    {
        label: 'Tìm kiếm và lựa chọn ngày phù hợp',
        description:
            `Tìm kiếm bằng cách chọn chi nhánh, thời gian đến, thời gian đi, sau đó chọn số lượng
        người ở, tiếp đến chọn giá phòng và cuối cùng bấm tìm kiếm để lọc ra những phòng phù 
        hợp với nhu cầu của khách hàng.`,
    },
    {
        label: 'Đặt phòng nhanh',
        description: `Chọn phòng phù hợp sau đó tiến hành đặt phòng bằng cách nhấn vào xem chi tiết phòng,
        Chọn đặt phòng, nhập đầy đủ thông tin người đặt sau đó thanh toán và đợi xác nhận của bên bộ
        phần quản lý của Tuung Heeu.`,
    },
];

function Home() {
    const [dataSearch, setDataSearch] = useState('')
    const sendDataDate = (data) => {
        setDataSearch(data)
    }

    // step material ui
    const [activeStep, setActiveStep] = useState(0);
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleReset = () => {
        setActiveStep(0);
    };
    // video
    const videoEl = useRef(null);
    const attemptPlay = () => {
        videoEl &&
            videoEl.current &&
            videoEl.current.play().catch(error => {
                console.error("Video bị lỗi không thể tự động phát", error);
            });
    };

    useEffect(() => {
        attemptPlay();
    }, []);
    return (
        <div className={cx('wrapper', 'flex')}>
            <SearchHorizontal sendDataDate={sendDataDate} />
            {dataSearch ? (
                <div>
                    <h1 className={cx('title')}>Danh sách phòng</h1>
                    {(dataSearch.filteredRooms.length > 0) ?
                        (<>
                            <RoomListVertical dataSearch={dataSearch} />
                        </>) :
                        (<>
                            <div className={cx("infoErorr", "flex")}>
                                <BiSolidError className={cx("icon")}></BiSolidError>
                                <h3> Không có phòng phù hợp với yêu cầu trên! </h3>
                            </div>
                        </>)}

                </div>) : (<></>)}
            {/* bottom Home */}
            {/* See branch */}
            <div className={cx("seeBranch")}>
                <h1 className={cx('title')}>Lựa chọn chi nhánh</h1>
                <p>Homestay có nhiều chi nhánh để cho bạn lựa chọn phù hợp với điểm đến của bạn, mỗi chi nhánh đều có những dịch vụ, tiện nghi khác nhau phục vụ cho nhu cầu của bạn</p>
                <div className={cx('imageRoom', 'flex')}>
                    <div className={cx('imagePrimary')}>
                        <Link to='/Room' className={cx("img1Branch")}>
                            <Image
                                // src="//pix8.agoda.net/hotelImages/537/5371569/5371569_18072609490067119055.jpg?ca=0&ce=1&s=450x450"
                                src="https://img.freepik.com/free-photo/3d-rendering-house-model_23-2150799629.jpg?ga=GA1.1.1717531709.1724817409"
                                alt="branch1"
                                className={cx('image1')}
                            />
                            <p>Chi nhánh 1 </p>

                        </Link>
                    </div>
                    <div className={cx('imagePrimary')}>
                        <Link to='/Room' className={cx("img2Branch")}>
                            <Image
                                // src="https://pix8.agoda.net/hotelImages/42032498/0/0bc5d91af089192ba146849ced7df1d7.jpg?ce=0&s=1024x768"
                                src="https://img.freepik.com/free-photo/luxurious-villa-with-modern-architectural-design_23-2151694124.jpg?ga=GA1.1.1717531709.1724817409"
                                alt="branch2"
                                className={cx('image2')}
                            />
                            <p>Chi nhánh 2 </p>

                        </Link>
                    </div>
                    <div className={cx('imagePrimary')}>
                        <Link to='/Room' className={cx("img3Branch")}>
                            <Image
                                // src="//pix8.agoda.net/hotelImages/16720878/-1/7e697238cc6e8d99b368c5786d9b5a3d.jpg?ce=0&s=450x450"
                                src="https://img.freepik.com/free-photo/luxurious-villa-with-modern-architectural-design_23-2151694048.jpg?ga=GA1.1.1717531709.1724817409"
                                alt="branch3"
                                className={cx('image3')}
                            />
                            <p>Chi nhánh 3 </p>

                        </Link>
                    </div>
                    {/* <div className={cx('imageSub', 'flex')}>
                        <Link to='/Room' className={cx("img2Branch")}>
                            <Image
                                src="https://pix8.agoda.net/hotelImages/42032498/0/0bc5d91af089192ba146849ced7df1d7.jpg?ce=0&s=1024x768"
                                alt="branch2"
                                className={cx('image2')}
                            />
                            <p>Chi nhánh 2 </p>

                        </Link>

                        <Link to='/Room' className={cx("img3Branch")}>
                            <Image
                                src="//pix8.agoda.net/hotelImages/16720878/-1/7e697238cc6e8d99b368c5786d9b5a3d.jpg?ce=0&s=450x450"
                                alt="branch3"
                                className={cx('image3')}
                            />
                            <p>Chi nhánh 3 </p>

                        </Link>
                    </div> */}
                </div>
            </div>
            {/* why choose us*/}
            <div className={cx("whychooseusDiv")}>
                <h1 className={cx('title')}>Tại sao lựa chọn chúng tôi?</h1>
                <div className={cx("flex")}>
                    <div className={cx("reasonDiv")}>
                        <Image
                            className={cx("img")}
                            src="https://cdn-icons-png.flaticon.com/512/313/313176.png"
                            alt="money"
                        />
                        <h3>Giá cả hợp lý</h3>
                        <p>Homestay đặt ra những mức giá phù hợp với giá cả thị trường và phù hợp với khách hàng</p>
                    </div>
                    <div className={cx("reasonDiv")}>
                        <Image
                            className={cx("img")}
                            src="https://cdn-icons-png.flaticon.com/512/3837/3837136.png"
                            alt="voucher"
                        />
                        <h3>Khuyến mãi, ưu đãi</h3>
                        <p>Đề ra nhiều chính sách ưu đãi trong những dịp lễ cho khách du lịch và kèm thêm nhiều khuyến mãi vourcher cho khách hàng thành viên</p>
                    </div>
                    <div className={cx("reasonDiv")}>
                        <Image
                            className={cx("img")}
                            src="https://cdn-icons-png.flaticon.com/512/1533/1533265.png"
                            alt="convenient"
                        />
                        <h3>Tiện nghi</h3>
                        <p>Cung cấp nhiều tiện nghi giúp cho khách du lịch có 1 trải nghiệm tuyệt vời tại thành phố Cần Thơ</p>
                    </div>
                </div>
            </div>
            {/* feature */}
            <div className={cx("bestFeatureDiv", "flex")}>
                <div className={cx("Left-bestFeatureDiv")}>
                    <h5
                        style={{ color: "#0172a7" }}
                    >
                        TungHeeu Homestay
                    </h5>
                    <h3 >Những tính năng tốt giành cho bạn</h3>
                    <p> TungHeeu Homestay cung cấp cho khách hàng nhiều tính năng hữu dụng giúp cho bạn có thể dễ dàng thao tác và tương tác với
                        Homestay đồng thời cũng dễ dàng những dịch vụ mà TungHeeu Homestay cung cấp.
                    </p>
                    <div className={cx("body-BestFeatures")}>
                        <Link to="/Room">
                            <div className={cx("featureBox", "flex")}>
                                <div className={cx("iconFeatureBox")}
                                    style={{
                                        color: "#00695c",
                                        backgroundColor: "#80cbc4",
                                    }}
                                >
                                    <AiOutlineHome className={cx("icon")} />
                                </div>
                                <div className={cx("feature-group")}>
                                    <h4>Đặt phòng nhanh</h4>
                                    <p>Dễ dàng trong việc tìm kiếm và lựa chọn phòng phù hợp với nhu cầu khách hàng để có được nơi nghỉ dường tuyệt vời tại thành phố Cần Thơ</p>
                                </div>
                            </div>
                        </Link>
                        <Link to="/ListBooked" >
                            <div className={cx("featureBox", "flex")}>
                                <div className={cx("iconFeatureBox")}
                                    style={{
                                        color: "#b71c1c",
                                        backgroundColor: "#ef9a9a",
                                    }}
                                >
                                    <HiOutlineClipboardDocumentList className={cx("icon")} />
                                </div>
                                <div className={cx("feature-group")}>
                                    <h4>Xem danh sách phòng đã đặt</h4>
                                    <p>Quản lý danh sách các đơn đặt phòng để quan sát 1 cách chi tiết đồng thời có thể hủy đặt nếu có nhu cầu</p>
                                </div>
                            </div>
                        </Link>
                        <Link to="/News">
                            <div className={cx("featureBox", "flex")}>
                                <div className={cx("iconFeatureBox")}
                                    style={{
                                        color: "#f57f17",
                                        backgroundColor: "#fff176",
                                    }}
                                >
                                    <HiOutlineNewspaper className={cx("icon")} />
                                </div>
                                <div className={cx("feature-group")}>
                                    <h4>Xem tin tức</h4>
                                    <p>Nắm bắt được tình hình những cập nhật mới TungHeeu Homestay và bắt kịp xu hướng du lịch hiện nay</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className={cx("right-FeatureDiv")}>
                    <div className={cx('imgFeatureBox')}>
                        <div className={cx("top-right-FeatureDiv", "flex")}>
                            <Image className={cx("imgFeature1")} src="https://vemekong.com/wp-content/uploads/2021/04/can-tho-bridge-vietnam-10a-1024x576.jpg" />
                            <Image className={cx("imgFeature2")} src="https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2019/11/3/763750/A22.JPG" />
                        </div>
                        <div className={cx("bot-right-FeatureDiv", "flex")}>
                            <Image className={cx("imgFeature3")} src="https://vietnamtouristvn.com/upload/images/nha-co-binh-thuy-can-tho4.jpg" />
                            <Image className={cx("imgFeature4")} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiVFz-1DbBR1KTVM5FZxuPPUPjY8ibPRKiGw&s" />
                        </div>
                    </div>
                </div>
            </div>

            {/* intruction */}
            {/* <div className={cx("intructionUsage","flex")}>
                <div className={cx("left-intructionUsageDiv")}>
                    <h3>Video hướng dẫn</h3>
                    <div className={cx("videoIntructionUsage")}>
                    <video
                        style={{ width: "900px", height:"400px", margin: "0 auto" }}
                        playsInline
                        loop
                        muted
                        alt="Video intruction"
                        src="/VideoHomestayUsageIntruction.mp4"
                        ref={videoEl}
                    />         
                    </div>
               </div>   
               <div className={cx("right-intructionUsageDiv")}>
                    <h5 
                        style={{color:"#0172a7"}}
                    >
                        Tuung Heeu
                    </h5>
                    <h3 >Hướng dẫn đặt phòng</h3>
                    <Box 
                        sx={{ 
                            m: "1rem 2rem",
                            maxWidth: 400,
                        }}>
                        <Stepper sx={{fontSize: "18px",}} activeStep={activeStep} orientation="vertical">
                            {steps.map((step, index) => (
                            <Step  sx={{fontSize: "18px"}} key={step.label}>
                                <StepLabel
                                sx={{fontSize: "18px",}}
                                optional={
                                    index === 2 ? (
                                        <Typography sx={{fontSize: "18px"}} variant="caption">Bước cuối</Typography>
                                    ) : null
                                }
                                >
                                    <Typography sx={{fontSize: "15px"}}>{step.label}</Typography>
                                </StepLabel>

                                <StepContent>
                                    <Typography sx={{fontSize: "15px"}}>{step.description}</Typography>
                                    <Box sx={{ mb: 2 }}>
                                        <div>
                                            <Button
                                                variant="contained"
                                                onClick={handleNext}
                                                sx={{ mt: 1, mr: 1,fontSize: "14px" }}
                                            >
                                                {index === steps.length - 1 ? 'Hoàn thành' : 'Tiếp tục'}
                                            </Button>
                                            <Button
                                                disabled={index === 0}
                                                onClick={handleBack}
                                                sx={{ mt: 1, mr: 1,fontSize: "14px" }}
                                            >
                                                Quay lại
                                            </Button>
                                        </div>
                                    </Box>
                                </StepContent>
                            </Step>
                            ))}
                        </Stepper>
                        {activeStep === steps.length && (
                            <Paper square elevation={0} sx={{ p: 3 }}>
                            <Typography sx={{fontSize: "18px", color:"#00695c"}}>Bây giờ hãy lựa chọn và đặt phòng thôi nào</Typography>
                            <Button onClick={handleReset} sx={{ mt: 1, mr: 1,fontSize: "18px" }}>
                                Làm mới
                            </Button>
                            </Paper>
                        )}
                        </Box>
                </div>
            </div> */}

            {/* advertisement */}
            <div className={cx("bannerAdvertisement")}>
                <Image
                    className={cx("imgBannerAdv")}
                    src={urlAdvertisiment}
                    alt="bannerAdv"
                />
            </div>
        </div>


    );
}

export default Home;
