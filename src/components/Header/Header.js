import React from "react";
import './Header.scss'

class Header extends React.Component {
  render() {
    return (
      <div className='Header'>
        <p className='Header__logo'>PARKOVED</p>
        <a href="/add-object" className='Header__button' >Добавить объект</a>
      </div>
    )
  }
}

export default Header