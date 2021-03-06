import React from "react";

const Row = (props) => {
  return (
    <li>
      <div className={props.classes.Item}>
        {/*<b className={props.tab ? "" : props.classes.Key}>{props.key}</b>:&nbsp;*/}
        <b className={props.classes.Key}>{props.keys}</b>:&nbsp;
        <span>
          <span className={props.classes.Type}>{props.body}</span>
          {props.isEOL === "," ? "," : ""}
        </span>
      </div>
    </li>
  )
}

export default Row;