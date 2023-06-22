import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavbarUI from './components/Navbar/Navbar';
import Protected from './components/Protected.jsx';
import { AuthContextProvider } from './context/AuthContext.jsx';
import Home from './pages/Home';
import Download from './pages/Download';
import Upload from './pages/Upload';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <AuthContextProvider>
        <NavbarUI />
        <div className='d-flex justify-content-center'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/download' element={<Protected><Download /></Protected>} />
            <Route path='/upload' element={<Protected><Upload /></Protected>} />
          </Routes>
        </div>
      </AuthContextProvider>
    </>
  );
}

export default App;
