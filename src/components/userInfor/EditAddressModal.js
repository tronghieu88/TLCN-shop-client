import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { DefaultAvt } from "../../constants/userConstants";
import { Token_API_GHN } from "../../apis/Api";
import { getAddressDetail, updateAddress } from "../../actions/userActions";
import axios from "axios";
import Loading from "../../screens/Loading";
const EditAddressModal = (props) => {
  const { open, setOpen, addressDetailId } = props;
  console.log(addressDetailId);
  const dispatch = useDispatch();
  // const [selectedProv, setSelectedProv] = useState('')
  const [provList, setProvList] = useState([]);
  // const [selectedDistrict, setSelectedDistrict] = useState('')
  const [disList, setDisList] = useState([]);
  // const [selectedWard, setSelectedWard] = useState('')
  const [wardList, setWardList] = useState([]);

  const { loading, userInfo, addressDetail } = useSelector(
    (state) => state.userLogin
  );

  const [isDfault, setIsDFault] = useState(addressDetail?.idDefault);

  const [selectedProv, setSelectedProv] = useState(
    addressDetail?.detailAddress?.province
  );
  const [selectedDistrict, setSelectedDistrict] = useState(
    addressDetail?.detailAddress?.district
  );
  const [selectedWard, setSelectedWard] = useState(
    addressDetail?.detailAddress?.ward
  );
  const [detailAddress, setDetailAddress] = useState(addressDetail?.address);

  const [user, setUser] = useState({
    avatar: userInfo.data.user.avatar.url
      ? userInfo.data.user.avatar.url
      : DefaultAvt,
    name: `${userInfo?.data?.user?.name}`,
    email: `${userInfo?.data?.user?.email}`,
    phone: `${userInfo?.data?.user?.phone}`,
    gender: `${userInfo?.data?.user?.gender}`,
    addresses: userInfo?.data?.user?.addresses,
    isNew: false,
    addressID: "",
    editAddress: true,
  });
  const cancelButtonRef = useRef(null);
  const config = {
    headers: {
      "Content-Type": "application/json",
      Token: `${Token_API_GHN}`,
    },
  };

  useEffect(() => {
    dispatch(getAddressDetail(addressDetailId));
  }, [addressDetailId]);
  //Province
  useEffect(() => {
    const callProv = async () => {
      const { data } = await axios.get(
        `https://online-gateway.ghn.vn/shiip/public-api/master-data/province`,
        config
      );
      setProvList(await data.data);
    };
    callProv();
  }, []);

  // Recall District
  useEffect(() => {
    if (selectedProv !== addressDetail?.detailAddress?.province) {
      const callDis = async () => {
        const { data } = await axios.get(
          `https://online-gateway.ghn.vn/shiip/public-api/master-data/district`,
          {
            headers: {
              "Content-Type": "application/json",
              Token: `${Token_API_GHN}`,
            },
            params: {
              province_id: selectedProv?.ProvinceID || selectedProv?.provinceID,
            },
          }
        );
        setDisList(await data.data);
        setSelectedDistrict(await data.data[0]);
      };
      callDis();
    } else {
      const callDis = async () => {
        const { data } = await axios.get(
          `https://online-gateway.ghn.vn/shiip/public-api/master-data/district`,
          {
            headers: {
              "Content-Type": "application/json",
              Token: `${Token_API_GHN}`,
            },
            params: {
              province_id: selectedProv?.ProvinceID || selectedProv?.provinceID,
            },
          }
        );
        setDisList(await data.data);
      };
      callDis();
    }
  }, [selectedProv]);

  //Recall Ward
  useEffect(() => {
    if (selectedDistrict !== addressDetail?.detailAddress?.district) {
      const callWard = async () => {
        const { data } = await axios.get(
          `https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${
            selectedDistrict?.DistrictID || selectedDistrict?.districtID
          }`,
          config
        );
        setWardList(await data.data);
        setSelectedWard(await data.data[0]);
      };
      callWard();
    } else {
      const callWard = async () => {
        const { data } = await axios.get(
          `https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${
            selectedDistrict?.DistrictID || selectedDistrict?.districtID
          }`,
          config
        );
        setWardList(await data.data);
      };
      callWard();
    }
  }, [selectedDistrict]);

  const handleEditAddress = () => {
    const dataForm = {
      detail:
        detailAddress +
        ", " +
        selectedWard?.WardName +
        ", " +
        selectedDistrict?.DistrictName +
        ", " +
        selectedProv?.ProvinceName,
      addressDefault: isDfault,
      addressDetail: {
        province: {
          provinceID: selectedProv?.ProvinceID,
          provinceName: selectedProv?.ProvinceName,
        },
        ward: {
          wardCode: selectedWard?.WardCode,
          wardName: selectedWard?.WardName,
        },
        district: {
          districtID: selectedDistrict?.DistrictID,
          districtName: selectedDistrict?.DistrictName,
        },
      },
    };
    const addressID = addressDetailId;
    setOpen(false);
    dispatch(updateAddress(dataForm, addressID));
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Transition.Root show={open} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            initialFocus={cancelButtonRef}
            onClose={setOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel
                    className="relative transform overflow-hidden rounded-lg 
              bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
                  >
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        {/* <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationTriangleIcon
                        className="h-6 w-6 text-red-600"
                        aria-hidden="true"
                      />
                    </div> */}
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                          <Dialog.Title
                            as="h3"
                            className=" flex items-center text-lg font-medium leading-6 text-gray-900 mb-1"
                          >
                            <BiEdit className="text-primary-500 mr-2" />
                            Cập nhật địa chỉ nhận hàng
                          </Dialog.Title>

                          {/* Input */}
                          <div className="w-full flex flex-wrap justify-between">
                            <div class="w-full lg:w-[80%]  py-4 flex justify-center">
                              <div class=" w-full">
                                <select
                                  class="form-select appearance-none block w-full p-2 text-base
                              font-normal
                              text-gray-700
                              bg-white bg-clip-padding bg-no-repeat
                              border border-solid border-gray-300
                              rounded-md
                              transition
                              ease-in-out
                              m-0
                              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                  aria-label="Default select example"
                                  onChange={(e) =>
                                    setSelectedProv(JSON.parse(e.target.value))
                                  }
                                >
                                  <option value="">--Tỉnh--</option>
                                  {provList?.map((prov) => (
                                    <option
                                      key={prov?.ProvinceID}
                                      value={JSON.stringify(prov)}
                                      selected={
                                        prov?.ProvinceID ===
                                          selectedProv?.ProvinceID ||
                                        prov?.ProvinceID ===
                                          selectedProv?.provinceID
                                      }
                                    >
                                      {prov?.ProvinceName}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            <div class="w-full lg:w-[80%]  py-4 flex justify-center">
                              <div class=" w-full">
                                <select
                                  class="form-select appearance-none block w-full p-2 text-base
                              font-normal
                              text-gray-700
                              bg-white bg-clip-padding bg-no-repeat
                              border border-solid border-gray-300
                              rounded-md
                              transition
                              ease-in-out
                              m-0
                              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                  aria-label="Default select example"
                                  onChange={(e) =>
                                    setSelectedDistrict(
                                      JSON.parse(e.target.value)
                                    )
                                  }
                                >
                                  <option value="">--Huyện--</option>
                                  {disList?.map((dis) => (
                                    <option
                                      key={dis?.DistrictID}
                                      value={JSON.stringify(dis)}
                                      selected={
                                        dis?.DistrictID ===
                                          selectedDistrict?.DistrictID ||
                                        dis?.DistrictID ===
                                          selectedDistrict?.districtID
                                      }
                                    >
                                      {dis?.DistrictName}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            <div class="w-full lg:w-[80%]  py-4 flex justify-center">
                              <div class=" w-full">
                                <select
                                  class="form-select appearance-none block w-full p-2 text-base
                              font-normal
                              text-gray-700
                              bg-white bg-clip-padding bg-no-repeat
                              border border-solid border-gray-300
                              rounded-md
                              transition
                              ease-in-out
                              m-0
                              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                  aria-label="Default select example"
                                  onChange={(e) =>
                                    setSelectedWard(JSON.parse(e.target.value))
                                  }
                                >
                                  <option value="">--Xã--</option>
                                  {wardList?.map((w) => (
                                    <option
                                      key={w?.WardCode}
                                      value={JSON.stringify(w)}
                                      selected={
                                        parseInt(w?.WardCode) ===
                                          parseInt(selectedWard?.WardCode) ||
                                        parseInt(w?.WardCode) ===
                                          parseInt(selectedWard?.wardCode)
                                      }
                                    >
                                      {w?.WardName}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            <div class="w-full lg:w-[80%] py-4 flex justify-center">
                              <input
                                required
                                type="address"
                                name=""
                                id=""
                                value={detailAddress}
                                onChange={(e) =>
                                  setDetailAddress(e.target.value)
                                }
                                placeholder="Địa chỉ đang cư trú"
                                class="w-full  p-2 m-auto  text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                              />
                            </div>
                            <div class=" flex  justify-center">
                              <input
                                checked={isDfault}
                                onClick={() => setIsDFault(!isDfault)}
                                required
                                type="checkbox"
                                id="default"
                                class="mr-2"
                              />
                              <label
                                class="inline-block pl-[0.15rem] hover:cursor-pointer"
                                for="default"
                                className="text-gray-900 font-semibold"
                              >
                                Địa chỉ mặc định
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-300 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md border border-transparent
                     bg-primary-600 px-4 py-2 text-base font-medium text-white shadow-sm
                      hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-red-500 
                      focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                        //   onClick={() => handleAddToCart()}
                        onClick={() => handleEditAddress()}
                      >
                        Cập nhật
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md border 
                    border-gray-300 bg-white px-4 py-2 text-base font-medium 
                    text-gray-700 shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 
                    focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        ref={cancelButtonRef}
                        onClick={() => setOpen(false)}
                      >
                        Trở về
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      )}
    </>
  );
};

export default EditAddressModal;
