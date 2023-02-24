import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Store } from '../Store';
import { getError } from '../utils';

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmpassword] = useState('');
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  //creating an account
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(password, confirmPassword);
    if (password !== confirmPassword) {
      toast.error('Password not match');
      return;
    }
    try {
      const { data } = await axios.post(
        `https://scheduling-website-backend.onrender.com/users/register`,
        {
          username,
          password,
        }
      );
      toast.success('Registered succesfully');
      dispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/home');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <>
      <section className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="bg-slate-200 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
          <div className="md:w-1/2 sm:px-8 px-5 md:px-16">
            <h2 className="font-bold text-2xl">
              Welcome to Alapan Software Solutions Private Limited.
            </h2>
            <h2 className="font-bold text-2xl mb-4">Register</h2>
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
              <span>Confirm-Password</span>
              <input
                type="password"
                required
                placeholder="Enter your password"
                className="p-2 rounded-xl border outline-none"
                onChange={(e) => setConfirmpassword(e.target.value)}
              />

              <button className="rounded-xl cursor-pointer hover:scale-105 duration text-white py-2 bg-[#217ee9] ">
                Register
              </button>
              <p className="text-center"> Already have an account..? </p>

              <a className="text-center text-[#217ee9] cursor-pointer" href="/">
                Login
              </a>
            </form>
          </div>
          <div className="md:block hidden w-1/2 ">
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

export default Register;
