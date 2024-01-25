import React from "react";
import { Link } from 'react-router-dom';
function Header() {
  const logout =()=>{
    localStorage.clear()
    window.location.reload()
    }
  return (
    <>
    <header>
      <span>Keeper</span>
      {/* <Link to="/login" className="link">Log Out</Link> */}
      <button onClick={logout} className="link">Logout</button>
    </header>
    
</>
  );
 
}
export default Header;
