import React, { useContext, useEffect, useState } from 'react';
import Posts from '../components/Posts.jsx';
import Share from '../components/Share';
import { Store } from '../Store';
import Navbar from '../components/Navbar';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import axios from 'axios';
function Home() {
  const [allPosts, setAllposts] = useState([]);
  const { state } = useContext(Store);
  const [sort, setSort] = useState();
  const { userInfo } = state;

  //fetching all posts
  useEffect(() => {
    const FetchAllPost = async () => {
      try {
        const myPosts = await axios.get(
          `https://scheduling-website-backend.onrender.com/posts/allposts`
        );
        await setAllposts(myPosts.data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    FetchAllPost();
  }, [userInfo]);

  //fetching sorted post based on ascending and descending order of posts
  useEffect(() => {
    const FetchSortedPost = async () => {
      try {
        const myPosts =
          sort === 'oldest'
            ? await axios.get(
                `https://scheduling-website-backend.onrender.com/posts/getSortedPosts/oldest`
              )
            : await axios.get(
                `https://scheduling-website-backend.onrender.com/posts/allposts`
              );
        await setAllposts(myPosts.data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    FetchSortedPost();
  }, [sort]);

  //setting the selected sort option
  const handleChange = async (e) => {
    await setSort(e.target.value);
  };

  return (
    <>
      <div className="w-full">
        <Navbar />
        <div className="">
          <div className="sm:w-3/5 w-full ml-auto mr-auto">
            <Share />
          </div>

          <div className="sm:w-1/2 w-full ml-auto mr-auto mt-5">
            <div className="flex items-center justify-between my-2 mx-4">
              <h3 className="text-xl font-bold">Posts</h3>
              <select
                value={sort}
                onChange={handleChange}
                className="outline-none p-5"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
            {allPosts.length > 0 &&
              allPosts.map((p) => <Posts key={p._id} post={p} page="home" />)}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
