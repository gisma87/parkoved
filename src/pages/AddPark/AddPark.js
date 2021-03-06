import React, { useState, useEffect } from "react";
import './AddPark.scss'
import Paper from "../../components/Paper/Paper";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import ImageUploader from 'react-images-upload';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
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
      alignItems: 'center'
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

const sendPost = async (body) => {
  const TOKEN = window.localStorage.getItem('TOKEN');

  return await fetch('/api/parks', {
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

const sendPut = async (id, body) => {
  const TOKEN = window.localStorage.getItem('TOKEN');

  return await fetch(`/api/parks/${id}`, {
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

const sendGet = async (id) => {
  const TOKEN = window.localStorage.getItem('TOKEN');
  
  return await fetch(`/api/parks/${id}`, {
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

function AddPark({ history }) {
  const { id } = useParams();
  const classes = useStyles();

  const [pictures, setPictures] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [lon, setLon] = useState(55.684758);
  const [lat, setLat] = useState(37.738521);
  
  useEffect(() => {
    const park = window.localStorage.getItem('PARK');
    if (!id && park)
      history.push('/park-objects');
  }, [history, id]);

  useEffect(() => {
    (async () => {
      if (id) {
        const response = await sendGet(id);

        if (response.park) {
          setTitle(response.park.title);
          setDescription(response.park.description);
          if (response.park.place && response.park.place.longitude)
            setLon(response.park.place.longitude);
          if (response.park.place && response.park.place.latitude)
            setLat(response.park.place.latitude);
        }
      }
    })();
  }, [id])


  const onDrop = (picture) => {
    setPictures(pictures.concat(picture));
  }

  const onClick = async () => {
    try {
      const data = {
        title,
        description,
        photos: await Promise.all(pictures.map(async (picture, i) => ({
          title: `image_${i}`,
          base64: await getBase64(picture)
        }))),
        place: {
          longitude: lon,
          latitude: lat
        }
      }

      let response;
      if (id) {
        response = await sendPut(id, data);
      }
      else {
        response = await sendPost(data);
      }
  
      if (response.park) {
        window.localStorage.setItem('PARK', response.park._id)
        history.push('/park-objects');
      }
    } catch (error) {
      setError(error)
    }
  }

  return (
    <div className='AddPark'>
      <div className='AddPark__main'>
        <h2>{id ? 'Редактировать парк' : 'Добавьте свой парк'}</h2>
        {!id && <p>Заполните все поля и нажмите продолжить. Система создаст страницу вашего<br />парка и вы сможете добавить объекты и события.</p>}
        <br />
        <Paper align="center">
          <h3>Общая информация</h3>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField id="standard-basic" label="Название" value={title} onChange={(e) => setTitle(e.target.value)} />
            <br />
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
            <YMaps>
              <div className="yandex-map">
                <p>Укажите местоположение вашей карты на точке</p>
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
              {id ? 'Редактировать парк' : 'Добавить парк'}
            </Button>
            {!!error && <p className="error-text">{error}</p>}
          </form>
        </Paper>

      </div>
    </div>
  )
}

export default AddPark