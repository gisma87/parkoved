import React, { useState, useEffect } from "react";
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import ParkObjects from "./pages/ParkObjects/ParkObjects";
import AddPark from "./pages/AddPark/AddPark";
import AddObject from "./pages/AddObject/AddObject";
import InitPage from "./pages/InitPage/InitPage";
import './App.css'

function App() {
  // const [token, setToken] = useState('')
  // const [cards, setCards] = useState([])

  // const apiGet = async () => {
  //   return await fetch(
  //     'http://localhost:3000/api/park-objects?status=OPEN&status=CLOSE&status=RENT',
  //     {
  //       method: 'GET',
  //       headers: {
  //         Authorization: `Bearer ${token}`,
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

  // useEffect(() => {
  //   (async () => {
  //     if (token) {
  //       const response = await apiGet();
  //       console.log(response)
  //     }
  //   })();
  // }, [token]);

  return (
    <div className='App'>
      <BrowserRouter basename="/">
        <Switch>
          <Route path="/park-objects" component={ParkObjects} />
          <Route path="/add-park" component={AddPark} />
          <Route path="/add-object" component={AddObject} />
          <Route path="/" component={InitPage} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App;