import React, {useState} from "react";
import Desktop1 from "./pages/Desktop1/Desktop1";
import './App.css'

function App() {
  const [TOKEN, setToken] = useState('')
  const [cards, setCards] = useState([])

  async function apiGet() {
    return await fetch(
      'http://localhost:3000/api/park-objects?status=OPEN&status=CLOSE&status=RENT',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      })
  }


  async function apiPost() {
    return (
      await fetch('http://localhost:3000/api/login? HTTP/1.1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "email": "testuser@mail.ru",
          "password": "testpass"
        })
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
          return Promise.reject(err);
        })
    )
  }


  apiPost().then(json => {
    setToken(json.token)
  })
    .catch(err => console.log(`Ошибка: ${err}`))


  apiGet().then(json => console.log(json))
    .catch(err => console.log(`Ошибка: ${err}`))


  return (
    <div className='App'>
      <Desktop1/>
    </div>
  )
}

export default App;