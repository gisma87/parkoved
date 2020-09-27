import React, { useEffect, useState } from "react";
import './News.scss'
import Header from "../../components/Header/Header";
import SideBar from "../../components/SideBar/SideBar";
import CardNewsList from "../../components/CardNewsList/CardNewsList";

const sendNewsGet = async (id) => {
  const TOKEN = window.localStorage.getItem('TOKEN');
  const PARK = window.localStorage.getItem('PARK');
  
  return await fetch(`/api/news?park=${PARK}`, {
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

function News() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await sendNewsGet();

      if (response.news)
        setNews(response.news)
    })()
  }, [])

  return (
    <div className='News'>
      <Header/>
      <SideBar/>
      <div className='News__main'>
        <CardNewsList title={'Новости'} cards={news}/>
      </div>
    </div>
  )

}

export default News