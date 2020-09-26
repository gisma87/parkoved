import React from "react"
import './CardNews.scss'

function CardNews({id, title, photo, className}) {
  return (
    <div onClick={() => { window.location.href = `/edit-news/${id}` }} className='CardNews'>
      {!!photo && <img className='CardNews__img' src={photo.base64} alt={photo.title}/>}
      <div className='CardNews__contentContainer'>
        <p className='CardNews__subtitle'>{title}</p>
      </div>
    </div>
  )
}

export default CardNews