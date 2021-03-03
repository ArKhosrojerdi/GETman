import React from 'react';

import classes from './AddressBar.css';

const AddressBar = (props) => {
  const select = (
    <select
      name="method"
      id="method"
      onChange={props.method}>
      {props.methods.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  )

  return (
    <div className={classes.AddressBar}>
      {select}
      <input type="text" placeholder="http://example.com/api" autoFocus={true} value={props.url}
             onChange={(event) => props.urlHandler(event)}/>
      <button onClick={props.send}>
        Send
      </button>
    </div>
  )
}

export default AddressBar;