import React from "react"
import './Paper.scss'

function Paper({ children, align }) {
  return (
    <div className={`Paper Paper-${align}`}>
      {children}
    </div>
  )
}

export default Paper