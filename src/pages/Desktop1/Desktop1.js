import React from "react";
import './Desktop1.scss'
import Header from "../../components/Header/Header";
import SideBar from "../../components/SideBar/SideBar";
import CardList from "../../components/CardList/CardList";

class Desktop1 extends React.Component {
  render() {
    return (
      <div className='Desktop1'>
        <Header/>
        <SideBar/>
        <div className='Desktop1__main'>
          <CardList title='Аттракционы' />
        </div>
      </div>
    )
  }
}

export default Desktop1