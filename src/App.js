import React, {useState} from "react";
import Desktop1 from "./pages/Desktop1/Desktop1";
import './App.css'

function App() {
  // const {TOKEN, setToken} = useState('')
  //
  // function apiGet() {
  //   return fetch(
  //     'http://localhost:3000/api/park-objects?status=OPEN',
  //     // http://172.104.231.185/api/park-objects?status=OPEN
  //     // 'https://jsonplaceholder.typicode.com/todos/1/posts',
  //     {
  //       method: 'GET',
  //       headers: {
  //         authorization: TOKEN,
  //         'Content-Type': 'application/json'
  //       }
  //     })
  //     .then(res => {
  //       if (res.ok) {
  //         return res.json();
  //       }
  //       return Promise.reject(`Что-то пошло не так: ${res.status}`);
  //     })
  // }
  //
  // // apiGet().then(json => console.log(json))
  // //   .catch(err => console.log(`Ошибка: ${err}`))
  //
  // function apiPost() {
  //   return fetch('http://localhost:3000/api/login? HTTP/1.1', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       "email": "testuser@mail.ru",
  //       "password": "testpass"
  //     })
  //   })
  //     .then(res => {
  //       if (res.ok) {
  //         return res.json();
  //       }
  //       return Promise.reject(`Ошибка: ${res.status}`);
  //     })
  //     .catch((err) => {
  //       return Promise.reject(err);
  //     })
  // }
  //
  //
  // apiPost().then(json => {
  //
  //   return setToken(json)
  //
  // })
  //   .catch(err => console.log(`Ошибка: ${err}`))
  //
  //
  // apiGet().then(json => console.log(json))
  //   .catch(err => console.log(`Ошибка: ${err}`))

  return (
    <div className='App'>
      <Desktop1/>
    </div>
  )
}

export default App;