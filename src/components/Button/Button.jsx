import React from 'react'

const Button = ({ symbol, clicked }) => {
  return (
    <div>
      <button className='button' onClick={clicked}>{symbol}</button>
    </div>
  )
}

export default Button
