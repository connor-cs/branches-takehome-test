import React from "react";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

export default function Branch({ name, handleMoveColumn }) {
  
  return (
    <div className="branch" key={name}>
      <MdKeyboardArrowLeft className="button" onClick={() => handleMoveColumn("left", name)} />
      {name}
      <MdKeyboardArrowRight className="button"onClick={() => handleMoveColumn("right", name)} />
    </div>
  );
}
