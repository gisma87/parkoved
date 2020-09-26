import React, {useState} from "react";
import './CardEventList.scss';
import CardEvent from "../CardEvent/CardEvent";

const CardEventList = ({title, cards}) => {
  return (
    <div className='CardEventList'>
      <h2 className='CardEventList__title'>{title}</h2>
      <div className='CardEventList__container'>
        {
          cards.map((card, i) => {
            return (
              <div className={`CardEventList__card`} key={i}>
                <CardEvent id={card._id} photo={card.photos ? card.photos[0] : null} title={card.title} />
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default CardEventList