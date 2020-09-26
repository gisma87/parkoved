import React from "react"
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

class SideBar extends React.Component {

  render() {
    return (
      <div className='SideBar'>
        <div className='SideBar__containerLogo'>
          <SvgLogo1 style={{
            'width': '46px',
            'height': '46px'
          }}/>
          <div className='SideBar__parkName'>
            <h1 className='SideBar__title'>Парк С.М.Кирова</h1>
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
              <NavLink className='SideBar__item' to="/statistics" activeStyle={{color: '#109CF1'}}>
              <SvgStatistics color={(window.location.pathname === '/statistics') ? '#109CF1' : null}
                             style={{'width': '20px', 'height': '20px'}}/>

                <p className='over SideBar__description'>Статистика</p>
              </NavLink>
            </li>
            <li>
              <NavLink className='SideBar__item' to="/shares" activeStyle={{color: '#109CF1'}}>
              <SvgContacts color={(window.location.pathname === '/shares') ? '#109CF1' : null}
                           style={{'width': '20px', 'height': '20px'}}/>

                <p className='over SideBar__description'>Акции</p>
              </NavLink>
            </li>
            <li>
              <NavLink className='SideBar__item' to="/news" activeStyle={{color: '#109CF1'}}>
              <SvgChat color={(window.location.pathname === '/news') ? '#109CF1' : null}
                       style={{'width': '20px', 'height': '20px'}}/>

                <p className='over SideBar__description'>Новости</p>
              </NavLink>
            </li>
            <li>
              <NavLink className='SideBar__item' to="/subscribe" activeStyle={{color: '#109CF1'}}>
              <SvgDeals color={(window.location.pathname === '/subscribe') ? '#109CF1' : null}
                        style={{'width': '20px', 'height': '20px'}}/>
                <p className='over SideBar__description'>Рассылка</p>
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
}

export default SideBar