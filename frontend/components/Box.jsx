import React from "react";

function Box() {
  return (
    <div
      style={{
        height: "395px",
        width: "395px",
        backgroundColor: "#fff",
        borderRadius: "10px",
        display: "grid",
        gridTemplateColumns: "120px 120px 120px",
        gridGap: "10px",
        padding: "10px",
        alignItems: "center",
      }}
    >
      <div
        style={{
          textAlign: "center",
          color: "white",
          fontFamily: "fantasy",
          marginTop: "20px",
          fontSize: "70px",
        }}
      >
        "1"
      </div>
    </div>
  );
}

export default Box;
