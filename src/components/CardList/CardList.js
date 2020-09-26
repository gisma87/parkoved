import React, {useState} from "react";
import './CardList.scss';
import Card from "../Card/Card";

const CardList = ({title, cards}) => {
  return (
    <div className='CardList'>
      <h2 className='CardList__title'>{title}</h2>
      <div className='CardList__container'>
        {
          cards.map((card, i) => {
            return (
              <div className={`CardList__card CardList__${card.status}`} key={i}>
                <Card id={card._id} photo={card.photos ? card.photos[0] : null} title={card.title} className={card.status} />
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default CardList