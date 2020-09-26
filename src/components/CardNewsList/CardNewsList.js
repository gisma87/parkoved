import React from "react";
import './CardNewsList.scss';
import CardNews from "../CardNews/CardNews";

const CardNewsList = ({title, cards}) => {
  return (
    <div className='CardNewsList'>
      <h2 className='CardNewsList__title'>{title}</h2>
      <div className='CardNewsList__container'>
        {
          cards.map((card, i) => {
            return (
              <div className={`CardNewsList__card`} key={i}>
                <CardNews id={card._id} photo={card.photos ? card.photos[0] : null} title={card.title} />
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default CardNewsList