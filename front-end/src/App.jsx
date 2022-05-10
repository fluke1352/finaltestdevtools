import React, { useEffect, useState } from "react";
import fetch from "cross-fetch";
import axios from "axios";
import style from "./App.css"

export default function App() {
  const [tel, setTel] = useState("");

  var otpsent = async () => {
    axios.post("http://localhost:4000/", {tel: tel})
  };

  


  return (
    <div style={{textAlign: "center"}}>
      <img style={{width: "100%"}} src="https://media.discordapp.net/attachments/910906130631372841/973501975738077254/unknown.png?width=1440&height=330"></img>
      <h2 style={{color : "red"}}>กรุณากรอกข้อมูลเพื่อตรวจสอบ<br></br>
      Please fill out the information to verify.</h2>
      <p>
      กรอกเบอร์โทรศัพท์มือถือ<br></br>
      เพื่อรับ OTP เพื่อยืนยันตัวตน<br></br>
      Please enter your mobile phone number.<br></br>
      to receive OTP to verify identity
      </p>
      <h3>เบอร์โทรศัพท์มือถือ / Mobile number </h3>
      <input type="text" placeholder="Please enter your mobile number" style={{width:"22%"}}  onChange={(val)=> setTel(val.target.value)}/>
      <br />
      <u style={{color:"red"}}>ลูกค้า TrueOnline และ TrueVision คลิกที่นี่<br></br>
      For TrueOnline and Truevision customer click here</u>
      <br></br>
      <button onClick={()=>otpsent()}>ขอรหัส OTP/ GET OTP</button>

    </div>
  )
}
