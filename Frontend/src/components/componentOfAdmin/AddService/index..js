// import classNames from "classnames/bind";
// import style from './AddService.module.scss';
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useForm } from 'react-hook-form';

// import Button from "src/components/Button";
// import Swal from "sweetalert2";
// const cx = classNames.bind(style);

// function AddService(props) {
//   const [service, setService] = useState(props.service)
//   const [imgval, setImgval] = useState([{ src: "", alt: "" }])

//   const cancelHandle = () => {
//     props.sendData(0);
//     props.sendAllServices(service);
//   }
//   const addImgHandle = (e) => {
//     e.preventDefault();
//     setImgval([...imgval, { src: "", alt: "" }]);
//   }
//   // handle change img
//   const imgHandleChangle = (e, i) => {
//     e.preventDefault();
//     const { name, value } = e.target;
//     const onChangeVal = [...imgval];
//     onChangeVal[i][name] = value;
//     setImgval(onChangeVal);
//   }
//   // handle delete img
//   const deleteImgHandle = (i) => {
//     const deletaVal = [...imgval];
//     deletaVal.splice(i, 1);
//     setImgval(deletaVal);
//   }
//   //  useForm
//   const { register, handleSubmit, reset, formState } = useForm({
//     defaultValues: {
//       name: "",
//       price: 0,
//       quantity: 0,
//       desc: "",
//     }
//   });

//   const onSubmit = async (data) => {
//     try {
//       console.log(data)
//       Object.assign(data, { imgs: imgval });

//       const result = (await axios.post('/api/service/createservice', data)).data;
//       if (result) {
//         await Swal.fire({
//           icon: 'success',
//           title: 'Thêm dịch vụ thành công',
//           text: 'Dịch vụ đã được thêm vào danh sách',
//         })
//         const services = (await axios.get('/api/service/getallservices')).data;
//         setService(services);
//         setImgval([{ src: "", alt: "" }])
//       }
//     } catch (error) {
//       console.log(error)
//     }
//   };
//   useEffect(() => {
//     if (formState.isSubmitSuccessful) {
//       reset({
//         name: "",
//         price: 0,
//         quantity: 0,
//         desc: "",
//       })
//     }
//   }, [formState, reset])

//   return (
//     <>
//       <div className={cx("title", "flex")}>
//         <h2>Thêm dịch vụ</h2>
//         <div className={cx("flex")}>
//           <Button
//             onClick={cancelHandle}
//             feature
//             className={cx("btn", "cancelBtn")}
//           >
//             Cancel
//           </Button>
//           <Button
//             onClick={handleSubmit(onSubmit)}
//             feature
//             className={cx("btn", "addBtn")}
//           >
//             Add
//           </Button>
//         </div>
//       </div>
//       <div className={cx("body")}>
//         <form
//           key={1}
//           onSubmit={handleSubmit(onSubmit)}
//           className={cx('form')}>
//           {/* LEFT FORM ------------------------------------------------------------------------------------ */}
//           <div className={cx("leftForm")}>
//             {/* 1. title name */}
//             <div className={cx('form-group')}>
//               <label htmlFor="name" className={cx('form-label')}>
//                 Tên dịch vụ
//               </label>
//               <input
//                 {...register("name", { required: true, value: "" })} // react hook form
//                 id="name"
//                 name="name"
//                 type="text"
//                 className={cx('form-control-left')}
//               ></input>
//             </div>
//             {/* 2. salary  */}
//             <div className={cx('form-group')}>
//               <label htmlFor="price" className={cx('form-label')}>
//                 Giá dịch vụ
//               </label>
//               <input
//                 {...register("price", { required: true, valueAsNumber: true })} // react hook form
//                 id="price"
//                 name="price"
//                 type="text"
//                 className={cx('form-control-left')}
//               ></input>
//             </div>
//             {/* 3. quantity  */}
//             <div className={cx('form-group')}>
//               <label htmlFor="quantity" className={cx('form-label')}>
//                 Số lượng dịch vụ
//               </label>
//               <input
//                 {...register("quantity", { required: true, valueAsNumber: true })} // react hook form
//                 id="quantity"
//                 name="quantity"
//                 type="text"
//                 className={cx('form-control-left')}
//               ></input>
//             </div>
//             {/* 3. description  */}
//             <div className={cx('form-group')}>
//               <label htmlFor="desc" className={cx('form-label')}>
//                 Mô tả
//               </label>
//               <input
//                 {...register("desc", { required: true, value: "" })} // react hook form
//                 id="desc"
//                 name="desc"
//                 type="text"
//                 className={cx('form-control-left')}
//               ></input>
//             </div>

