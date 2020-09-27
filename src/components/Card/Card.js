import React, { useEffect, useState } from "react"
import './Card.scss'
import QRCode from 'qrcode.react';

const sendPaymentTargetsGet = async (id) => {
  const TOKEN = window.localStorage.getItem('TOKEN');
  
  return await fetch(`/api/payment-targets/?parkObject=${id}`, {
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

function Card({id, title, photo, className}) {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    (async () => {
        const { paymentTargets } = await sendPaymentTargetsGet(id)
        if (paymentTargets && paymentTargets.length > 0)
          setPayments(paymentTargets)
    })();
  }, [id])

  return (
    <div onClick={() => { window.location.href = `/edit-object/${id}` }} className='Card'>
      {!!photo && <img className='Card__img' src={photo.base64} alt={photo.title}/>}
      <div className='Card__contentContainer'>
        <p className='Card__subtitle'>{title}</p>
        <div className='Card__payments'>
          {payments.map(payment => (
            <a className='Card__payments_link' onClick={(e) => {
              e.stopPropagation()
              const canvas = document.getElementById(payment._id);
              const pngUrl = canvas
                .toDataURL("image/png")
                .replace("image/png", "image/octet-stream");
              let downloadLink = document.createElement("a");
              downloadLink.href = pngUrl;
              downloadLink.download = `${payment.title}.png`;
              document.body.appendChild(downloadLink);
              downloadLink.click();
              document.body.removeChild(downloadLink);
            }}>
              <QRCode
                id={payment._id}
                value={payment._id}
                size={390}
                level={"H"}
                includeMargin={true}
                style={{ width: '90px', height: '90px' }}
              />
              {payment.title}
            </a>
          ))}
        </div>
        
      </div>
    </div>
  )
}

export default Card