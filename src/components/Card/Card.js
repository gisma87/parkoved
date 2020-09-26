import React from "react"
import './Card.scss'

function Card({id, title, photo, className}) {

  return (
    <div onClick={() => { window.location.href = `/edit-object/${id}` }} className='Card'>
      {!!photo && <img className='Card__img' src={photo.base64} alt={photo.title}/>}
      <div className='Card__contentContainer'>
        <p className='Card__subtitle'>{title}</p>
        <div className='Card__buttonContainer'>
          <div className={className}>
            {className === 'CLOSE' ? 'Не работает' : (className === 'OPEN' ? 'Работает' : 'Ремонт')}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card