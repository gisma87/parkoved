import React, { useState, useEffect } from "react";
import Desktop1 from "./pages/Desktop1/Desktop1";
import './App.css'

function App() {
  const [token, setToken] = useState('')
  const [cards, setCards] = useState([])

  const apiGet = async () => {
    return await fetch(
      'http://localhost:3000/api/park-objects?status=OPEN&status=CLOSE&status=RENT',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
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

  const apiPost = async () => {
    return (
      await fetch('http://localhost:3000/api/login', {
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

  useEffect(() => {
    (async () => {
      const response = await apiPost();
      if (response.token)
        setToken(response.token)
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (token) {
        const response = await apiGet();
        console.log(response)
      }
    })();
  }, [token]);

  return (
    <div className='App'>
      <Desktop1/>
    </div>
  )
}

export default App;