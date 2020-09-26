import React from "react";
import './CardList.scss'

const CardList = ({title, cards}) => {
  return (
    <div className='CardList'>
      <h2 className='CardList__title'>{title}</h2>
      <div className='CardList__container'>
        {
          cards.map((card, i) => {
            return (<div className='CardList__card' key={i}>{card}</div>)
          })
        }
      </div>
    </div>
  )
}

export default CardList