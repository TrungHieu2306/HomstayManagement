import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import axios from 'axios';
import Button from 'src/components/Button';
import Success from 'src/components/Success';
import Error from 'src/components/Error';
import Loader from 'src/components/Loader';
const cx = classNames.bind(styles);

function Login() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [psw, setPsw] = useState('');
    const [cpsw, setCpsw] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [success, setSuccess] = useState();
    const [validationErrors, setValidationErrors] = useState({}); // Lưu trữ lỗi từng trường

    const [formHeight, setFormHeight] = useState(0);
    const formRegisterRef = useRef();

    useEffect(() => {
        setFormHeight(formRegisterRef.current.clientHeight);
    }, []);

    const isEmailValid = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validateForm = () => {
        const errors = {};
        if (!name) {
            errors.name = 'Tên không được để trống.';
        }
        if (!email) {
            errors.email = 'Email không được để trống.';
        } else if (!isEmailValid(email)) {
            errors.email = 'Email không hợp lệ.';
        }
        if (psw !== cpsw) {
            errors.cpsw = 'Mật khẩu xác nhận không khớp.';
        }
        return errors;
    };

    const registerHandle = async (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors); // Nếu có lỗi, lưu lỗi lại và dừng xử lý
            return;
        }

        const user = { name, email, psw, cpsw };
        try {
            setLoading(true);
            const result = (await axios.post('/api/users/register', user)).data;
            console.log(result);
            setLoading(false);
            setSuccess(true);

            setName('');
            setEmail('');
            setPsw('');
            setCpsw('');
            setValidationErrors({}); // Xóa lỗi sau khi thành công
        } catch (error) {
            console.log(error);
            setLoading(false);
            setError(true);
        }
    };

    return (
        <>
            {loading && <Loader />}
            {error && <Error />}
            {success && <Success message={'Đăng ký thành công'} />}
            <div className={cx('wrapper', 'flex')}>
                <div className={cx('bg')}>
                    <img
                        style={{ height: formHeight }}
                        src="https://i.pinimg.com/564x/f1/ba/82/f1ba82ad7808a47b58fc207f1ed54169.jpg"
                        alt="bgLogin"
                    />
                </div>
                <div className={cx('main')}>
                    <form
                        ref={formRegisterRef}
                        className={cx('form')}
                        id="form-1"
                    >
                        <h3 className={cx('heading')}>Đăng ký</h3>
                        <p className={cx('desc')}>
                            Tìm kiếm Homestay đơn giản với TungHeeu
                        </p>
                        <div className={cx('spacer')}></div>

                        {/* Name */}
                        <div className={cx('form-group')}>
                            <label htmlFor="fullname" className={cx('form-label')}>
                                Họ tên
                            </label>
                            <input
                                id="fullname"
                                name="fullname"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Ví dụ: Nguyễn Trung Hiếu"
                                className={cx('form-control', {
                                    'is-invalid': validationErrors.name, // Đánh dấu lỗi nếu có
                                })}
                            />
                            {validationErrors.name && (
                                <span className={cx('form-message', 'error')}>{validationErrors.name}</span>
                            )}
                        </div>

                        {/* Email */}
                        <div className={cx('form-group')}>
                            <label htmlFor="email" className={cx('form-label')}>
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Ví dụ :hieub2005672@student.ctu.edu.vn"
                                className={cx('form-control', {
                                    'is-invalid': validationErrors.email,
                                })}
                            />
                            {validationErrors.email && (
                                <span className={cx('form-message', 'error')}>{validationErrors.email}</span>
                            )}
                        </div>

                        {/* Password */}
                        <div className={cx('form-group')}>
                            <label htmlFor="password" className={cx('form-label')}>
                                Mật khẩu
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={psw}
                                onChange={(e) => setPsw(e.target.value)}
                                placeholder="Ví dụ: 123456"
                                className={cx('form-control', {
                                    'is-invalid': validationErrors.psw,
                                })}
                            />
                            {validationErrors.psw && (
                                <span className={cx('form-message', 'error')}>{validationErrors.psw}</span>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className={cx('form-group')}>
                            <label htmlFor="password_confirmation" className={cx('form-label')}>
                                Nhập lại mật khẩu
                            </label>
                            <input
                                id="password_confirmation"
                                name="password_confirmation"
                                type="password"
                                value={cpsw}
                                onChange={(e) => setCpsw(e.target.value)}
                                placeholder="Ví dụ: 123456"
                                className={cx('form-control', {
                                    'is-invalid': validationErrors.cpsw,
                                })}
                            />
                            {validationErrors.cpsw && (
                                <span className={cx('form-message', 'error')}>{validationErrors.cpsw}</span>
                            )}
                        </div>

                        {/* Direction Login */}
                        <span className={cx('flex')}>
                            Nếu bạn đã có tài khoản
                            <p className={cx('directionLogin')}>
                                <Link to="/Login" style={{color: 'blue'}}>Đăng nhập</Link>
                            </p>
                        </span>

                        <Button className={cx('form-submit')} onClick={registerHandle} primary small>
                            Đăng ký
                        </Button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;


