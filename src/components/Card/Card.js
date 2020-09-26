import React from "react"
import './Card.scss'

function Card({title, img, className}) {

  return (
    <div className='Card'>
      <img className='Card__img' src={img} alt={img}/>
      <div className='Card__contentContainer'>
        <p className='Card__subtitle'>{title}</p>
        <div className='Card__buttonContainer'>
          <div className={className}>
            {className === 'close' ? 'Не работает' : (className === 'open' ? 'Работает' : 'Ремонт')}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card