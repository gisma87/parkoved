import React, { useEffect, useState } from "react"
import {NavLink} from 'react-router-dom'
import './SideBar.scss'
import SvgLogo1 from "../Images/SvgLogo1";
import SvgObjectPark from "../Images/SvgObjectPark";
import SvgStatistics from "../Images/SvgStatistics";
import SvgChat from "../Images/SvgChat";
import SvgSettings from "../Images/SvgSettings";

const apiParkGet = async () => {
  const TOKEN = window.localStorage.getItem('TOKEN');

  return await fetch(
    `/api/parks/${window.localStorage.getItem('PARK')}`,
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

const apiParksGet = async () => {
  const TOKEN = window.localStorage.getItem('TOKEN');

  return await fetch(
    `/api/parks`,
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
  const [parks, setParks] = useState();

  useEffect(() => {
    (async () => {
      const response = await apiParkGet();
      setPark(response.park);
    })()
  }, [])

  useEffect(() => {
    (async () => {
      const response = await apiParksGet();
      setParks(response.parks);
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
          <h1 className='SideBar__title'>{!!park ? park.title : 'Загрузка...'}</h1>
          <p className='SideBar__mail'>{!!park && park.description}</p>
        </div>
      </div>

      <nav className='SideBar__nav'>
        <ul className='SideBar__items'>
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

      {!!parks ? <nav className='SideBar__nav'>
        <ul className='SideBar__items'>
          {parks.map(p => (
            <li>
              <NavLink className='SideBar__item' to={`/set-park/${p._id}`} activeStyle={{color: '#109CF1'}}>
              <SvgObjectPark style={{ 'width': '20px', 'height': '15px' }}
              />
                <p className='over SideBar__description'>{p.title}</p>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav> : 'Загрузка...'}

      <div className='SideBar__settings SideBar__item'>
        {park ? <NavLink className='SideBar__item' to={`/edit-park/${park._id}`} activeStyle={{color: '#109CF1'}}>
          <SvgSettings style={{'width': '13.3px', 'height': '20px'}}/>
          <p className='SideBar__description'>Редактировать парк</p>
        </NavLink> : 'Загрузка...'}
      </div>
    </div>
  );
}

export default SideBar