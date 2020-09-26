import React, { useEffect } from "react";

function InitPage({ history }) {
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
      if (response.token) {
        window.localStorage.setItem('TOKEN', response.token)
        history.push('/add-park');
      }
    })();
  }, [history]);

  return (
    <div />
  )
}

export default InitPage