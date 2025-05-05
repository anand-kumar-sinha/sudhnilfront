import React from 'react'

const NotFound = () => {
  return (
    <div>
      not found
      <button onClick={() => window.history.back()}>back</button>
    </div>
  )
}

export default NotFound
