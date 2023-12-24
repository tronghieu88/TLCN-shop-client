// import { useSelector } from "react-redux"
// import { useNavigate } from "react-router-dom";

// // export const checkoutLogin=function(){
// //     const { logout } = useSelector((state) => state.userLogin);
// //     const navigate = useNavigate();
// //     return 0;
// }
import { toast } from "react-toastify";
const configToast = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

export const toastSuccess = (mess) => {
  toast.success(`${mess}`, configToast);
};

export const toastError = (mess) => {
  toast.error(`${mess}`, configToast);
};

export const toastWarn = (mess) => {
  toast.warn(`${mess}`, configToast);
};

export const addDays = (x) => {
  const newdate = new Date(x);
  // const dateCopy = new Date();
  newdate.setDate(newdate.getDate() + 3);
  return newdate.toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
