import React from "react";
import './ParkObjects.scss'
import Header from "../../components/Header/Header";
import SideBar from "../../components/SideBar/SideBar";
import CardList from "../../components/CardList/CardList";
import {fp1, fp2, fp3, fp4, fp5, img1, img2, img3, img4, fz1, fz2, fz3} from "../../images/images.js";

function ParkObjects() {
  const cards = [
    {img: img1, title: 'Автодром', status: 'open'},
    {img: img2, title: 'Везунчики', status: 'close'},
    {img: img3, title: 'Вертолёты', status: 'open'},
    {img: img4, title: 'Веселое путешествие', status: 'open'}
  ]
  const cardsFP = [
    {img: fp1, title: 'Coffe', status: 'open'},
    {img: fp2, title: 'Hot food', status: 'close'},
    {img: fp3, title: 'Бородатый бариста', status: 'open'},
    {img: fp4, title: 'Мороженое вода', status: 'open'},
    {img: fp5, title: 'Чайная', status: 'open'}
  ]
  const cardsFZ = [
    {img: fz1, title: 'Винни Пух', status: 'open'},
    {img: fz2, title: 'Волк ', status: 'repairs'},
    {img: fz3, title: 'Лавочки', status: 'open'},

  ]
  return (
    <div className='ParkObjects'>
      <Header/>
      <SideBar/>
      <div className='ParkObjects__main'>
        <CardList title='Аттракционы' cards={cards}/>
        <CardList title='Общепит' cards={cardsFP}/>
        <CardList title='Фотозоны' cards={cardsFZ }/>
      </div>
    </div>
  )

}

export default ParkObjects