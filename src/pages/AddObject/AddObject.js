import React, { useState, useEffect } from "react";
import './AddObject.scss'
import clsx from 'clsx';
import Paper from "../../components/Paper/Paper";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
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

const sendObjectPost = async (body) => {
  const TOKEN = window.localStorage.getItem('TOKEN');
  
  return await fetch('http://localhost:3000/api/park-objects', {
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

const sendObjectPut = async (id, body) => {
  const TOKEN = window.localStorage.getItem('TOKEN');
  
  return await fetch(`http://localhost:3000/api/park-objects/${id}`, {
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


const sendObjectGet = async (id) => {
  const TOKEN = window.localStorage.getItem('TOKEN');
  
  return await fetch(`http://localhost:3000/api/park-objects/${id}`, {
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

function AddObject({ history }) {
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      if (id) {
        const response = await sendObjectGet(id);

        if (response.parkObject) {
          setTitle(response.parkObject.title);
          setDescription(response.parkObject.description);
          if (response.parkObject.place && response.parkObject.place.longitude)
            setLon(response.parkObject.place.longitude);
          if (response.parkObject.place && response.parkObject.place.latitude)
            setLat(response.parkObject.place.latitude);

          setType(response.parkObject.type)
          setStatus(response.parkObject.status)

          if (response.parkObject.ageRestrictions && response.parkObject.ageRestrictions.min)
            setAge(response.parkObject.ageRestrictions.min);

          if (response.parkObject.weightRestrictions && response.parkObject.weightRestrictions.max)
            setWeight(response.parkObject.weightRestrictions.max);

          if (response.parkObject.heightRestrictions && response.parkObject.heightRestrictions.min)
            setHeight(response.parkObject.heightRestrictions.min);

          if (response.parkObject.rules && response.parkObject.rules.length > 0)
            setRules(response.parkObject.rules.map(rule => rule.title))
        }
      }
    })();
  }, [id])

  const classes = useStyles();

  const [pictures, setPictures] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [lon, setLon] = useState(55.684758);
  const [lat, setLat] = useState(37.738521);
  const [type, setType] = useState('FOOD');
  const [status, setStatus] = useState('OPEN');
  const [age, setAge] = useState(3);
  const [weight, setWeight] = useState(90);
  const [height, setHeight] = useState(146);
  const [rules, setRules] = useState(['']);
  const [payments, setPayments] = useState([{ title: '', price: 10 }]);

  const onClick = async () => {
    try {
      let response;

      const data = {
        park: window.localStorage.getItem('PARK'),
        title,
        description,
        type,
        status,
        ageRestrictions: { min: age },
        weightRestrictions: { max: weight },
        heightRestrictions: { min: height },
        photos: await Promise.all(pictures.map(async (picture, i) => ({
          title: `image_${i}`,
          base64: await getBase64(picture)
        }))),
        place: {
          longitude: lon,
          latitude: lat
        },
        rules: rules.map(rule => ({ title: rule })),
      }

      if (id) {
        response = await sendObjectPut(id, data);
      }
      else {
        response = await sendObjectPost(data);
      }
  
      if (response.parkObject)
        history.push('/park-objects');
    } catch (error) {
      setError(error)
    }
  }

  const onDrop = (picture) => {
    setPictures(pictures.concat(picture));
  }

  const onTypeChange = (event) => {
    setType(event.target.value);
  }

  const onStatusChange = (event) => {
    setStatus(event.target.value);
  }

  const onAgeChange = (event) => {
    setAge(event.target.value);
  }

  const onWeightChange = (event) => {
    setWeight(event.target.value);
  }

  const onHeightChange = (event) => {
    setHeight(event.target.value);
  }


  return (
    <div className='AddObject'>
      <Header/>
      <SideBar/>
      <div className='AddObject__main'>
        <Paper> 
          <h3>Общая информация</h3>
          <form className={classes.root} noValidate autoComplete="off">
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Тип объекта</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                onChange={onTypeChange}
              >
                <MenuItem value={'FOOD'}>Кафе-ресторан</MenuItem>
                <MenuItem value={'ATTRACTION'}>Аттракцион</MenuItem>
                <MenuItem value={'RENT'}>Прокат</MenuItem>
                <MenuItem value={'PHOTOZONE'}>Фотозона</MenuItem>
                <MenuItem value={'BENCH'}>Беседка</MenuItem>
                <MenuItem value={'KIDSZONE'}>Детская зона</MenuItem>
                <MenuItem value={'TOILET'}>Туалет</MenuItem>
                <MenuItem value={'FOUNTAIN'}>Фонтан</MenuItem>
                <MenuItem value={'CULTUREZONE'}>Творческая площадка</MenuItem>
              </Select>
            </FormControl>
            <br />
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Статус</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                onChange={onStatusChange}
              >
                <MenuItem value={'OPEN'}>Работает</MenuItem>
                <MenuItem value={'CLOSE'}>Закрыто</MenuItem>
                <MenuItem value={'RENT'}>Ремонт</MenuItem>
              </Select>
            </FormControl>
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
                <FormHelperText id="standard-weight-helper-text">Вес до</FormHelperText>
                <Input
                  id="standard-adornment-weight"
                  value={weight}
                  onChange={onWeightChange}
                  endAdornment={<InputAdornment position="end">кг</InputAdornment>}
                  aria-describedby="standard-weight-helper-text"
                  inputProps={{
                    'aria-label': 'weight',
                  }}
                />
              </FormControl>
              <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
                <FormHelperText id="standard-height-helper-text">Рост от</FormHelperText>
                <Input
                  id="standard-adornment-weight"
                  value={height}
                  onChange={onHeightChange}
                  endAdornment={<InputAdornment position="end">см</InputAdornment>}
                  aria-describedby="standard-height-helper-text"
                  inputProps={{
                    'aria-label': 'height',
                  }}
                />
              </FormControl>
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
            {!!rules && rules.map((rule, i) => (
              <>
                <br />
                <TextField id="standard-1" label="Правило/ограничение" value={rule} onChange={(e) => {
                  setRules(rules.map((r, j) => i == j ? e.target.value : r))
                }} />
              </>
            ))}
            <br />
            <Button color="primary" onClick={() => {
              setRules([...rules, ''])
            }}>
              Добавить правило/ограничение
            </Button>
            <br />

            <br />
            {!!payments && payments.map((payment, i) => (
              <div className="row">
                <TextField id="standard-basic2" label="Название услуги" value={payment.title} onChange={(e) => {
                  setPayments(payments.map((r, j) => i == j ? { ...r, title: e.target.value } : r))
                }} />
                <TextField id="standard-basic3" label="Цена за услугу" value={payment.price} onChange={(e) => {
                  setPayments(payments.map((r, j) => i == j ? { ...r, price: e.target.value } : r))
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
              {id ? 'Редактировать объект' : 'Добавить объект'}
            </Button>
            {!!error && <p className="error-text">{error}</p>}
          </form>
        </Paper>
        
      </div>
    </div>
  )

}

export default AddObject