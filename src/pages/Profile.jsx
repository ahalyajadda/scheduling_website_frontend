import React, { useContext, useEffect, useState } from 'react';
import Posts from '../components/Posts.jsx';
import Share from '../components/Share';
import { Store } from '../Store';
import avatar from '../images/avatar.png';
import Navbar from '../components/Navbar';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [myPosts, setMyposts] = useState([]);
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const [sort, setSort] = useState();
  const [scheduledPosts, setScheduledposts] = useState([]);

  //fetching sorted posts based on date ascending and descending order

  useEffect(() => {
    const FetchSortedPost = async () => {
      try {
        const myPosts =
          sort === 'oldest'
            ? await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/posts/getSortedPosts/oldest`
              )
            : await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/posts/myposts`,
                {
                  headers: { Authorization: `Bearer ${userInfo.token}` },
                }
              );
        await setMyposts(myPosts.data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    FetchSortedPost();
  }, [sort]);

  //setting sort options value
  const handleChange = async (e) => {
    await setSort(e.target.value);
  };

  //logging out
  const signoutHandler = () => {
    dispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
  };

  //deleting account
  const deleteHandler = async () => {
    console.log(userInfo);
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/users/deleteMyAccount/account/${userInfo._id}`,
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      dispatch({ type: 'USER_SIGNOUT' });
      localStorage.removeItem('userInfo');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  //fetching users posts
  useEffect(() => {
    const FetchMyPost = async () => {
      try {
        const myPosts = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/posts/myposts`,
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );

        await setMyposts(myPosts.data);
        const schedulePosts = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/posts/scheduledPosts`,
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );
        await setScheduledposts(schedulePosts.data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    FetchMyPost();
  }, [userInfo]);

  return (
    <>
      <Navbar />
      <div className="sm:w-2/3 w-full ml-auto mr-auto mt-5">
        <div className="">
          <div className="flex items-center justify-between shadow shadow-blue-500/80  p-5  rounded-xl">
            <img
              src={avatar}
              alt=""
              className="rounded-full sm:w-48 sm:h-48 w-36 h-36 sm: mr-5 object-contain cursor-pointer "
            />
            <div className="flex flex-col gap-2">
              <p className="text-xl font-bold">{userInfo.username}</p>
              <p>No of posts:{myPosts.length + scheduledPosts.length}</p>
              <div className=" flex items-center sm:flex-row flex-col">
                <button
                  onClick={deleteHandler}
                  className="cursor-pointer rounded-xl hover:scale-105 duration text-white sm:p-2 p-1 sm:mb-0 mb-2  bg-[#217ee9] mr-5"
                >
                  Delete Account
                </button>
                <button
                  className="cursor-pointer rounded-xl hover:scale-105 duration text-white p-2 bg-[#217ee9] "
                  onClick={signoutHandler}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
          <div className="sm:w-4/5 w-full ml-auto mr-auto cursor-pointer ">
            <Share />
          </div>
          <div className="sm:w-2/3 w-full  ml-auto mr-auto ">
            <div className="flex items-center  my-2">
              <h3 className="text-xl font-bold">Scheduled Posts</h3>
            </div>
            {scheduledPosts.length > 0 ? (
              scheduledPosts.map((p) => (
                <Posts key={p._id} post={p} page="profile" />
              ))
            ) : (
              <p className="text-base">No Posts</p>
            )}
          </div>
          <div className="sm:w-2/3 w-full  ml-auto mr-auto ">
            <div className="flex items-center justify-between my-2">
              <h3 className="text-xl font-bold">Posts</h3>
              <select
                value={sort}
                onChange={handleChange}
                className="outline-none p-5 cursor-pointer"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
            {myPosts.length > 0 ? (
              myPosts.map((p) => <Posts key={p._id} post={p} page="profile" />)
            ) : (
              <p className="text-base">No Posts</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
