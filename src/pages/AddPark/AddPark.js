import React from "react";
import './ParkObjects.scss'
import Header from "../../components/Header/Header";
import SideBar from "../../components/SideBar/SideBar";
import CardList from "../../components/CardList/CardList";
import {fp1, fp2, fp3, fp4, fp5, img1, img2, img3, img4} from "../../images/images.js";

function AddPark() {
 
  return (
    <div className='AddPark'>
      <Header/>
      <SideBar/>
      <div className='AddPark__main'>
        <CardList title='Аттракционы' cards={cards}/>
        <CardList title='Общепит' cards={cardsFP}/>
      </div>
    </div>
  )

}

export default AddPark