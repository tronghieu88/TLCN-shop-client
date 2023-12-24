import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
import { BiEdit } from "react-icons/bi";
import { GrAddCircle } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";
import EditInforModal from "../components/userInfor/EditInforModal";
import EditAddressModal from "../components/userInfor/EditAddressModal";
import DeleteAddressModal from "../components/userInfor/DeleteAddressModal";
import AddAddressModal from "../components/userInfor/AddAddressModal";
import EditAvatarModal from "../components/userInfor/EditAvatarModal";
import { DefaultAvt } from "../constants/userConstants";

const UserInfor = () => {
  const dispatch = useDispatch();
  const { loading, userInfo } = useSelector((state) => state.userLogin);

  // console.log(userInfo);
  // console.log(loading);

  //handle Update name,phone,sex
  const [openEditInfor, setOpenEditnfor] = useState(false);

  //handle Update Address
  const [openEditAvatar, setOpenEditAvatar] = useState(false);
  const [openEditAddress, setOpenEditAddress] = useState(false);
  const [openDeleteAddress, setOpenDeleteAddress] = useState(false);
  const [openAddAddress, setOpenAddAddress] = useState(false);
  const [addressDetail, setAddressDetail] = useState(0);

  const handleEditAddress = (index) => {
    setOpenEditAddress(true);
    setAddressDetail(index);
  };

  const handleDeleteAddress = (index) => {
    setOpenDeleteAddress(true);
    setAddressDetail(index);
  };

  return (
    <>
      {loading && <Loading />}
      <div className="  rounded-lg  mx-4 lg:mx-40 bg-white shadow-lg">
        <div className="m-4">
          <h1 class="mb-10 text-center text-xl font-bold ">
            Thông tin người dùng
          </h1>

          {/* IMG */}
          <div className="flex flex-col justify-center items-center">
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
            <div class="flex justify-center space-x-2 mr-2 lg:w-[15%] w-[45%] mt-4">
              <button
                type="button"
                onClick={() => setOpenEditAvatar(true)}
                class="flex w-full  items-center justify-center rounded-md border border-transparent 
                          bg-primary-600 p-2 text-base font-medium text-white hover:bg-primary-700 focus:outline-none 
                            focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                <BiEdit className="mr-2 " />
                Upload
              </button>
            </div>
            {/* <label className="cursor-pointer mt-4">
              <span class="mt-2 leading-normal px-4 py-2 border border-dashed  text-sm rounded-lg">
                Upload Avatar
              </span>
              <input type="file" multiple class="hidden" />
            </label> */}
          </div>

          {openEditAvatar && (
            <EditAvatarModal
              open={openEditAvatar}
              setOpen={setOpenEditAvatar}
              title="Cập nhật ảnh đại diện"
              btnName="Cập nhật"
              type="infor"
            ></EditAvatarModal>
          )}

          <hr className=" mt-4" />
          {/*Infor */}
          <h3 class=" text-left text-lg font-bold">Thông tin cá nhân</h3>
          <div className="  block  lg:flex items-end justify-between">
            <div>
              <div className="flex items-center justify-start mt-2">
                <h3 class=" text-left text-base font-semibold">Tên:</h3>
                <p className="ml-2">{userInfo?.data?.user?.name}</p>
              </div>
              <div className="flex items-center justify-start mt-2">
                <h3 class=" text-left text-base font-semibold">Email:</h3>
                <p className="ml-2">{userInfo?.data?.user?.email}</p>
              </div>
              <div className="flex items-center justify-start mt-2">
                <h3 class=" text-left text-base font-semibold">
                  Số điện thoại:
                </h3>
                <p className="ml-2">{userInfo?.data?.user?.phone}</p>
              </div>
              <div className="flex items-center justify-start mt-2">
                <h3 class=" text-left text-base font-semibold">Giới tính:</h3>
                <p className="ml-2">
                  {userInfo?.data?.user?.gender === "male" ? "Nam" : "Nữ"}
                </p>
              </div>
            </div>

            <div class="flex justify-center space-x-2 mr-2 lg:w-[15%] w-[45%] mt-2 lg:mt-0 ">
              <button
                type="button"
                onClick={() => setOpenEditnfor(true)}
                class="flex w-full  items-center justify-center rounded-md border border-transparent 
                          bg-primary-600 p-2 text-base font-medium text-white hover:bg-primary-700 focus:outline-none 
                            focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                <BiEdit className="mr-2" />
                Sửa
              </button>
            </div>
          </div>

          <hr className=" mt-4" />
          {/* Address */}
          <div className="flex mt-2 justify-between">
            <h3 class=" text-left text-lg font-bold">Địa chỉ nhận hàng</h3>
            <div class="flex justify-center space-x-2 mr-4 md:w-30% lg:w-[13%] ">
              <button
                type="button"
                onClick={() => setOpenAddAddress(true)}
                class="flex w-full  items-center justify-center rounded-md border border-gray-200
                          bg-transparent p-2 text-base font-medium text-black hover:bg-gray-400 focus:outline-none 
                            focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                <GrAddCircle className="mr-2 text-gray-300" />
                Thêm
              </button>
            </div>
          </div>
          <div>
            {userInfo?.data?.user?.addresses?.map((address, index) => (
              <div className=" " key={index}>
                <div className="lg:flex items-center justify-between flex-wrap block  mt-2">
                  <p className="ml">{address?.address}</p>
                  <div className="flex lg:w-[30%] w-full mt-2 lg:mt-0">
                    <div class="flex justify-center space-x-2 mr-4 w-[45%] ">
                      <button
                        type="button"
                        onClick={() =>
                          handleEditAddress(address?.detailAddress)
                        }
                        class="flex w-full  items-center justify-center rounded-md border border-transparent 
                          bg-primary-600 p-2 text-base font-medium text-white hover:bg-primary-700 focus:outline-none 
                            focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                      >
                        <BiEdit className="mr-2" />
                        Sửa
                      </button>
                    </div>
                    <div class="flex justify-center space-x-2 w-[45%] ">
                      <button
                        type="button"
                        onClick={() =>
                          handleDeleteAddress(address?.detailAddress)
                        }
                        className={
                          address?.idDefault
                            ? "flex w-full  items-center justify-center rounded-md border border-solid  bg-transparent p-2 text-base font-medium text-gray-300 cursor-default  "
                            : "flex w-full  items-center justify-center rounded-md border border-solid border-red-500 bg-transparent p-2 text-base font-medium text-red-500  disabled hover:bg-gray-200"
                        }
                      >
                        <MdDeleteForever
                          className={address?.idDefault ? "mr-2 " : "mr-2"}
                        />
                        Xóa
                      </button>
                    </div>
                  </div>
                </div>
                <hr className="mt-2" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {openEditInfor && (
        <EditInforModal open={openEditInfor} setOpen={setOpenEditnfor} />
      )}
      {openEditAddress && (
        <EditAddressModal
          open={openEditAddress}
          setOpen={setOpenEditAddress}
          addressDetailId={addressDetail}
        />
      )}
      {openAddAddress && (
        <AddAddressModal open={openAddAddress} setOpen={setOpenAddAddress} />
      )}

      {openDeleteAddress && (
        <DeleteAddressModal
          open={openDeleteAddress}
          setOpen={setOpenDeleteAddress}
          addressDetailId={addressDetail}
        />
      )}
    </>
  );
};

export default UserInfor;
