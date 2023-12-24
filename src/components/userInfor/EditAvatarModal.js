import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DefaultAvt } from "../../constants/userConstants";
import Modal from "../Modal";
import Dropzone, { useDropzone } from "react-dropzone";
import { FaArrowRight } from "react-icons/fa";
import { toast } from "react-toastify";
import { updateAvatar } from "../../actions/userActions";

const EditAvatarModal = (props) => {
  const { open, setOpen, title, btnName, type } = props;
  const dispatch = useDispatch();
  const { loading, userInfo } = useSelector((state) => state.userLogin);
  const [avatar, setAvatar] = useState(userInfo?.data?.user?.avatar?.url);

  const [file, setFile] = useState(null);

  const onDrop = useCallback((acceptFiles) => {
    if (acceptFiles.length > 0) {
      const url = acceptFiles[0];
      const binaryData = [];
      binaryData.push(url);
      //   show up
      setAvatar(
        URL.createObjectURL(new Blob(binaryData, { type: "application/zip" }))
      );
      //   upload to DB
      // console.log(acceptFiles);
      setFile(acceptFiles[0]);
      // console.log(file);
    } else {
      toast.error(`File không hợp lệ`);
    }
  }, []);

  //#region drop zone style
  const {
    getRootProps,
    getInputProps,
    // isDragActive,
    // isFocused,
    // acceptedFiles,
    // isDragAccept,
    // isDragReject,
  } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpeg"],
      "image/webp": [".webp"],
    },
    maxFiles: 1,
  });

  // const handleDrop = (acceptedFiles) => {
  //   setFile(acceptedFiles[0]);
  //   // console.log(file);
  // };
  //   const [open, setOpen] = useState(true);

  const handleOnClick = () => {
    console.log(file);
    let formData = new FormData();
    formData.append("image", file);

    // const formData = {
    //   image: file,
    // };
    dispatch(updateAvatar(formData));
    console.log(formData);
    setOpen(false);
  };

  return (
    <>
      <Modal
        open={open}
        setOpen={setOpen}
        title={title}
        btnName={btnName}
        type={type}
        onClick={handleOnClick}
      >
        <hr className="mx-4" />

        <div className="flex flex-col justify-center items-center my-4">
          <div className="flex justify-center items-center">
            {userInfo?.data?.user?.avatar?.url ? (
              <img
                class="inline-block h-28 w-28 rounded-full ring-2 ring-primary-300"
                src={userInfo?.data?.user?.avatar?.url}
                alt="Avatar Upload"
              />
            ) : (
              <img
                class="inline-block h-28 w-28 rounded-full ring-2 ring-primary-300"
                src={DefaultAvt}
                alt="Avatar Upload"
              />
            )}
            <FaArrowRight className="mx-4 h-6  w-6 text-primary-600" />
            {file ? (
              <img
                className=" inline-block h-28 w-28 rounded-full ring-2 ring-primary-300"
                src={URL.createObjectURL(file)}
                alt="Selected file"
              />
            ) : (
              <img
                className=" inline-block h-28 w-28 rounded-full ring-2 ring-primary-300"
                src={DefaultAvt}
                alt="Selected file"
              />
            )}
          </div>

          {/* <Dropzone onDrop={onDrop}>
            {({ getRootProps, getInputProps }) => (
              <div
                {...getRootProps()}
                className="mt-4  px-4 py-2 border border-dashed border-primary-200  text-sm rounded-lg cursor-pointer
                hover:text-primary-600
                "
              >
                <input {...getInputProps()} />
                <p>Upload Avatar</p>
              </div>
            )}
          </Dropzone> */}

          <div
            {...getRootProps()}
            className="mt-4  px-4 py-2 border border-dashed border-primary-200  text-sm rounded-lg cursor-pointer
                hover:text-primary-600
                "
          >
            <input {...getInputProps()} />
            <p>Upload Avatar</p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default EditAvatarModal;
