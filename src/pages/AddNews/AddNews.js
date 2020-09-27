import React, { useState, useEffect } from "react";
import './AddNews.scss'
import Paper from "../../components/Paper/Paper";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import ImageUploader from 'react-images-upload';
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

const sendNewsPost = async (body) => {
  const TOKEN = window.localStorage.getItem('TOKEN');
  
  return await fetch('/api/news', {
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

const sendNewsPut = async (id, body) => {
  const TOKEN = window.localStorage.getItem('TOKEN');
  
  return await fetch(`/api/news/${id}`, {
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


const sendNewsGet = async (id) => {
  const TOKEN = window.localStorage.getItem('TOKEN');
  
  return await fetch(`/api/news/${id}`, {
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

function AddNews({ history }) {
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      if (id) {
        const response = await sendNewsGet(id);

        if (response.news) {
          setTitle(response.news.title);
          setDescription(response.news.description);
        }
      }
    })();
  }, [id])

  const classes = useStyles();
  const [error, setError] = useState('');
  const [pictures, setPictures] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const onClick = async () => {
    try {
      let response;

      const data = {
        park: window.localStorage.getItem('PARK'),
        title,
        description,
        photos: await Promise.all(pictures.map(async (picture, i) => ({
          title: `image_${i}`,
          base64: await getBase64(picture)
        }))),
      }

      if (id) {
        response = await sendNewsPut(id, data);
      }
      else {
        response = await sendNewsPost(data);
      }
  
      if (response.news)
        history.push('/news');
    } catch (error) {
      setError(error)
    }
  }

  const onDrop = (picture) => {
    setPictures(pictures.concat(picture));
  }

  return (
    <div className='AddNews'>
      <Header/>
      <SideBar/>
      <div className='AddNews__main'>
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

            <Button variant="outlined" color="primary" onClick={onClick}>
              {id ? 'Редактировать новость' : 'Добавить новость'}
            </Button>
            {!!error && <p className="error-text">{error}</p>}
          </form>
        </Paper>
        
      </div>
    </div>
  )

}

export default AddNews