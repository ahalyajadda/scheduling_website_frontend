import React, { useContext, useReducer, useState } from 'react';
import { PermMedia } from '@mui/icons-material';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Store } from '../Store';
import avatar from '../images/avatar.png';

import { getError } from '../utils';
import { useNavigate } from 'react-router-dom';

//reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case 'UPLOAD_REQUEST':
      return { ...state, loadingUpload: true, errorUpload: '' };
    case 'UPLOAD_SUCCESS':
      return {
        ...state,
        loadingUpload: false,
        errorUpload: '',
      };
    case 'UPLOAD_FAIL':
      return { ...state, loadingUpload: false, errorUpload: action.payload };

    default:
      return state;
  }
};

function Share() {
  const [{ loadingUpload }, dispatch] = useReducer(reducer, {
    loadingUpload: '',
    error: '',
  });

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [post, setPost] = useState('');
  const [date, setDate] = useState('');

  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();

  //creating  a post
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'https://scheduling-website-backend.onrender.com/posts',
        {
          title,
          content,
          post,
          date,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      setContent('');
      setTitle('');
      setPost('');
      setDate('');

      toast.success('Post succesfully uploaded');
      navigate('/home');
      window.location.reload(true);
    } catch (err) {
      toast.error(getError(err));
    }
  };

  //uploading post images or videos to cloudinary
  const uploadHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    try {
      dispatch({ type: 'UPLOAD_REQUEST' });

      const { data } = await axios.post(
        'https://scheduling-website-backend.onrender.com/upload',
        bodyFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch({ type: 'UPLOAD_SUCCESS' });

      await setPost(data.secure_url);
      toast.success('Image uploaded successfully.');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <>
      <div className="mt-5 mx-2 shadow shadow-blue-500/100 pt-5  rounded-xl">
        <div className="mr-5 ml-5 ">
          <h3 className="font-medium">Create a Post...</h3>
          <div className="">
            <div className="flex items-center sm:flex-row flex-col mt-2 ">
              <img
                className="rounded-full w-12 h-12 mr-10"
                src={avatar}
                alt=""
              />
              <div className="">
                <input
                  className="border-b-2 rounded-md pt-1  outline-none border-gray-400 mb-2"
                  placeholder={'Title'}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <br />
                <input
                  className="border-b-2 outline-none rounded-md pt-1  border-gray-400 mb-2"
                  placeholder={'Content'}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
                <br />
                <input
                  className="border-b-2 outline-none rounded-md pt-1  border-gray-400 mb-2"
                  placeholder={'Date yyyy-mm-dd'}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>
          </div>

          <hr className="" />
          <form
            className="flex items-center justify-between "
            onSubmit={submitHandler}
          >
            <div>
              {loadingUpload ? (
                <p>Loading...</p>
              ) : (
                <label htmlFor="file">
                  <PermMedia htmlColor="tomato" />
                  <span className="ml-3">Photo or Video</span>

                  <input
                    type="file"
                    style={{ display: 'none' }}
                    id="file"
                    onChange={uploadHandler}
                  />
                </label>
              )}
            </div>
            <button
              className=" px-4 py-2 mt-2 mb-2 rounded-xl text-white bg-[#217ee9] "
              type="submit"
            >
              Share
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Share;
