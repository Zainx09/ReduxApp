import React, { useEffect, useState } from "react";

import axios from "axios";

import DonutChart from "./charts/donutChart";
import BarChart from "./charts/barChart";
import Blogs from "./blogs";

import titlepic from "../public/WCtitlepic.jpg"
import paklogo from "../public/paklogo.png"
import auslogo from "../public/auslogo.png"
import englogo from "../public/englogo.png"
import indlogo from "../public/indlogo.png"
import Southafricalogo from "../public/Southafricalogo.png"
import newzealogo from "../public/newzealogo.png"

import {votePak, voteAus, voteEng, voteInd, voteSouth, voteNew} from "../action"

import { useSelector, useDispatch } from "react-redux";

const HomePage=() => {
 
  const vote = useSelector(state => state.voting);
  
  const dispatch = useDispatch();


 
  
 
  return(
    <div style={{width:'100%', display:'flex', flexDirection:'column', alignItems:'center'}}>
      
      <div style={{width:'100%' ,display:'flex', flexDirection:'row', justifyContent:'center'}}>
        <img src={titlepic} alt="Title Pic" style={{width:'85%', borderBottomLeftRadius:'20px', borderBottomRightRadius:'20px'}}/>
      </div>

      <div style={{width:'100%',display:'flex', flexDirection:'column', alignItems:'center'}}>

        <hr style={{width:'85%', marginTop:'40px'}}/>

        <div style={{width:'80%', display:'flex', flexDirection:'column', alignItems:'center'}}>
          <text style={{fontFamily:'fantasy', fontSize:'40px' , fontStyle:'italic', textAlign:'center'}}>Who will win T20 WorldCup 2022?</text>
          <text style={{fontFamily:'fantasy', fontSize:'30px' , marginTop:'10px', textAlign:'center'}}>Vote Your Team</text>
        </div>
        

        <hr style={{width:'85%'}}/>
       
        <div style={{width:'80%', display:'flex', justifyContent:'space-evenly', marginTop:'60px', marginBottom:'30px'}}>
          <img src={paklogo} alt="pakistan" onClick={()=>{dispatch(votePak())}} style={{width:'150px', height:'150px', borderRadius:'50px',background:'whitesmoke', padding:'20px', borderStyle:'solid', borderColor:'lightgray'}}/>
          <img src={auslogo} alt="australia" onClick={()=>{dispatch(voteAus())}} style={{width:'150px', height:'150px', borderRadius:'50px',background:'whitesmoke', padding:'20px', borderStyle:'solid', borderColor:'lightgray'}}/>
          <img src={englogo} alt="england" onClick={()=>{dispatch(voteEng())}} style={{width:'150px', height:'150px', borderRadius:'50px',background:'whitesmoke', padding:'20px', borderStyle:'solid', borderColor:'lightgray'}}/>
        </div>
        
        <div style={{width:'80%', display:'flex', justifyContent:'space-evenly', marginTop:'30px', marginBottom:'30px'}}>
          <img src={indlogo} alt="india" onClick={()=>{dispatch(voteInd())}} style={{width:'150px', height:'150px', borderRadius:'50px',background:'whitesmoke', padding:'20px', borderStyle:'solid', borderColor:'lightgray'}}/>
          <img src={Southafricalogo} alt="southafrica" onClick={()=>{dispatch(voteSouth())}} style={{width:'150px', height:'150px', borderRadius:'50px',background:'whitesmoke', padding:'20px', borderStyle:'solid', borderColor:'lightgray'}}/>
          <img src={newzealogo} alt="newzealand" onClick={()=>{dispatch(voteNew())}} style={{width:'150px', height:'150px', borderRadius:'50px',background:'whitesmoke', padding:'20px', borderStyle:'solid', borderColor:'lightgray'}}/>
        </div>

      </div>

      <hr style={{width:'85%', marginTop:'40px', marginBottom:'40px'}}/>

      <div style={{width:'90%',display:'flex' , flexDirection:'row', alignItems:'center', justifyContent:'space-evenly'}}>
        <text style={{fontFamily:'fantasy', fontSize:'25px' , marginTop:'10px'}}>Donut Chart</text>
        <DonutChart />
      </div>
      
      <hr style={{width:'85%', marginTop:'40px', marginBottom:'40px'}}/>

      <div style={{width:'90%',display:'flex' , flexDirection:'row', alignItems:'center', justifyContent:'space-evenly'}}>
        <text style={{fontFamily:'fantasy', fontSize:'25px' , marginTop:'10px'}}>Bar Chart</text>
        <BarChart />
      </div>
      
      <hr style={{width:'85%', marginTop:'40px', marginBottom:'20px'}}/>

      <div>
        <text style={{fontFamily:'fantasy', fontSize:'40px' ,textAlign:'center'}}>Blogs</text>
      </div>

      <hr style={{width:'85%', marginTop:'20px', marginBottom:'40px'}}/>

      <div style={{width:'80%'}}>
        <Blogs />
      </div>

    </div>
  )
}


export default HomePage;