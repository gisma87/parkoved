import React from "react"
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
      <div className='SideBar' > 
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
            <li className='SideBar__item'>
              <SvgMain style={{'width': '20px', 'height': '15px'}}/>
              <p className='SideBar__description'>Главная</p>
            </li>
            <li className='SideBar__item'>
              <SvgObjectPark style={{'width': '20px', 'height': '15px'}}/>
              <p className='SideBar__description'>Объекты парка</p>
            </li>
            <li className='SideBar__item'>
              <SvgStatistics style={{'width': '20px', 'height': '20px'}}/>
              <p className='SideBar__description'>Статистика</p>
            </li>
            <li className='SideBar__item'>
              <SvgContacts style={{'width': '20px', 'height': '20px'}}/>
              <p className='SideBar__description'>Акции</p>
            </li>
            <li className='SideBar__item'>
              <SvgChat style={{'width': '20px', 'height': '20px'}}/>
              <p className='SideBar__description'>Новости</p>
            </li>
            <li className='SideBar__item'>
              <SvgDeals style={{'width': '20px', 'height': '20px'}}/>
              <p className='SideBar__description'>Рассылка</p>
            </li>
          </ul>
        </nav>

        <div className='SideBar__settings SideBar__item'>
          <SvgSettings style={{'width': '13.3px', 'height': '20px'}}/>
          <p className='SideBar__description'>Настройки</p>
        </div>
      </div>
    )
  }
}

export default SideBar