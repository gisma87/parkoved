import React, { useEffect, useState } from "react"
import {NavLink, Route} from 'react-router-dom'
import './SideBar.scss'
import SvgLogo1 from "../Images/SvgLogo1";
import SvgMain from "../Images/SvgMain";
import SvgObjectPark from "../Images/SvgObjectPark";
import SvgStatistics from "../Images/SvgStatistics";
import SvgContacts from "../Images/SvgContacts";
import SvgChat from "../Images/SvgChat";
import SvgDeals from "../Images/SvgDeals";
import SvgSettings from "../Images/SvgSettings";

const apiParkGet = async () => {
  const TOKEN = window.localStorage.getItem('TOKEN');

  return await fetch(
    `http://localhost:3000/api/parks/${window.localStorage.getItem('PARK')}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })
}


const SideBar = () => {
  const [park, setPark] = useState();

  useEffect(() => {
    (async () => {
      const response = await apiParkGet();
      setPark(response.park);
    })()
  }, [])

  return (
    <div className='SideBar'>
      <div className='SideBar__containerLogo'>
        <SvgLogo1 style={{
          'width': '46px',
          'height': '46px'
        }}/>
        <div className='SideBar__parkName'>
          <h1 className='SideBar__title'>{!!park ? park.title : 'Loading...'}</h1>
          <p className='SideBar__mail'>parkkirova@gmail.com</p>
        </div>
      </div>

      <nav className='SideBar__nav'>
        <ul className='SideBar__items'>
          <li>
            <NavLink className='SideBar__item' exact to="/" activeStyle={{color: '#109CF1'}}>
            <SvgMain color={(window.location.pathname === '/') ? '#109CF1' : null}
                      style={{'width': '20px', 'height': '15px'}}/>

              <p className='over SideBar__description'>Главная</p>
            </NavLink>
          </li>

          <li>
            <NavLink className='SideBar__item' to="/park-objects" activeStyle={{color: '#109CF1'}}>
            <SvgObjectPark color={(window.location.pathname === '/park-objects') ? '#109CF1' : null}
                            style={{
                              'width': '20px',
                              'height': '15px'
                            }}
            />
              <p className='over SideBar__description'>Объекты парка</p>
            </NavLink>
          </li>

          <li>
            <NavLink className='SideBar__item' to="/park-events" activeStyle={{color: '#109CF1'}}>
            <SvgStatistics color={(window.location.pathname === '/park-events') ? '#109CF1' : null}
                            style={{'width': '20px', 'height': '20px'}}/>

              <p className='over SideBar__description'>События</p>
            </NavLink>
          </li>
          <li>
            <NavLink className='SideBar__item' to="/news" activeStyle={{color: '#109CF1'}}>
            <SvgChat color={(window.location.pathname === '/news') ? '#109CF1' : null}
                      style={{'width': '20px', 'height': '20px'}}/>

              <p className='over SideBar__description'>Новости</p>
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className='SideBar__settings SideBar__item'>
        <SvgSettings style={{'width': '13.3px', 'height': '20px'}}/>
        <p className='SideBar__description'>Настройки</p>
      </div>
    </div>
  );
}

export default SideBar