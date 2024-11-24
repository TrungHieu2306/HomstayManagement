import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import Button from 'src/components/Button';
import Loader from 'src/components/Loader';
import Error from 'src/components/Error';
import Success from 'src/components/Success';
const cx = classNames.bind(styles); //return function cx
function Login() {
    const [email, setEmail] = useState('');
    const [psw, setPsw] = useState('');

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const [success, setSuccess] = useState()

    const [formHeight, setFormHeight] = useState(0);
    const formLoginRef = useRef();

    useEffect(() => {
        setFormHeight(formLoginRef.current.clientHeight);
    }, []);

    const loginHandle = async(e) => {
        e.preventDefault();
        const user = {
            email,
            psw,
        }
        try {
            setLoading(true)
            const result = (await axios.post('/api/users/login', user)).data;
            setLoading(false)
            setSuccess(true)

            localStorage.setItem('currentUser',JSON.stringify(result));
            if (result.isAdmin) {
                window.location.href = '/admin'
            } else {
                window.location.href = '/'
            }
        } catch (error) {
            console.log(error);
            setLoading(false)
            setError(true);
        }
    }

 
    return (
      <>
        {loading && (<Loader/>)}
        {error && (<Error message='Thông tin không hợp lệ'/>)}
        {success && (<Success message='Đăng nhập thành công'/>)}
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
                                ref={formLoginRef}
                                // action=""
                                // method="POST"
                                className={cx('form')}
                                id="form-2"
                            >
                                <h3 className={cx('heading')}>Đăng Nhập</h3>
                                <p className={cx('desc')}>Tìm kiếm Homestay đơn giản với TungHeeu</p>
                                <div className={cx('spacer')}></div>
                                {/* email */}
                                <div className={cx('form-group')}>
                                    <label htmlFor="email" className={cx('form-label')}>
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="text"
                                        value={email}
                                        onChange={(e) => {setEmail(e.target.value)}}
                                        placeholder="Ví dụ: hieub2005672@student.ctu.edu.vn"
                                        className={cx('form-control')}
                                    ></input>
                                    <span className={cx('form-message')}></span>
                                </div>
    
                                {/* password */}
                                <div className={cx('form-group')}>
                                    <label htmlFor="password" className={cx('form-label')}>
                                        Mật khẩu
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value = {psw}
                                        onChange={(e) => {setPsw(e.target.value)}}
                                        placeholder="Ví dụ: 123456"
                                        className={cx('form-control')}
                                    ></input>
                                    <span className={cx('form-message')}></span>
                                </div>
                                {/* direction Register */}  
                                <span className={cx('flex')}>
                                    Nếu bạn chưa tạo tài khoản
                                    <p className={cx('directionRegister')} >
                                        <Link to='/Register' style={{color: 'blue'}}>Đăng ký</Link>
                                    </p>
                                </span>
                                <Button 
                                    className={cx('form-submit')} 
                                    onClick={loginHandle} 
                                    primary 
                                    small>
                                        Đăng Nhập
                                </Button>
                            </form>
                        </div>
                        
                  
            </div>
      </>
    );
}

export default Login;



