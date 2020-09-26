import React from "react";
import './Header.scss'

class Header extends React.Component {
  render() {
    return (
      <div className='Header'>
        <p className='Header__logo'>PARKOVED</p>

        {window.location.pathname === '/park-objects' ? (
          <a href="/add-object" className='Header__button'>Добавить объект</a>
        ) : window.location.pathname === '/park-events' ? (
          <a href="/add-event" className='Header__button'>Добавить событие</a>
        ) : window.location.pathname === '/news' ? (
          <a href="/add-news" className='Header__button'>Добавить новость</a>
        ) : null}
      </div>
    )
  }
}

export default Header