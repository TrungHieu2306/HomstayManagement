
import classNames from "classnames/bind";
import styles from "./AddServiceBooking.module.scss";
import Button from "src/components/Button";
import { AiOutlineClose } from 'react-icons/ai';
import { useForm } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import useFetch from "src/Hook/useFetch";
import axios from "axios";
import Swal from 'sweetalert2';
import { FaServicestack } from "react-icons/fa";

const cx = classNames.bind(styles);

function AddServiceBooking(props) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const { data } = useFetch('/api/service/getallservices');

    const [service, setService] = useState([]);
    const [serviceVal, setServiceVal] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(0);
    const [price1, setPrice1] = useState(0);
    const [serviceGet, setServiceGet] = useState(null);
    const [listService, setListService] = useState([]);

    useEffect(() => {
        if (data && data.length > 0) {
            setService(data);
            setServiceGet(data[0]);
            setPrice(data[0].price);
            setPrice1(data[0].price);
            setServiceVal(data[0]._id);
        }
    }, [data]);

    const { register, handleSubmit } = useForm({
        defaultValues: {
            quantity: 1,
            price: 0,
        }
    });

    const totalamount = useMemo(() => {
        return listService.reduce((total, serviceItem) => total + serviceItem.totalamount, 0);
    }, [listService]);

    const onSubmit = async (formData) => {
        if (!serviceGet) return; // Prevent submission if serviceGet is not set

        Object.assign(formData, {
            price: serviceGet.price,
            totalamount: price,
            name: serviceGet.name,
            id: serviceGet._id
        });

        let count = 0;
        const listServiceItem = listService.map(serviceItem => {
            if (formData.id === serviceItem.id) {
                count++;
                return formData;
            }
            return serviceItem;
        });
        if (count === 0) {
            setListService([...listService, formData]);
        } else {
            setListService(listServiceItem);
        }

        // API call to reduce the service quantity on the server
        try {
            await axios.put(`/api/service/reduceservicequantity/${serviceGet._id}`, {
                reductionAmount: formData.quantity
            });
            Swal.fire({
                icon: 'success',
                title: 'Thành công!',
                text: 'Dịch vụ đã được thêm thành công!',
                timer: 1500,
                showConfirmButton: false
            });
        } catch (error) {
            console.error("Error updating service quantity:", error);
            Swal.fire({
                icon: 'error',
                title: 'Lỗi!',
                text: 'Có lỗi xảy ra khi giảm số lượng dịch vụ.',
            });
        }
    };

    const onChangeSelect = async (e) => {
        const selectedServiceId = e.target.value;
        setServiceVal(selectedServiceId);

        try {
            const result = (await axios.get(`/api/service/getservicebyid/${selectedServiceId}`)).data;
            setServiceGet(result);
            setPrice(result.price);
            setPrice1(result.price);
            setQuantity(1);
        } catch (error) {
            console.log(error);
        }
    };

    const closeHandle = (e) => {
        e.preventDefault();
        if (e.target === e.currentTarget) {
            props.openAddServiceBooking(false);
            props.listService(listService);
        }
    };

    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    return (
        <div onClick={closeHandle} className={cx("wrapper")}>
            <div className={cx('inner')}>
                <div className={cx("closeBtn")}>
                    <AiOutlineClose className={cx("icon")} onClick={closeHandle} />
                </div>
                <h2 className={cx('heading')}>Đăng ký dịch vụ</h2>
                <p className={cx('desc')}>Tìm kiếm Homestay đơn giản với TungHeeu</p>
                <form
                    className={cx('formAddService')}
                    id="form"
                    key={1}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className={cx("top", 'flex')}>
                        <div className={cx("left")}>
                            <div className={cx('form-group')}>
                                <label htmlFor="service" className={cx('form-label')}>Dịch vụ</label>
                                <div className={cx('input')}>
                                    <select
                                        value={serviceVal}
                                        onChange={onChangeSelect}
                                        name="service"
                                        className={cx('form-control')}
                                    >
                                        {service.map((val, index) => (
                                            <option key={index} value={val._id}>
                                                {val.name} - Còn {val.quantity || 0} lượt
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className={cx('form-group')}>
                                <label htmlFor="quantity" className={cx('form-label')}>
                                    Số lượng
                                </label>
                                <input
                                    {...register("quantity", {
                                        required: true,
                                        valueAsNumber: true,
                                        onChange: e => {
                                            const qty = parseInt(e.target.value || 0);
                                            setQuantity(qty);
                                            setPrice(qty * price1);
                                        },
                                    })}
                                    name="quantity"
                                    type="number"
                                    className={cx('form-control')}
                                    min="1"
                                    max={serviceGet ? serviceGet.quantity : 1}
                                />
                            </div>
                            <div className={cx('form-group')}>
                                <label htmlFor="price" className={cx('form-label')}>Giá dịch vụ</label>
                                <input
                                    value={price}
                                    onChange={e => setPrice(e.target.value)}
                                    disabled
                                    name="price"
                                    type="number"
                                    className={cx('form-control')}
                                />
                            </div>
                        </div>
                    </div>
                </form>
                <div className={cx('button-group')}>
                    <Button
                        className={cx('form-submit')}
                        onClick={closeHandle}
                        primary
                    >
                        Trở về
                    </Button>
                    <Button
                        className={cx('form-submit')}
                        onClick={handleSubmit(onSubmit)}
                        primary
                    >
                        Thêm dịch vụ
                    </Button>
                </div>

                <div className={cx("listServiceBoking")}>
                    {listService.length === 0 ? (

                        <h4 style={{ color: 'rgb(10 138 167)' }}>Dịch vụ đã chọn: <span style={{ color: '#000', fontWeight: '400' }}>Chưa có dịch vụ</span></h4>
                    ) : (
                        <>
                            <h4 style={{ color: 'rgb(10 138 167)' }}>Dịch vụ đã chọn:</h4>
                            <ul>
                                {listService.map((serviceval, index) => (
                                    <li key={index} className={cx("flex")}>
                                        <h4>{serviceval.name}:&#160;</h4>
                                        <p>{formatter.format(serviceval.price)} x {serviceval.quantity} = &#160;</p>
                                        <p style={{ color: "#00695c", fontWeight: "bold" }}>
                                            {formatter.format(serviceval.totalamount)}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                            {totalamount !== 0 && (
                                <div className={cx("flex")}>
                                    <h4>Tổng tiền dịch vụ:&#160;</h4>
                                    <h4 style={{ color: "#e64a19", fontWeight: "bold" }}>
                                        {formatter.format(totalamount)}
                                    </h4>
                                </div>
                            )}
                        </>
                    )}
                </div>

            </div>
        </div>
    );
}

export default AddServiceBooking;