//           </div>
//           <div className={cx("rightForm")}>
//             {/* 4.img */}
//             <div className={cx("imgDiv")}>
//               <div className={cx("titleImg", "flex")}>
//                 <h4>Ảnh</h4>
//                 <Button
//                   feature
//                   onClick={addImgHandle}
//                   className={cx('btn', 'addBtn')}>
//                   Thêm ảnh
//                 </Button>
//               </div>
//               {
//                 imgval.map((val, index) =>
//                   <div key={index} className={cx("imgInput")}>
//                     <p style={{ paddingTop: 1, fontWeight: 'bold' }}>Hình {index + 1}</p>
//                     <input
//                       name="src"
//                       value={val.src}
//                       placeholder="Nhập link ảnh"
//                       className={cx('form-img1')}
//                       onChange={e => { imgHandleChangle(e, index) }}>
//                     </input>
//                     <input
//                       name="alt"
//                       value={val.alt}
//                       placeholder="Nhập alt"
//                       className={cx('form-img2')}
//                       onChange={e => { imgHandleChangle(e, index) }}>
//                     </input>
//                     <Button
//                       feature
//                       onClick={() => deleteImgHandle(index)}
//                       className={cx('btn', 'deleteBtn')}>Delete</Button>
//                   </div>)
//               }
//             </div>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// }

// export default AddService;



import classNames from "classnames/bind";
import style from './AddService.module.scss';
import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from 'react-hook-form';
import Button from "src/components/Button";
import Swal from "sweetalert2";

const cx = classNames.bind(style);

function AddService({ sendData, sendAllServices, initialData }) {
  const [imgval, setImgval] = useState(initialData ? initialData.imgs : [{ src: "", alt: "" }]);
  const { register, handleSubmit, reset, setValue } = useForm();

  useEffect(() => {
    if (initialData) {
      // Set form values with initial data for editing
      setValue("name", initialData.name);
      setValue("price", initialData.price);
      setValue("quantity", initialData.quantity);
      setValue("desc", initialData.desc);
      setImgval(initialData.imgs || [{ src: "", alt: "" }]); // Update images
    }
  }, [initialData, setValue]);

  const onSubmit = async (data) => {
    try {
      Object.assign(data, { imgs: imgval });

      if (initialData) {
        // Update existing service
        await axios.put(`/api/service/updateservicebyid/${initialData._id}`, data);
        Swal.fire({
          icon: 'success',
          title: 'Cập nhật dịch vụ thành công',
          text: 'Dịch vụ đã được cập nhật',
        });
      } else {
        // Create new service
        await axios.post('/api/service/createservice', data);
        Swal.fire({
          icon: 'success',
          title: 'Thêm dịch vụ thành công',
          text: 'Dịch vụ đã được thêm vào danh sách',
        });
      }

      const services = (await axios.get('/api/service/getallservices')).data;
      sendAllServices(services);
      setImgval([{ src: "", alt: "" }]);
      sendData(0); // Return to main list
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={cx("title", "flex")}>
        <h2>{initialData ? "Chỉnh sửa dịch vụ" : "Thêm dịch vụ"}</h2>
        <div className={cx("flex")}>
          <Button onClick={() => sendData(0)} feature className={cx("btn", "cancelBtn")}>Cancel</Button>
          <Button onClick={handleSubmit(onSubmit)} feature className={cx("btn", "addBtn")}>
            {initialData ? "Update" : "Add"}
          </Button>
        </div>
      </div>
      <div className={cx("body")}>
        <form onSubmit={handleSubmit(onSubmit)} className={cx('form')}>
          <label>Tên dịch vụ</label>
          <input {...register("name")} placeholder="Nhập tên dịch vụ" />
          
          <label>Giá</label>
          <input type="number" {...register("price")} placeholder="Nhập giá dịch vụ" />
          
          <label>Số lượng</label>
          <input type="number" {...register("quantity")} placeholder="Nhập số lượng" />
          
          <label>Mô tả</label>
          <textarea {...register("desc")} placeholder="Nhập mô tả dịch vụ"></textarea>
        </form>
      </div>
    </>
  );
}

export default AddService;
