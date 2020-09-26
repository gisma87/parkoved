import React from "react";
import './Header.scss'

class Header extends React.Component {
  render() {
    return (
      <div className='Header'>
        <p className='Header__logo'>PARKOVED</p>
        <button className='Header__button' >Добавить объект</button>
      </div>
    )
  }
}

export default Header