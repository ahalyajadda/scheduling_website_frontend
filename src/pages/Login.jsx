import React, { useContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getError } from '../utils.jsx';
import { Store } from '../Store.jsx';
import { useNavigate } from 'react-router-dom';
function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { state, dispatch } = useContext(Store);
  //login
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `https://scheduling-website-backend.onrender.com/users/login`,
        {
          username,
          password,
        }
      );
      toast.success('Login succesfully');
      dispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/home');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <>
      <section className="bg-gray-50  min-h-screen flex items-center justify-center">
        <div className="bg-slate-200  flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
          <div className="sm:w-1/2  sm:px-8 px-5 ">
            <h2 className="font-bold text-2xl">
              Welcome to Alapan Software Solutions Private Limited.
            </h2>
            <h2 className="font-bold text-2xl mb-4">Login</h2>
            <form onSubmit={submitHandler} className="flex flex-col gap-3">
              <span>Username</span>
              <input
                type="text"
                required
                placeholder="Enter your username"
                className="p-2  rounded-xl border outline-none"
                onChange={(e) => setUsername(e.target.value)}
              />
              <span>Password</span>
              <input
                type="password"
                required
                placeholder="Enter your password"
                className="p-2 rounded-xl border outline-none"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="rounded-xl cursor-pointer hover:scale-105 duration text-white py-2 bg-[#217ee9] ">
                Login In
              </button>
              <p className="text-center">Don't have an account..? </p>

              <a
                className="text-center text-[#217ee9] cursor-pointer"
                href="/register"
              >
                Create an account
              </a>
            </form>
          </div>
          <div className="sm:block hidden w-1/2 ">
            <img
              className="rounded-2xl"
              src="https://www.cdc.gov/pregnancy/zika/materials/images/sm-graphics-sharing-icon.jpg?_=97386"
              alt=""
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
