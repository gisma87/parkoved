import React, { useEffect, useState } from "react";
import './ParkEvents.scss'
import Header from "../../components/Header/Header";
import SideBar from "../../components/SideBar/SideBar";
import CardEventList from "../../components/CardEventList/CardEventList";

const sendEventsGet = async (id) => {
  const TOKEN = window.localStorage.getItem('TOKEN');
  const PARK = window.localStorage.getItem('PARK');
  
  return await fetch(`/api/park-events?park=${PARK}`, {
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