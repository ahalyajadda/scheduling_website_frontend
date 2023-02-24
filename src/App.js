import './App.css';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Profile from './pages/Profile';
import { useContext } from 'react';
import { Store } from './Store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditPage from './pages/EditPage';

function App() {
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  return (
    <>
      <ToastContainer position="bottom-center" limit={1} />
      <HashRouter>
        <Routes>
          <Route
            path="/"
            element={userInfo ? <Navigate to="/home" /> : <Login />}
          />
          <Route
            path="/register"
            element={userInfo ? <Navigate to="/home" /> : <Register />}
          />
          <Route
            path="/home"
            element={userInfo ? <Home /> : <Navigate to="/" />}
          />
          <Route
            path="/profile"
            element={userInfo ? <Profile /> : <Navigate to="/" />}
          />
          <Route
            path="/editpost/:id"
            element={userInfo ? <EditPage /> : <Navigate to="/" />}
          />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
