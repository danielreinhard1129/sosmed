import logo from './logo.svg';
import './App.css';
import NavbarComp from './Components/Navbar';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './Pages/Login';
import RegisPage from './Pages/Register';
import NotFound from './Pages/NotFound';
import axios from 'axios';
import { API_URL } from './helper';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction, mwKeepLogin } from './actions/authAction';
import React from 'react';
import LandingPage from './Pages/Landing';
import OtherProfile from './Pages/OtherProfile';
import Verification from './Pages/Verification';
import Percobaan from './Pages/Percobaan';

function App() {
  // 1. Render 1
  const dispatch = useDispatch(); //jalanin action redux cth line 25
  const role = useSelector((state) => state.auth.role); // ngambil data dr storage, data di redux di store
  //auth dari index.js di folder reducers yaitu reducernya, role itu dr file authReducer

  // untuk loading button register dan login
  const [loading, setLoading] = React.useState(true);

  // 3. Render 3
  React.useEffect(() => {
    dispatch(mwKeepLogin()); //jalanin action mwKeepLogin
    // Untuk menonaktifkan loading setelah 3 detik
    setTimeout(() => {
      setLoading(false);
    }, 3000); //millisecond
  }, [])

  // 2. Render 2
  return <>
    <NavbarComp loading={loading} />
    <Routes>
      {
        role ?
          null
          :
          // jika sebelum login dia shownya register sama login
          <>
            <Route path='/regis' element={<RegisPage loading={loading} />} />
            <Route path='/' element={<LoginPage loading={loading} />} />
          </>
      }
      {/* kalo uda ada role dia baru bisa akses landing sama other profiles */}
      <Route path='/landing' element={<LandingPage loading={loading}/>} /> 
      <Route path='/other/:id' element={<OtherProfile loading={loading}/>} />
      <Route path='*' element={<NotFound loading={loading}/>} />
      <Route path='/verification/:token' element={<Verification loading={loading} />} />

      {/* buat nyoba */}
      <Route path='/percobaan' element={<Percobaan loading={loading} />} />

    </Routes>
  </>;
}

export default App;
