import React, { useEffect, useState } from "react";
import fetch from "cross-fetch";
import axios from "axios";
import style from "./App.css"

export default function App() {
  const [data, setData] = useState();
  const [title, setTitle] = useState("");

  var getData = async () => {
    try {
      const res = await fetch("http://localhost:4000/database");

      if (res.status >= 400) {
        throw new Error("Bad response from server");
      }
      const fetchdata = await res.json();

      setData(fetchdata)
      console.log(data);

      
      
    } catch (err) {
      console.error(err);
    }
  };


  useEffect(()=>{
    getData()
  }, [])

  var addData = async () => {
    axios.post("http://localhost:4000/adddata", {title: title})
  };

  
  // if(data){
  //   const showdata = data.map((val, index)=> (<p key={index}>{val.title}</p>))
  // }

  return (
    <div>
      <image ref={"https://media.discordapp.net/attachments/910906130631372841/973501975738077254/unknown.png?width=1440&height=330"}></image>
      <div>Enter Title</div>
      <input type="text" onChange={(val)=> setTitle(val.target.value)}/>
      <button onClick={() => addData()}>add data</button>
      <button onClick={() => getData()}>showdata</button>
      {data ? data.map((val, index)=> (<p key={index}>title is {val.title}</p>)): ""}

    </div>
  )
}
