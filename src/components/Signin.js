

import React, { useEffect, useState } from "react";
import { auth, provider } from "./config";
import Home from './Home'
import Footer from "./Footer";
import { signInWithPopup } from "firebase/auth";


function Signin() {
  const [value, setValue] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((data) => {
        setValue(data.user.email);
        localStorage.setItem("email", data.user.email);
        setIsAuthenticated(true);
      });
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    setValue(storedEmail);
    if (storedEmail) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div className="form-background">
      {isAuthenticated ? <Home /> :
        <div className="form-background">
          <header>
            <h1>Keeper</h1>
          </header>
          <br></br>
          <center>
            <button onClick={handleSignIn} className="signin">
              <label>Signin With Google</label>
            </button>
            <Footer/>
          </center>
        </div>
      }
    </div>
  );
}

export default Signin;

