import { React, Fragment, useState, useEffect, useRef } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import logo from "../assets/images/logo.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/userActions";
import { CART_UPDATE_RESET } from "../constants/cartConstants";
import { getCarts } from "../actions/cartActions";
import { getHistoryOrders } from "../actions/orderActions";
import Loading from "../screens/Loading";

import { getProvinceList } from "../actions/GHNActions";
import { Server } from "../apis/Api";
import { searchProducts } from "../actions/productActions";
import { toVND } from "../utils/format";
import { ProductFilters } from "../constants/FilterByCategories";
import { DefaultAvt } from "../constants/userConstants";
const user = {};

const navigation = [
  {
    name: "Điện thoại",
    href: "Điện thoại",
    current: false,
    filters: ProductFilters,
  },
  { name: "Tablet", href: "Tablet", current: false, filters: ProductFilters },
  { name: "Laptop", href: "Laptop", current: false, filters: ProductFilters },
  {
    name: "Phụ kiện",
    href: "Phụ kiện",
    current: false,
    filters: ProductFilters,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Header = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  // Handle Nav
  const [nav, setNav] = useState([
    {
      name: "Điện thoại",
      href: "Điện thoại",
      current: false,
      filters: ProductFilters,
    },
    { name: "Tablet", href: "Tablet", current: false, filters: ProductFilters },
    { name: "Laptop", href: "Laptop", current: false, filters: ProductFilters },
    {
      name: "Phụ kiện",
      href: "Phụ kiện",
      current: false,
      filters: ProductFilters,
    },
  ]);

  const handleCLickNav = (index) => {
    navigation.map((item) => (item.current = false));
    navigation[index].current = true;
    setNav([...navigation]);
  };

  const resetNav = () => {
    navigation.map((item) => (item.current = false));
    setNav([...navigation]);
  };
  const { categoryName } = useSelector(
    (state) => state.productListByCategories
  );
  const { CategoryName } = useParams();
  useEffect(() => {
    console.log(categoryName);
    if (categoryName) {
      if (categoryName === "Điện thoại") {
        // setNav([...nav, (nav[0].current = true)]);
        // console.log(nav[0]);
        handleCLickNav(0);
      } else if (categoryName === "Tablet") {
        // setNav([...nav, (nav[1].current = true)]);
        // console.log(nav[1]);
        handleCLickNav(1);
      } else if (categoryName === "Laptop") {
        // setNav([...nav, (nav[2].current = true)]);
        // console.log(nav[2]);
        handleCLickNav(2);
      } else {
        // setNav([...nav, (nav[3].current = true)]);
        // console.log(nav[3]);
        handleCLickNav(3);
      }
    }
    console.log(nav);
  }, [categoryName]);

  //Handle Cart

  //get cart
  const { cartItems, loading } = useSelector((state) => state.carts);
  //check cart update
  const { success } = useSelector((state) => state.cartUpdate);

  const [qt, setQuantity] = useState(0);
  useEffect(() => {
    dispatch(getCarts());
  }, []);
  useEffect(() => {
    // setQuantity(0);
    // cartItems?.forEach((element) => {
    //   setQuantity(quantity + element?.item?.quantity);
    // });

    if (userInfo && cartItems) {
      let { total, quantity, count } = cartItems?.reduce(
        (cartTotal, cartItem) => {
          // console.log(cartItem?.item);
          cartTotal.total += cartItem.item.price * cartItem.item.quantity;
          cartTotal.quantity += cartItem.item.quantity;
          cartTotal.count += 1;
          return {
            ...cartTotal,
          };
        },
        {
          total: 0,
          quantity: 0,
          count: 0,
        }
      );
      setQuantity({ total: total, quantity: quantity, count: count });
    }
    // console.log(qt);
  }, [success, cartItems]);

  //Check Authen

  const [userNavigation, setUserNavigation] = useState([]);

  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (success) {
      dispatch({ type: CART_UPDATE_RESET });
    }
    if (userInfo) {
      user.name = userInfo.data.user.name;
      user.email = userInfo.data.user.email;
      user.imageUrl = userInfo.data.user.avatar.url;
      setUserNavigation([
        { name: "Tài khoản của tôi", href: "/user-infor" },
        { name: "Đơn hàng của tôi", href: "/order-list" },
        { name: "Đăng xuất", href: "/" },
        { name: "Đổi mật khẩu", href: "/changepass" },
      ]);
    } else {
      user.name = "User Name";
      user.email = "xxx@example.com";
      user.imageUrl = DefaultAvt;

      setUserNavigation([
        { name: "Đăng nhập", href: "/login" },
        { name: "Đăng ký", href: "/register" },
      ]);
    }
  }, [dispatch, userInfo, history, success, cartItems]);

  const logoutHandler = () => {
    dispatch(logout());
  };

  //handle get Order
  const order = useSelector((state) => state.historyOrders);
  useEffect(() => {
    if (userInfo?.status === true) {
      dispatch(getHistoryOrders());
    }
    // dispatch(getHistoryOrders);
  }, [userInfo]);

  //handle district
  useEffect(() => {
    dispatch(getProvinceList());
  }, []);

  //handle search
  const [paramsSearch, setParamsSearch] = useState({
    page: 1,
    size: 10,
    keyword: "",
  });
  const [isSearch, setIsSearch] = useState(false);
  const listSearch = useSelector((state) => state.productSearch);
  const handleChangeKeyWord = (e) => {
    setParamsSearch({ ...paramsSearch, keyword: e.target.value });
    // console.log(paramsSearch);
  };

  const handleSearch = () => {
    dispatch(searchProducts(paramsSearch));
    setIsSearch(true);
  };

  const refOne = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
  }, []);

  const handleClickOutside = (e) => {
    if (!refOne.current.contains(e.target)) {
      setIsSearch(false);
      setParamsSearch({ ...paramsSearch, keyword: "" });
    }

    //  else {
    //   console.log("IN");
    // }
  };
  return (
    <>
      {loading && <Loading />}
      <div className="min-h-full sticky top-0 z-10">
        <Disclosure as="nav" className="bg-primary-800">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <Link className="flex-shrink-0" to="/" onClick={resetNav}>
                      <img className="h-8 w-8" src={logo} alt="Your Company" />
                    </Link>

                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {nav.map((item, index) => (
                          <Link
                            key={item.index}
                            to={`${item.href}`}
                            className={classNames(
                              item.current
                                ? "bg-primary-900 text-white"
                                : "text-primary-300 hover:bg-primary-700 hover:text-white",
                              "px-3 py-2 rounded-md text-sm font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                            // onClick={() => handleCLickNav(index)}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Search */}
                  <div class="flex justify-center " ref={refOne}>
                    <div class="relative w-[240px] sm:w-96">
                      <div class="relative  flex w-full flex-wrap items-stretch">
                        <input
                          onChange={handleChangeKeyWord}
                          type="search"
                          class="relative m-0 -mr-px block w-[1%] min-w-0 flex-auto rounded-l  
                          border border-solid border-neutral-300 bg-white bg-clip-padding 
                          px-3 py-1.5 text-base font-normal text-slate-500 outline-none transition 
                          duration-300 ease-in-out focus:border-primary focus:text-neutral-700 
                          focus:shadow-te-primary focus:outline-none dark:text-slate-600 dark:placeholder:text-neutral-200"
                          placeholder="Search"
                          aria-label="Search"
                          // value={paramsSearch.keyword}
                          aria-describedby="button-addon1"
                        />
                        <button
                          class="relative z-[2] flex items-center rounded-r bg-primary-500 px-6 py-2.5 
                          text-xs font-medium uppercase leading-tight text-white shadow-md transition 
                          duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 
                          focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
                          type="button"
                          id="button-addon1"
                          data-te-ripple-init
                          data-te-ripple-color="light"
                          onClick={handleSearch}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            class="h-5 w-5"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>

                      {/* Result Search */}
                      {isSearch && (
                        <div
                          className="  absolute top-[120%] right-[-15%] left-[-15%] max-h-80 w-[130%] 
                          md:w-full md:right-0 md:left-0 shadow bg-gray-100 
                                          rounded-lg p-2 overflow-y-auto "
                        >
                          <h4 className="text-lg font-semibold">
                            Kết quả tìm kiếm
                          </h4>
                          <hr className="pb-2" />
                          {/* list  */}
                          {listSearch?.loading ? (
                            <div>Loading...</div>
                          ) : listSearch?.products.length === 0 ? (
                            <div>
                              <h4 className="text-base font-semibold">
                                Không có sản phẩm phù hợp với từ khóa
                              </h4>
                            </div>
                          ) : (
                            <div className="flex flex-col ">
                              {listSearch?.products.map((product, i) => (
                                <Link
                                  key={i}
                                  to={
                                    "/product/" +
                                    product?.name?.replaceAll(" ", "-")
                                  }
                                  state={{ slug: product?._id }}
                                  className="grid grid-cols-1 sm:grid-cols-2 py-4 px-2 border bg-white rounded-lg my-1 items-center"
                                  onClick={() => setIsSearch(false)}
                                >
                                  <div className="col-span-1 mr-4 ">
                                    <img
                                      src={product?.image}
                                      alt=""
                                      className="max-w-[full] max-h-36 scale-img"
                                    />
                                  </div>
                                  <div className="col-span-1 flex flex-col justify-center ">
                                    <h2 className="font-semibold">
                                      {product?.name}
                                    </h2>
                                    <h2 className="font-medium">
                                      {toVND(product?.price)}{" "}
                                      <i className="font-thin">
                                        -{product?.productOptions[0]?.promotion}
                                        %
                                      </i>
                                    </h2>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6 relative">
                      <Link
                        to={"/cart"}
                        className="rounded-full bg-primary-900 p-1 text-primary-400 hover:text-white 
                        focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-800"
                        onClick={resetNav}
                      >
                        <span className="sr-only">View notifications</span>
                        <ShoppingCartIcon
                          className="h-6 w-6  "
                          aria-hidden="true"
                        />
                        <span className="absolute text-white text-xs font-bold top-[-5%] right-[60%]">
                          {userInfo?.status ? qt?.quantity : ""}
                        </span>

                        {/* <div
                          className="absolute h-20 right-[60%] z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 
                        shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none "
                        >
                          Hello anh em
                        </div> */}
                      </Link>

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button
                            className="flex max-w-xs items-center rounded-full bg-primary-800 
                          text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-800"
                          >
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full ring-2 ring-white"
                              src={user.imageUrl}
                              alt=""
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <Link
                                    to={item.href}
                                    onClick={
                                      item.name === "Đăng xuất"
                                        ? logoutHandler
                                        : null
                                    }
                                    className={classNames(
                                      active ? "bg-primary-100" : "",
                                      "block px-4 py-2 text-sm text-primary-700"
                                    )}
                                  >
                                    {item.name}
                                  </Link>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>

                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button
                      className="inline-flex items-center justify-center 
                    rounded-md bg-primary-800 p-2 text-primary-400 
                    hover:bg-primary-700 hover:text-white focus:outline-none focus:ring-2
                     focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-800"
                    >
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-primary-900 text-white"
                          : "text-primary-300 hover:bg-primary-700 hover:text-white",
                        "block px-3 py-2 rounded-md text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>

                <div className="border-t border-primary-700 pt-4 pb-3">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full ring-2 ring-white"
                        src={user.imageUrl}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        {user.name}
                      </div>
                      <div className="text-sm font-medium leading-none text-primary-400">
                        {user.email}
                      </div>
                    </div>

                    <Link
                      to="/cart"
                      className="relative ml-auto flex-shrink-0 rounded-full bg-primary-800 p-1 text-primary-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-800"
                    >
                      {/* <span className="sr-only">View notifications</span> */}
                      <ShoppingCartIcon
                        className="h-6 w-6 "
                        aria-hidden="true"
                      />
                      <span className="absolute text-white text-xs font-bold top-[-5%] right-[10%]">
                        {userInfo?.status ? qt?.quantity : ""}
                      </span>
                    </Link>
                  </div>

                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        onClick={
                          item.name === "Đăng xuất" ? logoutHandler : null
                        }
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-primary-400 hover:bg-primary-700 hover:text-white"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </>
  );
};

export default Header;
