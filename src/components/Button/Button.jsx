import React from 'react'
import './Button.css';

const Button = ({ symbol, clicked }) => {
  return (
    <div>
      <button className='button' onClick={clicked}>{symbol}</button>
    </div>
  )
}

export default Button
