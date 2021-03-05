import React from "react";

import classes from "./Parameters.css";
import Header from "./Header/Header";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from '@fortawesome/fontawesome-free-solid';
import {faMinus} from '@fortawesome/fontawesome-free-solid';

const Parameters = (props) => {
  let params = (
    <table>
      <thead>
      <tr>
        <th className={classes.Check}></th>
        <th>Key</th>
        <th>Value</th>
        <th><FontAwesomeIcon icon={faMinus}/></th>
      </tr>
      </thead>
      <tbody>
      {props.params.map((param) => (
        <tr key={param.id} className={param.check ? classes.Active : classes.Inactive}>
          <td>
            <input
              type="checkbox"
              onChange={() => props.check(param.id)} checked={param.check}/>
          </td>
          <td>
            <input
              value={param.key}
              onChange={(event) => props.change(event, param.id, 0)}
              disabled={!param.check}
            />
          </td>
          <td>
            <input
              value={param.value}
              onChange={(event) => props.change(event, param.id, 1)}
              disabled={!param.check}
            />
          </td>
          <td>
            <button className={classes.Trash}
                    onClick={() => props.remove(param.id)}>
              <FontAwesomeIcon icon={faTrash}/>
            </button>
          </td>
        </tr>
      ))}
      </tbody>
    </table>
  );

  return (
    <div className={classes.Parameters}>
      <Header add={props.add}/>
      <div className={classes.Body}>
        {params}
      </div>
    </div>
  )
}

export default Parameters;