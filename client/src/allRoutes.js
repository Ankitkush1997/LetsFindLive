import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Components/home/Home';
import MainPage from './Components/result/MainPage';
import MainPageAdmin from './Components/admin/MainPageAdmin';
import Home2 from './Components/home/Home2';
import MainPage2 from './Components/result/MainPage2';
import MainPageAdmin2 from './Components/admin/MainPageAdmin2';
import PrivacyPolicy from './Components/PrivacyPolicy';
import HomeView from './Views/HomeView';
import SearchView from './Views/SearchView';

const AllRoutes = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<HomeView />} exact />
      <Route path='/privacy' element={<PrivacyPolicy/>}></Route>
      <Route path='/result/:url' element={<MainPage />} exact />
      <Route path='/admin/:url' element={<MainPageAdmin />} exact />
      <Route path='/home' element={<Home />} exact />
      <Route path='/result2/:url' element={<MainPage2 />} exact />
      <Route path='/admin2/:url' element={<MainPageAdmin2 />} exact />
      <Route path='/home2' element={<Home2 />} exact />
      <Route path='/search/:searchValue' element={<SearchView />} exact />
    </Routes>
    </>
  );
};

export default AllRoutes;
