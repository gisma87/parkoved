import React, { useState, useEffect } from "react";
import './AddEvent.scss'
import moment from 'moment';
import clsx from 'clsx';
import Paper from "../../components/Paper/Paper";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import ImageUploader from 'react-images-upload';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import Header from "../../components/Header/Header";
import SideBar from "../../components/SideBar/SideBar";

import {
  useParams
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    '&': {
      width: '100%',
      margin: theme.spacing(1),
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start'
    },
    '& > *': {
      width: '400px',
    }
  },
}));

const getBase64 = async (file) => {
  return await new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      resolve(reader.result)
    };
    reader.onerror = function (error) {
      reject(error);
    };
  })
}

const sendEventPost = async (body) => {
  const TOKEN = window.localStorage.getItem('TOKEN');
  
  return await fetch('http://localhost:3000/api/park-events', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
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

const sendEventPut = async (id, body) => {
  const TOKEN = window.localStorage.getItem('TOKEN');
  
  return await fetch(`http://localhost:3000/api/park-events/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
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


const sendEventGet = async (id) => {
  const TOKEN = window.localStorage.getItem('TOKEN');
  
  return await fetch(`http://localhost:3000/api/park-events/${id}`, {
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

function AddEvent({ history }) {
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      if (id) {
        const response = await sendEventGet(id);

        if (response.parkEvent) {
          setTitle(response.parkEvent.title);
          setDescription(response.parkEvent.description);
          if (response.parkEvent.place && response.parkEvent.place.longitude)
            setLon(response.parkEvent.place.longitude);
          if (response.parkEvent.place && response.parkEvent.place.latitude)
            setLat(response.parkEvent.place.latitude);

          if (response.parkEvent.ageRestrictions && response.parkEvent.ageRestrictions.min)
            setAge(response.parkEvent.ageRestrictions.min);

          if (response.parkEvent.start)
            setStart(moment(response.parkEvent.start));

          if (response.parkEvent.finish)
            setFinish(moment(response.parkEvent.finish));
        }
      }
    })();
  }, [id])

  const classes = useStyles();
  const [error, setError] = useState('');
  const [pictures, setPictures] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [lon, setLon] = useState(55.684758);
  const [lat, setLat] = useState(37.738521);
  const [start, setStart] = useState(moment());
  const [finish, setFinish] = useState(moment());
  const [age, setAge] = useState(100);
  const [payments, setPayments] = useState([{ title: '', price: 10 }]);

  const onClick = async () => {
    try {
      let response;

      const data = {
        park: window.localStorage.getItem('PARK'),
        title,
        description,
        ageRestrictions: { min: age },
        photos: await Promise.all(pictures.map(async (picture, i) => ({
          title: `image_${i}`,
          base64: await getBase64(picture)
        }))),
        place: {
          longitude: lon,
          latitude: lat
        },
        start: start.format(),
        finish: finish.format()
      }

      if (id) {
        response = await sendEventPut(id, data);
      }
      else {
        response = await sendEventPost(data);
      }
  
      if (response.parkEvent)
        history.push('/park-events');
    } catch (error) {
      setError(error)
    }
  }

  const onDrop = (picture) => {
    setPictures(pictures.concat(picture));
  }

  const onAgeChange = (event) => {
    setAge(event.target.value);
  }

  return (
    <div className='AddEvent'>
      <Header/>
      <SideBar/>
      <div className='AddEvent__main'>
        <Paper> 
          <h3>Общая информация</h3>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField id="standard-basic" label="Название" value={title} onChange={(e) => setTitle(e.target.value)} />
            <TextField id="standard-basic" label="Описание" value={description} onChange={(e) => setDescription(e.target.value)}  />
            <br />
            <h3>Галерея/Медиатека</h3>
            <ImageUploader
              withPreview
              buttonText='Загрузить'
              onChange={onDrop}
              imgExtension={['.jpg', '.gif', '.png', '.gif']}
              maxFileSize={5242880}
            />
            <br />

            <div className="row">
              <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
                <FormHelperText id="standard-height-helper-text">Возраст от</FormHelperText>
                <Input
                  id="standard-adornment-weight"
                  value={age}
                  onChange={onAgeChange}
                  endAdornment={<InputAdornment position="end">см</InputAdornment>}
                  aria-describedby="standard-age-helper-text"
                  inputProps={{
                    'aria-label': 'age',
                  }}
                />
              </FormControl>
            </div>
            <br />
            <div className="row">
              <TextField
                id="datetime-local"
                label="Начало"
                type="datetime-local"
                defaultValue={start.format('YYYY-MM-DDTHH:mm')}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                value={start.format('YYYY-MM-DDTHH:mm')}
                onChange={(e) => setStart(moment(e.target.value))}
              />
              <TextField
                id="datetime-local"
                label="Окончание"
                type="datetime-local"
                defaultValue={finish.format('YYYY-MM-DDTHH:mm')}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                value={finish.format('YYYY-MM-DDTHH:mm')}
                onChange={(e) => setFinish(moment(e.target.value))}
              />
            </div>

            <br />
            {!!payments && payments.map((payment, i) => (
              <div className="row">
                <TextField id="standard-basic2" label="Название услуги" value={payment.title} onChange={(e) => {
                  setPayments(payments.map((r, j) => i === j ? { ...r, title: e.target.value } : r))
                }} />
                <TextField id="standard-basic3" label="Цена за услугу" value={payment.price} onChange={(e) => {
                  setPayments(payments.map((r, j) => i === j ? { ...r, price: e.target.value } : r))
                }} />
              </div>
            ))}
            <br />
            <Button color="primary" onClick={() => {
              setPayments([...payments, { title: '', price: 10 }])
            }}>
              Добавить платную услугу
            </Button>
            <br />

            <YMaps>
              <div className="yandex-map">
                <p>Укажите местоположение на карте</p>
                <br />
                <Map 
                  instanceRef={inst => inst && inst.events.add('click', (e) => {
                    const coordinates = e.get('coords');
                    setLon(coordinates[0])
                    setLat(coordinates[1])
                  })}
                  defaultState={{ center: [55.75, 37.57], zoom: 9 }} 
                  style={{ width: '100%', height: 312}}
                >
                  <Placemark geometry={[lon, lat]} />
                </Map>
              </div>
            </YMaps>
            <br />
            <Button variant="outlined" color="primary" onClick={onClick}>
              {id ? 'Редактировать событие' : 'Добавить событие'}
            </Button>
            {!!error && <p className="error-text">{error}</p>}
          </form>
        </Paper>
        
      </div>
    </div>
  )

}

export default AddEvent