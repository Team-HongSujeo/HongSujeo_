import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import LandingPage from './views/LandingPage/LandingPage'
import LoginPage from './views/LoginPage/LoginPage'
import RegisterPage from './views/RegisterPage/RegisterPage'
import Auth from '../hoc/auth';
import NavBar from "./views/NavBar/NavBar";
import UploadProductPage from "./views/UploadProductPage/UploadProductPage.js";
import DetailProductPage from "./views/DetailProductPage/DetailProductPage";

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    
    <Router>
      <Suspense fallback={(<div>Loading...</div>)}>
        <NavBar />
        <div style={{ paddingTop: '69px' }}></div>
        <div>

          <Routes>
            <Route  path="/" element={Auth(LandingPage, null )  } />
            <Route  path="/login" element={Auth(LoginPage, false) } />
            <Route  path="/register" element={Auth(RegisterPage, false)} />
            <Route  path="/product/upload" element={Auth(UploadProductPage, true)} />
            <Route  path="/product/:productId" element={Auth(DetailProductPage, null)} />
          </Routes>
        </div>
      </Suspense>
    </Router> 
  );
}

export default App;