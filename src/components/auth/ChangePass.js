import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { changePass } from '../../actions/userActions'
const ChangePass = () => {
  const dispatch = useDispatch()
  const history = useNavigate()

  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const submitHandler = (e) => {
    e.preventDefault()
    const dataForm = {
      oldPassword,
      newPassword,
      confirmNewPassword,
    }
    dispatch(changePass(dataForm))
    history('/user-infor')
  }

  return (
    <div class='container flex justify-center items-center mx-4 '>
      <div class='w-full sm:w-[80%] md:w-[70%] lg:w-[40%]  bg-white p-5 rounded-lg '>
        <div class='px-8  text-center'>
          <h class='pt-4 mb-2 text-2xl font-bold'>Đổi mật khẩu</h>
        </div>
        <form class='px-8 pt-6 pb-4  bg-white rounded' onSubmit={submitHandler}>
          <div class='mb-4'>
            <label
              class='block mb-2 text-sm font-bold text-gray-700'
              for='email'
            >
              Nhập mật khẩu cũ
            </label>
            <input
              class='w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
              id='email'
              type='password'
              placeholder='Enter old password...'
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
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
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
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
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
          </div>

          <div class=' text-center'>
            <button
              class='w-full px-4 py-2 font-bold text-white bg-primary-600 rounded-full hover:bg-primary-800 focus:outline-none focus:shadow-outline'
              type='submit'
            >
              Đổi mật khẩu
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChangePass
