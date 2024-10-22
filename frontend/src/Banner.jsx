import { useState } from 'react'
import bigRatBanner from './assets/big_rat_banner.svg'
import menuIcon2 from './assets/menu_icon_white.svg'
import menuIcon from './assets/menu_icon_gray.svg'
import cartIcon from './assets/cart_icon_gray.svg'
import cartIcon2 from './assets/cart_icon_white.svg'
import personIcon from './assets/person_icon_gray.svg'
import personIcon2 from './assets/person_icon_white.svg'
import './Banner.css'
import {Link} from 'react-router-dom';
import Login from './Login';

function Banner() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
      setIsOpen(!isOpen);
  };
  const closeDropdown = () => {
    setIsOpen(false);
};

  const [isHovered, setIsHovered] = useState(false);
  const toggleIsHovered = () => {
    setIsHovered(!isHovered);
  };
  const [isCartHovered, setIsCartHovered] = useState(false);
  const toggleIsCartHovered = () => {
    setIsCartHovered(!isCartHovered);
  };

  const [isPersonHovered, setIsPersonHovered] = useState(false);
  const toggleIsPersonHovered = () => {
    setIsPersonHovered(!isPersonHovered);
  };

  const [showLogin, setShowLogin] = useState(false);
  const toggleShowLogin = () => {
    setShowLogin(!showLogin);
  };

  return (
    <>
      <div className="banner">
        <a href="" target="_blank" rel="noopener noreferrer">
          <img src={bigRatBanner} className="logo"/>
        </a>
        <div className='title'>
          <h1><Link to="/" onClick={closeDropdown}>Big Rat's NY Pizza</Link></h1>
        </div>
        <div className='menuPane'>
            <div>
            <button id='menuButton' onClick={toggleDropdown} onMouseEnter={toggleIsHovered} onMouseLeave={toggleIsHovered}
                style={{backgroundColor: isOpen || isHovered ? 'rgb(72, 119, 164)' : 'black'}}>
                {isOpen || isHovered ? <img src={menuIcon2}/> : <img src={menuIcon}/>}
            </button>
            </div>
                <button id='accountButton' onClick={toggleShowLogin} onMouseEnter={toggleIsPersonHovered} onMouseLeave={toggleIsPersonHovered} 
                    style={{backgroundColor: isPersonHovered || showLogin ? 'rgb(72, 119, 164)' : 'black'}}>
                    {isPersonHovered || showLogin ? <img src={personIcon2}/> : <img src={personIcon}/>}
                    <t>Log In</t>
                </button>
            <Link to="/checkout">
                <button id='cartButton' onMouseEnter={toggleIsCartHovered} onMouseLeave={toggleIsCartHovered}>
                    {isCartHovered ? <img src={cartIcon2}/> : <img src={cartIcon}/>}
                </button>
            </Link>
          </div>
      </div>
      <div className="dropdown" style={{
        maxHeight: isOpen ? "500px" : "0",
        opacity: isOpen ? 1 : 0,
        transition: "max-height 0.3s ease, opacity 0.3s ease",
        overflow: "hidden"}}>
            <ul>
                <li><Link to="/" onClick={closeDropdown}>Home</Link></li>
                <li><Link to="/order" onClick={closeDropdown}>Order Now</Link></li>
                <li><Link to="/catering" onClick={closeDropdown}>Big Rat's Catering</Link></li>
                <li><Link to="/contact" onClick={closeDropdown}>Contact</Link></li>
            </ul>
      </div>
      {showLogin && <Login/>}
    </>
    );
}
export default Banner;