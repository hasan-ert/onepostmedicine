import React, { useEffect, useState } from "react";
import { getUserData } from "../api/user.API";
import { UpEachWord } from "../helpers/helpers";

export default function Deneme() {
  const [trial,setTrial] = useState({name:""})
  useEffect(()=>{
    let data;
    getUserData("anil@gmail.com").then((res) => {handler(res)}).finally(console.log(trial));
    
  },[])

  const handler = (e) => {
      setTrial(e)
  }
  return (
    <div>
      <h2>{trial.name}</h2>
    </div>
  );
}
