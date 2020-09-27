import React, { useEffect, useState } from "react"
import './CardEvent.scss'
import QRCode from 'qrcode.react';

const sendPaymentTargetsGet = async (id) => {
  const TOKEN = window.localStorage.getItem('TOKEN');
  
  return await fetch(`/api/payment-targets/?parkEvent=${id}`, {
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

function CardEvent({id, title, photo, className}) {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    (async () => {
        const { paymentTargets } = await sendPaymentTargetsGet(id)
        if (paymentTargets && paymentTargets.length > 0)
          setPayments(paymentTargets)
    })();
  }, [id])

  return (
    <div onClick={() => { window.location.href = `/edit-event/${id}` }} className='CardEvent'>
      {!!photo && <img className='CardEvent__img' src={photo.base64} alt={photo.title}/>}
      <div className='CardEvent__contentContainer'>
        <p className='CardEvent__subtitle'>{title}</p>
        <div className='CardEvent__payments'>
          {payments.map(payment => (
            <a className='CardEvent__payments_link' onClick={(e) => {
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
                size={90}
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

export default CardEvent