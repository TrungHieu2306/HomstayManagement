import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import Button from 'src/components/Button';
import { FiLogOut, FiMenu } from 'react-icons/fi';
import { MdOutlineListAlt } from 'react-icons/md';
import { IoMdArrowDropdown } from 'react-icons/io';
import { AiOutlineUser } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Image from 'src/components/Image';
// material
import ButtonMenu from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Badge from '@mui/material/Badge';
// ------
import { useRef, useState } from 'react';
import useFetch from 'src/Hook/useFetch';

const cx = classNames.bind(styles); //return function cx

function Header() {
    const user = JSON.parse(localStorage.getItem('currentUser')) //Lấy thông tin người dùng hiện tại được lưu trong localStorage. User là một đối tượng chứa thông tin của người dùng hiện tại

    const { data, loading } = useFetch(`/api/booking/getbookingsbyuserid/${user ? user._id : 0}`) //gọi API để lấy thông tin của người dùng
    // dropdown menu
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClickUser = (e) => {
        setAnchorEl(e.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
    };
    const logoutHandle = () => {
        setAnchorEl(null);
        localStorage.removeItem('currentUser');
        window.location.href = '/login';
    }
    // 
    // responsive
    const [showTab, setShowTab] = useState(false)
    const toggleTabItems = () => {
        setShowTab(!showTab)
        console.log(showTab);
    }

    return (
        <header className={cx('wrapper')}>
            <div className={cx('logo')}>
                <Link to="/">
                    <img src="/logoo1.png" alt="logoHomestay" />
                    {/* <img src="/logoPrimary.png" alt="logoHomestay" /> */}
                </Link>
            </div>
            <div className={cx('inner')}>
                <div className={cx('tab', `${showTab && 'active'}`)}>
                    {/* Nếu giá trị showTab là true, lớp active sẽ được thêm vào, nếu không, nó sẽ bị bỏ qua.  */}
                    <Link to="/Room">
                        <div className={cx('tab-item')}>Phòng</div>
                    </Link>
                    <Link to="/Service">
                        <div className={cx('tab-item')}>Dịch vụ</div>
                    </Link>
                    <Link to="/News">
                        <div className={cx('tab-item')}>Tin tức</div>
                    </Link>
                    <Link to="/Contact">
                        <div className={cx('tab-item')}>Tư vấn</div>
                    </Link>
                    <Link to="/ListBooked">
                        <div className={cx('tab-item')}>Đơn đặt phòng</div>
                    </Link>
                </div>
                {/* checked login */}
                <div className={cx('login-register')}>
                    {user ? ( // nếu người dùng đã đăng nhập, có biến user -> hiện menu, nếu người dùng chưa đăng nhập -> hiện nút đăng nhập
                        // đoạn mã sẽ thực thi vì user đã đăng nhập
                        <div className={cx('header-after-login')}>
                            <div className={cx('userLogin')}>
                                <ButtonMenu
                                    id="basic-button"
                                    className={cx('nameUser')}
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClickUser}
                                >
                                    {(user.avatar) ? (

                                        <Badge // badge hiển thị tráng thái online
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'left',
                                            }}
                                            color="success" variant="dot">
                                            <img src={`http://localhost:5000/Images/` + user.avatar} className={cx('user-avatar')} alt="img-avatar"></img>
                                        </Badge>
                                    ) : (
                                        <Image src="" className={cx('user-avatar')} alt="img-avatar" />
                                    )}
                                    {user.name}
                                    <IoMdArrowDropdown className={cx('icon')}></IoMdArrowDropdown>
                                </ButtonMenu>
                                <Menu
                                    id="basic-menu"
                                    className={cx('menuUser')}
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <Link to='/Profile'>
                                        <MenuItem onClick={handleClose} className={cx('menuItem')}>
                                            <AiOutlineUser className={cx('icon')}></AiOutlineUser>
                                            <p>Thông tin cá nhân</p>
                                        </MenuItem>
                                    </Link>
                                    <Link to='/ListBooked'>
                                        <MenuItem onClick={handleClose} className={cx('menuItem')}>
                                            {
                                                data.length > 0 ? (
                                                    <Badge badgeContent={data.length} color="warning">
                                                        <div
                                                            className={cx("flex")}
                                                            style={{
                                                                justifyContent: "center",
                                                                alignItems: "center",
                                                                // padding: "1rem 0",
                                                            }}
                                                        >
                                                            <MdOutlineListAlt className={cx('icon')}></MdOutlineListAlt>
                                                            <p>Danh sách phòng đã đặt</p>
                                                        </div>
                                                    </Badge>
                                                ) : (
                                                    <div
                                                        className={cx("flex")}
                                                        style={{
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                            // padding: "1rem 0",
                                                        }}
                                                    >
                                                        <MdOutlineListAlt className={cx('icon')}></MdOutlineListAlt>
                                                        <p>Danh sách phòng đã đặt</p>
                                                    </div>
                                                )
                                            }

                                        </MenuItem>
                                    </Link>
                                    <MenuItem onClick={logoutHandle} className={cx('menuItem')}>
                                        <FiLogOut className={cx('icon')}></FiLogOut>
                                        <p>Đăng xuất</p>
                                    </MenuItem>
                                </Menu>
                            </div>
                        </div>
                    ) : (
                        // đoạn mã sẽ thực thi vì user chưa đăng nhập
                        <>
                            <Button primary to="/login">
                                Đăng Nhập
                            </Button>
                        </>
                    )}
                </div>
                <div
                    className={cx("menu")}
                    onClick={toggleTabItems}
                >
                    <FiMenu
                        className={cx("iconMenu")}
                    />
                </div>
            </div>
        </header>
    );
}

export default Header;

