import React from "react";
import './Desktop1.scss'
import Header from "../../components/Header/Header";
import SideBar from "../../components/SideBar/SideBar";
import CardList from "../../components/CardList/CardList";
import {fp1, fp2, fp3, fp4, fp5, img1, img2, img3, img4} from "../../images/images.js";

function Desktop1() {
  const cards = [
    {img: img1, title: 'Автодром'},
    {img: img2, title: 'Везунчики'},
    {img: img3, title: 'Вертолёты'},
    {img: img4, title: 'Веселое путешествие'}
  ]
  const cardsFP = [
    {img: fp1, title: 'Coffe'},
    {img: fp2, title: 'Hot food'},
    {img: fp3, title: 'Бородатый бариста'},
    {img: fp4, title: 'Мороженое вода'},
    {img: fp5, title: 'Чайная'}
  ]
  return (
    <div className='Desktop1'>
      <Header/>
      <SideBar/>
      <div className='Desktop1__main'>
        <CardList title='Аттракционы' cards={cards}/>
        <CardList title='Общепит' cards={cardsFP}/>
      </div>
    </div>
  )

}

export default Desktop1