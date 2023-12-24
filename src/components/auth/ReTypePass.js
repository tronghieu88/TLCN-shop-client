import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toastSuccess, toastWarn } from '../../utils/ultils'
import Loading from '../../screens/Loading'
import { resetPassword } from '../../actions/userActions'
import { USER_RESET_PASSWORD_RESET } from '../../constants/userConstants'
const ReTypePass = () => {
  const dispatch = useDispatch()
  const history = useNavigate()
  const queryParams = new URLSearchParams(window.location.search)
  const { loading, success } = useSelector((state) => state.userRegister)
  const token = queryParams.get('Token')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  useEffect(() => {
    if (success) {
      history('/login')
      dispatch({ type: USER_RESET_PASSWORD_RESET })
    }
  }, [success])
  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toastWarn(`Mật khẩu không khớp`)
    } else if (password.length < 6) {
      toastWarn(`Mật khẩu quá ngắn.`)
    } else {
      const dataForm = {
        password,
        confirmPassword,
        token,
      }
      dispatch(resetPassword(dataForm))
    }
  }
  return (
    <div class='container flex justify-center items-center mx-4 '>
      {loading && <Loading />}
      <div class='w-full sm:w-[80%] md:w-[70%] lg:w-[40%]  bg-white p-5 rounded-lg '>
        <div class='px-8  text-center'>
          <h class='pt-4 mb-2 text-2xl font-bold'>Lấy lại mật khẩu</h>
        </div>
        <form class='px-8 pt-6 pb-4  bg-white rounded' onSubmit={submitHandler}>
          <div class='mb-4'>
            <label
              class='block mb-2 text-sm font-bold text-gray-700'
              for='email'
            >
              Nhập mật khẩu mới
            </label>
            <input
              class='w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
              id='email'
              type='password'
              placeholder='Enter new password...'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div class='mb-4'>
            <label
              class='block mb-2 text-sm font-bold text-gray-700'
              for='pass'
            >
              Nhập lại mật khẩu mới
            </label>
            <input
              class='w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
              id='pass'
              type='password'
              placeholder='Enter again new password...'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div class=' text-center'>
            <button
              class='w-full px-4 py-2 font-bold text-white bg-primary-600 rounded-full hover:bg-primary-800 focus:outline-none focus:shadow-outline'
              type='submit'
            >
              Xác nhận
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ReTypePass
