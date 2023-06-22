import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { GoogleButton } from 'react-google-button';
import { UserAuth } from '../../context/AuthContext.jsx';
import { useNavigate, Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import logo from './logo.png';

const NavbarUI = () => {
  const { googleSignIn, user, logOut } = UserAuth();
  const navigate = useNavigate();

  const navigateToUpload = () => {
    navigate('/upload');
  }

  const navigateToDownload = () => {
    navigate('/download');
  }

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Navbar bg="secondary" expand="lg">
      <Container>
        <Nav.Item> <Navbar.Brand href="#home"><Image src={logo} rounded width="150" /></Navbar.Brand>  </Nav.Item>
        <Nav.Item>
          {user?.displayName ? (
            <>
              <h5>Welcome, {user?.displayName}</h5>
              <Button variant="primary" onClick={navigateToUpload}>Upload Files</Button>
              <Button variant="success" onClick={navigateToDownload}>Download Files</Button>
              <Button variant="danger" onClick={handleSignOut}>Logout</Button>
            </>
          ) : (
            <GoogleButton onClick={handleGoogleSignIn} />
          )}
        </Nav.Item>
      </Container>
    </Navbar>
  )
}
export default NavbarUI