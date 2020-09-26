import React, { useEffect, useState } from "react";
import lodash from 'lodash';
import './ParkObjects.scss'
import Header from "../../components/Header/Header";
import SideBar from "../../components/SideBar/SideBar";
import CardList from "../../components/CardList/CardList";
import {fp1, fp2, fp3, fp4, fp5, img1, img2, img3, img4, fz1, fz2, fz3} from "../../images/images.js";

const sendObjectTypesGet = async (id) => {
  const TOKEN = window.localStorage.getItem('TOKEN');
  
  return await fetch(`http://localhost:3000/api/park-objects/types`, {
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

const sendObjectsGet = async (id) => {
  const TOKEN = window.localStorage.getItem('TOKEN');
  
  return await fetch(`http://localhost:3000/api/park-objects`, {
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

function ParkObjects() {
  const [categories, setCategories] = useState({});
  const [types, setTypes] = useState({});

  useEffect(() => {
    (async () => {
      const response = await sendObjectsGet();

      if (response.parkObjects)
        setCategories(lodash.groupBy(response.parkObjects, 'type'))
    })()
  }, [])

  useEffect(() => {
    (async () => {
      const response = await sendObjectTypesGet();

      if (response.types)
        setTypes(response.types)
    })()
  }, [])

  return (
    <div className='ParkObjects'>
      <Header/>
      <SideBar/>
      <div className='ParkObjects__main'>
        {lodash.map(categories, (category, key) => (
          <CardList title={types[key]} cards={category}/>
        ))}
      </div>
    </div>
  )

}

export default ParkObjects