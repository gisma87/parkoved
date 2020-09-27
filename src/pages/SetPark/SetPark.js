import React, { useEffect } from "react";
import './SetPark.scss'
import {
  useParams
} from "react-router-dom";

function SetPark({ history }) {
  const { id } = useParams();
  
  useEffect(() => {
    
    if (id) {
      window.localStorage.setItem('PARK', id);
      history.push('/park-objects');
    }
  }, [id, history]);

  return (
    <div />
  )
}

export default SetPark