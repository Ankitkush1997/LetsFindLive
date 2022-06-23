import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './Components/Home';
import MainPage from './Components/MainPage';
import MainPageAdmin from './Components/MainPageAdmin';
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
      <Route path='/search/:searchValue' element={<SearchView />} exact />
    </Routes>
    </>
  );
};

export default AllRoutes;
