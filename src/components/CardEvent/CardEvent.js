import React from "react"
import './CardEvent.scss'

function CardEvent({id, title, photo, className}) {
  return (
    <div onClick={() => { window.location.href = `/edit-event/${id}` }} className='CardEvent'>
      {!!photo && <img className='CardEvent__img' src={photo.base64} alt={photo.title}/>}
      <div className='CardEvent__contentContainer'>
        <p className='CardEvent__subtitle'>{title}</p>
      </div>
    </div>
  )
}

export default CardEvent