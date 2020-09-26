import React from "react";
import './CardList.scss';
import Card from "../Card/Card";

const CardList = ({title, cards}) => {
  return (
    <div className='CardList'>
      <h2 className='CardList__title'>{title}</h2>
      <div className='CardList__container'>
        {
          cards.map((card, i) => {
            return (<div className='CardList__card' key={i}>
              <Card img={card.img} title={card.title} />
            </div>)
          })
        }
      </div>
    </div>
  )
}

export default CardList