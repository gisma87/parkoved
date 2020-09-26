import React, { useEffect, useState } from "react";
import lodash from 'lodash';
import './ParkEvents.scss'
import Header from "../../components/Header/Header";
import SideBar from "../../components/SideBar/SideBar";
import CardEventList from "../../components/CardEventList/CardEventList";
import {fp1, fp2, fp3, fp4, fp5, img1, img2, img3, img4, fz1, fz2, fz3} from "../../images/images.js";

const sendEventsGet = async (id) => {
  const TOKEN = window.localStorage.getItem('TOKEN');
  
  return await fetch(`http://localhost:3000/api/park-events`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${TOKEN}`,
      'Content-Type': 'application/json'
    },
  }).then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    return Promise.reject(err);
  });
}

function ParkEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await sendEventsGet();

      if (response.parkEvents)
        setEvents(response.parkEvents)
    })()
  }, [])

console.log(events)

  return (
    <div className='ParkEvents'>
      <Header/>
      <SideBar/>
      <div className='ParkEvents__main'>
        <CardEventList title={'События'} cards={events}/>
      </div>
    </div>
  )

}

export default ParkEvents