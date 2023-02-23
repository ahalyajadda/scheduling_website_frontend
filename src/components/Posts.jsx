import React from 'react';
import { Edit, Delete } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import axios from 'axios';
import avatar from '../images/avatar.png';
import { Link, useNavigate } from 'react-router-dom';

function Posts(props) {
  const navigate = useNavigate();
  //deleting posts.
  const deleteHandler = async () => {
    try {
      await axios.delete(
        `https://scheduling-website-backend.onrender.com/posts/post/${props.post._id}`
      );
      toast.success('Deleted successfully');
      window.location.reload(true);
      navigate('/profile');
    } catch (err) {
      toast.error(getError(err));
    }
  };
  return (
    <>
      <div
        className="shadow shadow-blue-500/80  p-5  rounded-xl sm:mb-5 mb-2"
        key={props.key}
      >
        <div className="flex items-center justify-between  border-b-2">
          <div className="flex items-center">
            <img
              src={avatar}
              alt=""
              className="rounded-full w-12 h-12 mr-2 mb-2 cursor-pointer"
            />
            <p>{props.post.user_name}</p>
          </div>
          {props.page === 'profile' ? (
            <div className="flex items-center ">
              <Link to={`/editpost/${props.post._id}`}>
                <button className="p-2 cursor-pointer">
                  <Edit style={{}} />
                </button>
              </Link>

              <button onClick={deleteHandler} className="p-2 cursor-pointer">
                <Delete />
              </button>
            </div>
          ) : (
            ''
          )}
        </div>
        {props.post.post && (
          <div className="mx-auto ">
            <img src={props.post.post} alt="post-img" className="mx-auto " />
          </div>
        )}

        <div className="">
          <p className="text-lg font-bold" style={{ wordWrap: 'break-word' }}>
            {props.post.title}
          </p>
          <p className="" style={{ wordWrap: 'break-word' }}>
            {props.post.content}
          </p>
          <p className="text-xs">
            posted on <br />
            {props.post.Date}
          </p>
        </div>
      </div>
    </>
  );
}

export default Posts;
