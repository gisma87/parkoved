import React from "react";
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import ParkObjects from "./pages/ParkObjects/ParkObjects";
import ParkEvents from "./pages/ParkEvents/ParkEvents";
import News from "./pages/News/News";
import AddPark from "./pages/AddPark/AddPark";
import SetPark from "./pages/SetPark/SetPark";
import AddObject from "./pages/AddObject/AddObject";
import AddEvent from "./pages/AddEvent/AddEvent";
import AddNews from "./pages/AddNews/AddNews";
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
          <Route path="/add-park" component={AddPark} />
          <Route path="/set-park/:id" component={SetPark} />
          <Route path="/edit-park/:id" component={AddPark} />

          <Route path="/park-objects" component={ParkObjects} />
          <Route path="/add-object" component={AddObject} />
          <Route path="/edit-object/:id" component={AddObject} />
          <Route path="/park-events" component={ParkEvents} />
          <Route path="/add-event" component={AddEvent} />
          <Route path="/edit-event/:id" component={AddEvent} />

          <Route path="/news" component={News} />
          <Route path="/add-news" component={AddNews} />
          <Route path="/edit-news/:id" component={AddNews} />

          <Route path="/" component={InitPage} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App;