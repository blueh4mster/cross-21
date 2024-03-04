import React, { useContext, useState } from "react";
import { AppContext } from "../pages";
import button from "@chainlink/design-system/button.module.css";

function Box() {
  const { currNum, inputNum } = useContext(AppContext);
  const [input, setInput] = useState(0);
  return (
    <>
      <div
        style={{
          height: "115px",
          width: "115px",
          color: "white",
          fontSize: "100px",
          paddingLeft: "30px",
          lineHeight: "20px",
          backgroundColor: "#0a1a57",
          borderRadius: "10px",
          display: "grid",
          gridTemplateColumns: "120px 120px 120px",
          gridGap: "10px",
          padding: "10px",
          alignItems: "center",
        }}
      >
        {currNum}
      </div>
      <input
        type="text"
        style={{ alignItems: "center", width: "300px" }}
        id="num"
        name="num"
        onChange={(e) => setInput(e.target.value)}
      ></input>
      <button
        className={button.primary}
        onClick={async() => await inputNum(input)}
        style={{ marginLeft: "20px" }}
      >
        submit choice
      </button>
    </>
  );
}

export default Box;
