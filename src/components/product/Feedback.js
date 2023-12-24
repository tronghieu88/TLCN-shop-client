import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Rating } from '@mui/material'
import { FaStar, FaCommentAlt } from 'react-icons/fa'
import { GrSend } from 'react-icons/gr'
import { AiOutlineClockCircle } from 'react-icons/ai'
import Loading from '../../screens/Loading'
import { toDate } from '../../utils/format'
import AddReviewModal from './sub/AddReviewModal'
import AddCommentModal from './sub/AddCommentModal'
import AddRepCommentModal from './sub/AddRepCommentModal'
import { toastWarn } from '../../utils/ultils'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'

const Feedback = (props) => {
  const { product, loading, reviews, comments } = props
  const { loading: loadingAddReview } = useSelector(
    (state) => state.productReviewCreate
  )
  const { loading: loadingAddComment } = useSelector(
    (state) => state.productCommentCreate
  )
  // handle add review and comment
  const [openReview, setOpenReview] = useState(false)
  const [openComment, setOpenComment] = useState(false)
  const [openRepComment, setOpenRepComment] = useState(false)
  const [commentId, setCommentId] = useState('')
  const { userInfo } = useSelector((state) => state.userLogin)
  const handleAddReview = () => {
    if (!userInfo) {
      toastWarn('Vui lòng đăng nhập để đánh giá sản phẩm!')
    } else {
      setOpenReview(true)
    }
  }
  const handleAddComment = () => {
    if (!userInfo) {
      toastWarn('Vui lòng đăng nhập để hỏi-đáp sản phẩm!')
    } else {
      setOpenComment(true)
    }
  }
  const handleRep = (comment) => {
    if (!userInfo) {
      toastWarn('Vui lòng đăng nhập để hỏi-đáp sản phẩm!')
    } else {
      setOpenRepComment(true)
      setCommentId(comment?._id)
    }
  }
  // console.log(reviews);
  // console.log(comments);

  const location = useLocation()
  const { slug } = location.state
  // useEffect(() => {

  // }, []);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className='py-6'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
            {/* Review */}
            <div className='rounded-lg shadow-lg lg:col-span-1 p-4'>
              <h2 className='text-lg tracking-tight text-gray-900 font-bold'>
                Đánh giá sản phẩm {product?.name}
              </h2>
              <div className='flex  items-center'>
                <div className='mr-2 text-amber-500 text-lg'>
                  {product?.rating}
                </div>
                <Rating value={product?.rating} readOnly />
                <span className='ml-2'>{product?.numReviews} đánh giá</span>
              </div>

              {/* Add review */}
              <div className='flex items-center justify-center mt-4'>
                <button
                  onClick={handleAddReview}
                  type=''
                  className='  flex w-[90%] lg:w-[70%]  items-center justify-center rounded-md border border-transparent bg-primary-600 py-3 px-8 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
                >
                  <FaStar className='mr-2' />
                  Đánh giá ngay
                </button>
              </div>
              <hr class='h-px my-8 bg-gray-200 border-0 dark:bg-gray-300'></hr>

              {/* List */}
              {loadingAddReview ? (
                <Loading />
              ) : (
                <div className='max-h-[300px] md:max-h-[500px] custom-scrollbars__content'>
                  {reviews.map((review, index) => (
                    <div>
                      <div
                        key={index}
                        className='rounded-lg border-2 border-slate-400 border-solid p-1 my-2'
                      >
                        <div className='flex items-center justify-between '>
                          <div className='flex items-center'>
                            <img
                              src={review?.avatarUrl}
                              class='w-10 rounded-full shadow-lg mr-2'
                              alt='Avatar'
                            />
                            {review?.name}
                          </div>
                          <div className='text-xs'>
                            {' '}
                            {toDate(review?.updatedAt)}
                          </div>
                        </div>
                        <div className='mt-2 pl-4 w-[90%] h-auto '>
                          <div className='flex items-center mb-2 '>
                            <b className='mr-2'>Đánh giá:</b>
                            <Rating value={review?.rating} readOnly />
                          </div>
                          <div className='flex items-center flex-wrap'>
                            <b className='mr-2'>Nhận xét: </b>
                            <p> {review?.comment}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/*Q&A  */}
            <div className='rounded-lg shadow-lg lg:col-span-1 p-4 '>
              <h2 className='text-lg tracking-tight text-gray-900 font-bold'>
                Hỏi đáp
              </h2>

              {/* Add comment */}
              <div className='flex items-center justify-center mt-4'>
                <button
                  onClick={handleAddComment}
                  type=''
                  className='  flex w-[90%] lg:w-[70%]  items-center justify-center rounded-md border border-transparent bg-primary-600 py-3 px-8 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
                >
                  <FaCommentAlt className='mr-2' />
                  Bình luận ngay
                </button>
              </div>
              <hr class='h-px my-8 bg-gray-200 border-0 dark:bg-gray-300'></hr>

              {/* <button
                type=""
                className=" mt-4 flex w-[20%] lg:w-[20%]  items-center justify-around rounded-md border border-transparent bg-primary-600 py-3 px-8 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                <GrSend size={5} />
                Thêm
              </button> */}
              {loadingAddReview ? (
                <Loading />
              ) : (
                <div className='max-h-[300px] md:max-h-[500px] custom-scrollbars__content '>
                  {comments.map((comment, index) => (
                    <div>
                      <div key={index} className=' p-1 my-2 '>
                        <div className='flex items-center justify-between '>
                          <div className='flex items-center'>
                            <img
                              src={comment?.avatarUrl}
                              class='w-10 rounded-full shadow-lg mr-2'
                              alt='Avatar'
                            />
                            {comment?.name}
                          </div>
                          <div className='text-xs flex items-center '>
                            {' '}
                            <AiOutlineClockCircle className='mr-2' />
                            {toDate(comment?.updatedAt)}
                          </div>
                        </div>
                        <div className='relative mt-1 ml-4 lg:ml-10 pb-8 pt-2 pl-2  h-auto bg-gray-200 rounded-lg'>
                          <p>
                            {' '}
                            {comment?.comment}
                            {/* Nhu cầu nhân sự ngày càng tăng - không sợ thất nghiệp! -
                        Có công việc ổn định, lộ trình thăng tiến rõ ràng. -
                        Được cập nhật những công nghệ mới và được tiếp xúc với
                        các lãnh đạo công ty khác nhau. - Học hỏi được nhiều
                        thứ, không sợ nhàm chán! */}
                          </p>
                          <div
                            className='absolute bottom-1 right-1 flex text-xs items-center cursor-pointers font-bold'
                            onClick={() => handleRep(comment)}
                          >
                            <GrSend
                              style={{ color: '#2563eb' }}
                              className='mr-1'
                            />
                            <button className=''>Trả lời</button>
                          </div>
                        </div>

                        {/* Replies */}
                        {comment?.replies.map((reply) => (
                          <div className='  mt-2 ml-4 lg:ml-10'>
                            <div className='flex items-center justify-between '>
                              <div className='flex items-center'>
                                <img
                                  src={reply?.avatarUrl}
                                  class='w-10 rounded-full shadow-lg mr-2'
                                  alt='Avatar'
                                />
                                {reply?.name}
                              </div>
                              <div className='text-xs'>
                                {' '}
                                {toDate(reply?.updatedAt)}
                              </div>
                            </div>
                            <div className='relative mt-1 ml-4 lg:ml-10 pb-8 pt-2 pl-2  h-auto bg-gray-200 rounded-lg'>
                              <p>
                                {' '}
                                {reply?.reply}
                                {/* Nhu cầu nhân sự ngày càng tăng - không sợ thất nghiệp! -
                        Có công việc ổn định, lộ trình thăng tiến rõ ràng. -
                        Được cập nhật những công nghệ mới và được tiếp xúc với
                        các lãnh đạo công ty khác nhau. - Học hỏi được nhiều
                        thứ, không sợ nhàm chán! */}
                              </p>
                              {/* <div
                                className='absolute bottom-1 right-1 flex text-xs items-center cursor-pointers font-bold'
                                onClick={() => setOpenComment(true)}
                              >
                                <GrSend
                                  style={{ color: '#2563eb' }}
                                  className='mr-1'
                                />
                                <button className=''>Trả lời</button>
                              </div> */}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <AddRepCommentModal
        comment={commentId}
        open={openRepComment}
        setOpen={setOpenRepComment}
      />
      <AddReviewModal
        product={product}
        open={openReview}
        setOpen={setOpenReview}
        slug={slug}
      />

      <AddCommentModal
        product={product}
        open={openComment}
        setOpen={setOpenComment}
        slug={slug}
      />
    </>
  )
}

export default Feedback
