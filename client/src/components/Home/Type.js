import React from "react";
import Typewriter from "typewriter-effect";

function Type(props) {
  const array=props.profile.map((p)=>p.skill)
  console.log("this is profile array",array)
  return (
    <Typewriter
      options={{
        strings: array,

        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;
