import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AllRoutes from './allRoutes';
import PrivacyPolicy from './Components/PrivacyPolicy';

const App = () => {
  return (
    <>
    {/* <PrivacyPolicy/> */}
      <BrowserRouter>
        <AllRoutes />
      </BrowserRouter>
    </>
  );
};
export default App;
