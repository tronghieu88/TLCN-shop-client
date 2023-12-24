import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import Error from "../error/Error";
import { getProductByCategory } from "../../actions/productActions";
import Filter from "./Filter";
import Loading from "../../screens/Loading";
import { Link, useLocation, useParams } from "react-router-dom";

import {
  Dialog,
  Disclosure,
  Menu,
  Transition,
  Listbox,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
  CheckIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/20/solid";
import ProductCard from "./ProductCard";
import { MdOutlineArrowBack } from "react-icons/md";
import { BsCheckLg } from "react-icons/bs";
// import { Link } from "react-router-dom";
// import AddToCartModal from "./sub/AddToCartModal";
import { NextArrow, PrevArrow } from "../slider/customArrow";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ProductFilters } from "../../constants/FilterByCategories";
import {
  PRODUCT_LIST_BY_CATEGORY_REQUEST,
  PRODUCT_LIST_BY_CATEGORY_SUCCESS,
} from "../../constants/productsConstants";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProductList = () => {
  const sortOptions = [
    { name: "Ngẫu nhiên", value: "", current: true },
    { name: "Giá cao đến thấp", value: 1, current: false },
    { name: "Giá thấp đến cao", value: -1, current: false },
  ];
  // const subCategories = [
  //   { name: "IOS", href: "#" },
  //   { name: "Android", href: "#" },
  // ];
  const dispatch = useDispatch();
  const location = useLocation();
  const { CategoryName } = useParams();

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const {
    success,
    loading,
    error,
    productByCategories,
    filerProductByCategories,
    categoryName,
  } = useSelector((state) => state.productListByCategories);

  //Handle Filter
  const [filterList, SetFilterList] = useState({});
  const [listProduct, setListProduct] = useState([]);

  const [sort, setSort] = useState(sortOptions[0]);

  useEffect(() => {
    if (CategoryName !== categoryName) {
      dispatch(getProductByCategory(CategoryName));
      setSort(sortOptions[0]);
    }

    if (CategoryName) {
      if (CategoryName === "Điện thoại") {
        SetFilterList(ProductFilters[0]);
      } else if (CategoryName === "Tablet") {
        SetFilterList(ProductFilters[1]);
      } else if (CategoryName === "Laptop") {
        SetFilterList(ProductFilters[2]);
      } else {
        SetFilterList(ProductFilters[3]);
      }
    }
  }, [CategoryName, dispatch]);

  useEffect(() => {
    if (!loading && filerProductByCategories) {
      const x = [...filerProductByCategories];
      let tempListProduct;
      if (sort.value === 1) {
        tempListProduct = x.sort((a, b) => b.price - a.price);
      } else if (sort.value === -1) {
        tempListProduct = x.sort((a, b) => a.price - b.price);
      } else {
        tempListProduct = x.sort(() => Math.random() - 0.5);
      }
      setTimeout(dispatch({ type: PRODUCT_LIST_BY_CATEGORY_REQUEST }), 1000);
      dispatch({
        type: PRODUCT_LIST_BY_CATEGORY_SUCCESS,
        payload: {
          data: productByCategories,
          categoryName: categoryName,
          temp: tempListProduct,
        },
      });
    }
    console.log(sort);

    // console.log("List : ", tempListProduct);
  }, [sort, dispatch]);

  // console.log(tempListProduct);
  // const [filter]
  const [subCategories, setSubCategories] = useState();
  const [listFilter, setListFilter] = useState({});

  useEffect(() => {
    console.log(subCategories);
  }, [subCategories]);

  // console.log(filterList);

  const handleClickFilter = (e) => {
    setListFilter({ ...listFilter, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (Object.keys(listFilter).length > 0) {
      const x = [...productByCategories];
      let tempListProduct;
      for (const key in listFilter) {
        // console.log(`${key}: ${listFilter[key]}`);
        if (key === "manufacture") {
          // x.filter();
          tempListProduct =
            listFilter[key] === ""
              ? x
              : x.filter(
                  (product) => product.manufacturer.name === listFilter[key]
                );
        } else if (key === "color") {
          // tempListProduct = x.filter((product) =>
          //   product.productOptions.some((option) => {
          //     option.colors.some((color) => {
          //       return color.color === listFilter[key];
          //     });
          //   })
          // );
        } else {
          tempListProduct = x.filter((product) =>
            product.detailSpecs.map(
              (spec) => console.log(`${key} ${listFilter[key]}`)
              // (spec) => spec.name === key && spec.value === listFilter[key]
            )
          );
        }
      }
      setTimeout(dispatch({ type: PRODUCT_LIST_BY_CATEGORY_REQUEST }), 1000);
      dispatch({
        type: PRODUCT_LIST_BY_CATEGORY_SUCCESS,
        payload: {
          data: productByCategories,
          categoryName: categoryName,
          temp: tempListProduct,
        },
      });

      console.log(listFilter);
      console.log(tempListProduct);
      console.log(filerProductByCategories);
    }
  }, [listFilter]);

  //Slider
  const [settings, setSettings] = useState({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    nav: true,
    style: {
      margin: "0 -10px",
    },
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  });
  const [size, setSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleSize = () => {
      setSize(window.innerWidth);
    };
    window.addEventListener("resize", handleSize);
  }, []);
  useEffect(() => {
    if (size < 640) {
      setSettings({ ...settings, slidesToShow: 1 });
    } else {
      setSettings({ ...settings, slidesToShow: 2 });
    }
  }, [size]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="bg-white rounded-lg shadow-lg min-h-[300px]">
          {productByCategories?.length === 0 ? (
            //no product by categories
            <div className="flex items-center justify-center flex-col pt-24 ">
              <p className="heading-2">
                Danh mục sản phẩm hiện đang dừng kinh doanh
              </p>
              <Link
                to="/"
                className="bg-primary-600 hover:bg-primary-400 rounded-md p-2 text-white flex items-center mt-2  "
              >
                {" "}
                <MdOutlineArrowBack className="w-4 h-4 mr-1" />
                Về trang chủ
              </Link>
            </div>
          ) : (
            //have list product
            <div>
              {/* Mobile filter dialog */}
              <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                <Dialog
                  as="div"
                  className="relative z-40 lg:hidden"
                  onClose={setMobileFiltersOpen}
                >
                  <Transition.Child
                    as={Fragment}
                    enter="transition-opacity ease-linear duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                  </Transition.Child>

                  <div className="fixed inset-0 z-40 flex">
                    <Transition.Child
                      as={Fragment}
                      enter="transition ease-in-out duration-300 transform"
                      enterFrom="translate-x-full"
                      enterTo="translate-x-0"
                      leave="transition ease-in-out duration-300 transform"
                      leaveFrom="translate-x-0"
                      leaveTo="translate-x-full"
                    >
                      <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                        <div className="flex items-center justify-between px-4">
                          <h2 className="text-lg font-medium text-gray-900">
                            Filters
                          </h2>
                          <button
                            type="button"
                            className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                            onClick={() => setMobileFiltersOpen(false)}
                          >
                            <span className="sr-only">Thoát</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>

                        {/* Filters */}
                        <form className="mt-4 border-t border-gray-200">
                          <h3 className="sr-only">Categories</h3>
                          {/* <ul
                            role="list"
                            className="px-2 py-3 font-medium text-gray-900"
                          >
                            {filterList?.subCategories?.map((category) => (
                              <li key={category.name}>
                                <span
                                  // href={category.href}
                                  className="block px-2 py-3 cursor-pointer"
                                >
                                  {category.name}
                                </span>
                              </li>
                            ))}
                          </ul> */}

                          {filterList?.filters?.map((section) => (
                            <Disclosure
                              as="div"
                              key={section.id}
                              className="border-t border-gray-200 px-4 py-6"
                            >
                              {({ open }) => (
                                <>
                                  <h3 className="-mx-2 -my-3 flow-root">
                                    <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                      <span className="font-medium text-gray-900">
                                        {section.name}
                                      </span>
                                      <span className="ml-6 flex items-center">
                                        {open ? (
                                          <MinusIcon
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                          />
                                        ) : (
                                          <PlusIcon
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                          />
                                        )}
                                      </span>
                                    </Disclosure.Button>
                                  </h3>
                                  <Disclosure.Panel className="pt-6">
                                    <div className="space-y-6">
                                      {section.options.map(
                                        (option, optionIdx) => (
                                          <div
                                            key={option.value}
                                            className="flex items-center"
                                          >
                                            <input
                                              id={`filter-mobile-${section.id}-${optionIdx}`}
                                              name={`${section.id}[]`}
                                              defaultValue={option.value}
                                              type="radio"
                                              defaultChecked={option.checked}
                                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                              onChange={handleClickFilter}
                                            />
                                            <label
                                              htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                              className="ml-3 min-w-0 flex-1 text-gray-500"
                                            >
                                              {option.label}
                                            </label>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </Disclosure.Panel>
                                </>
                              )}
                            </Disclosure>
                          ))}
                        </form>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </Dialog>
              </Transition.Root>

              <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-baseline justify-between border-b border-gray-200 pt-8 pb-6">
                  <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                    {categoryName}
                  </h1>

                  <div className="flex items-center z-[2] ">
                    <div className="relative min-w-[160px]">
                      <form
                        action="
                      "
                      >
                        <Listbox
                          value={sort}
                          onChange={setSort}
                          className="border rounded-lg"
                        >
                          <div className="relative mt-1">
                            <Listbox.Button
                              className="relative w-full cursor-default rounded-lg bg-white 
                      py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 
                      focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 
                      focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                            >
                              <span className="block truncate">
                                {sort.name}
                              </span>
                              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronUpDownIcon
                                  className="h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                              </span>
                            </Listbox.Button>
                            <Transition
                              as={Fragment}
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <Listbox.Options
                                className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 
                      text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                              >
                                {sortOptions.map((option, i) => (
                                  <Listbox.Option
                                    key={i}
                                    className={({ active }) =>
                                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                        active
                                          ? "bg-amber-100 text-amber-900"
                                          : "text-gray-900"
                                      }`
                                    }
                                    value={option}
                                  >
                                    <>
                                      <span
                                        className={`block truncate ${
                                          sort.name === option.name
                                            ? "font-medium"
                                            : "font-normal"
                                        }`}
                                      >
                                        {option.name}
                                      </span>

                                      {sort.name === option.name ? (
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                          <CheckIcon
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                          />
                                        </span>
                                      ) : null}
                                    </>
                                  </Listbox.Option>
                                ))}
                              </Listbox.Options>
                            </Transition>
                          </div>
                        </Listbox>
                      </form>
                    </div>

                    <button
                      type="button"
                      className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                    >
                      <span className="sr-only">View grid</span>
                      <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                      onClick={() => setMobileFiltersOpen(true)}
                    >
                      <span className="sr-only">Filters</span>
                      <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                <section
                  aria-labelledby="products-heading"
                  className="pt-6 pb-24"
                >
                  <h2 id="products-heading" className="sr-only">
                    Products
                  </h2>

                  {/* Sliders */}
                  <center className="w-full flex justify-center items-center">
                    <div className="mt-4 mb-8 w-[90%] sm-w-[95%]">
                      <Slider {...settings}>
                        {filterList?.sliders?.map((slider, i) => (
                          <div className=" w-full h-40 px-2" key={i}>
                            <img
                              src={slider}
                              alt=""
                              className="max-h-40 w-full rounded-md"
                            />
                          </div>
                        ))}
                      </Slider>
                    </div>
                  </center>

                  <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                    {/* Filters */}
                    <form className="hidden lg:block">
                      <h3 className="sr-only">Categories</h3>
                      {/* <ul className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                        {filterList?.subCategories?.map((category) => (
                          <li key={category.name} name={category.name}>
                            <span className="cursor-pointer">
                              {category.name}
                            </span>
                          </li>
                        ))}
                      </ul> */}

                      {filterList?.filters?.map((section) => (
                        <Disclosure
                          as="div"
                          key={section.id}
                          className="border-b border-gray-200 py-6"
                        >
                          {({ open }) => (
                            <>
                              <h3 className="-my-3 flow-root">
                                <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                  <span className="font-medium text-gray-900">
                                    {section.name}
                                  </span>
                                  <span className="ml-6 flex items-center">
                                    {open ? (
                                      <MinusIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    ) : (
                                      <PlusIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    )}
                                  </span>
                                </Disclosure.Button>
                              </h3>
                              <Disclosure.Panel className="pt-6">
                                <div className="space-y-4">
                                  {section.options.map((option, optionIdx) => (
                                    <div
                                      key={option.value}
                                      className="flex items-center"
                                    >
                                      <input
                                        id={`filter-${section.id}-${optionIdx}`}
                                        name={`${section.id}`}
                                        defaultValue={option.value}
                                        type="radio"
                                        defaultChecked={option.checked}
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        onChange={handleClickFilter}
                                      />
                                      <label
                                        htmlFor={`filter-${section.id}-${optionIdx}`}
                                        className="ml-3 text-sm text-gray-600"
                                      >
                                        {option.label}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      ))}
                    </form>

                    {/* Product grid */}
                    {filerProductByCategories.length > 0 ? (
                      <div className="flow lg:col-span-3">
                        {/* Replace with your content */}
                        <div className="rounded-lg border-4 border-dashed border-gray-200 lg:h-full">
                          <div className="m-4 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-4 ">
                            {success &&
                              filerProductByCategories.map((product, i) => (
                                <ProductCard
                                  key={i}
                                  product={product}
                                  loading={loading}
                                ></ProductCard>
                              ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <h2 className="heading-2 col-span-3 mt-4">
                        Không có sản phẩm phù hợp với tiêu chí bạn mong muốn
                      </h2>
                    )}
                  </div>
                </section>
              </main>
            </div>
          )}

          {/* <AddToCartModal /> */}
        </div>
      )}

      {/* {error && <Error />} */}
    </>
  );
};

export default ProductList;
