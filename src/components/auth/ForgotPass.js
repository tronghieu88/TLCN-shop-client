import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { forgotPassword } from "../../actions/userActions";

const ForgotPass = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };
  return (
    // <><!-- Container -->
    <div class="container mx-auto ">
      <div class="flex justify-center px-6 my-4 ">
        {/* <!-- Row --> */}
        <div class="w-full xl:w-3/4 lg:w-11/12 flex rounded-sm border-2 border-slate-400">
          {/* <!-- Col --> */}
          <div
            class="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-sm"
            style={{
              backgroundImage: `url(https://hoanghamobile.com/tin-tuc/wp-content/webp-express/webp-images/uploads/2023/08/cuc-dep-hinh-nen-thien-nhien.jpg.webp)`,
            }}
          ></div>
          {/* <!-- Col --> */}
          <div class="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
            <div class="px-8 mb-4 text-center">
              <h3 class="pt-4 mb-2 text-2xl font-semibold">Quên mật khẩu</h3>
            </div>
            <form
              class="px-8 pt-6 pb-8 mb-4 bg-white rounded"
              onSubmit={submitHandler}
            >
              <div class="mb-4">
                <label
                  class="block mb-2 text-sm font-bold text-gray-700"
                  for="email"
                >
                  Email
                </label>
                <input
                  class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Enter Email Address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {/* <div class="mb-6 text-center">
                <button
                  class="w-full px-4 py-2 font-bold text-white bg-primary-600 rounded-full hover:bg-primary-800 focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Nhận mã
                </button>
              </div>
              <div class="mb-4">
                <label
                  class="block mb-2 text-sm font-bold text-gray-700"
                  for="email"
                >
                  Mã xác thực
                </label>
                <input
                  class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Enter Email Address..."
                />
              </div> */}
              <div class="mb-6 text-center">
                <button
                  class="w-full px-4 py-2 font-bold text-white bg-primary-600 rounded-full hover:bg-primary-800 focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Quên mật khẩu.
                </button>
              </div>
              <hr class="mb-6 border-t" />
              <div class="text-center">
                <Link
                  class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800 font-semibold"
                  to="/register"
                >
                  Đăng ký
                </Link>
              </div>
              <div class="text-center">
                <Link
                  class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800 font-semibold"
                  to="/login"
                >
                  Đã có tài khoản? Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPass;
