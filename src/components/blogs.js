import React, { useState, useEffect } from "react";
import { Card, List } from 'antd';
import axios from "axios";

// const data = [
//     {
//       title: 'Zain',
//       text: "pak will win WC 22"
//     },
//     {
//       title: 'Khizar',
//       text: "South will win WC 22"
//     },
    
//   ];

const Blogs=() => {

    const [data , setData] = useState([])

    useEffect(() => {
        const interval = setInterval(() => {
          fakeJSONCall()
        }, 20000);
    
        return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
      }, [])
    

    function fakeJSONCall(){

        let textList = ["Pakistan will win this WC 22." , "Australia's WC it is." , "England will win." , "India's chances are high." , "South Africa's WC it is." , "NewZealand has highest chance."];
        let text = textList[Math.floor(Math.random() * textList.length)];
        

        let payload = {
            token: "-JQ6sO24NFbXPKaUSZJS8w",
            data: {
                user_name: "nameFirst",
                user_email: "internetEmail",
                text: text,
                date: 'date|ISOdate',
            }
        };

        axios({
        method: "post",
        url: "https://app.fakejson.com/q",
        data: payload
        }).then(function(resp) {
            setData(oldData => [...oldData, resp.data]);
        });
    }


    return (
        <>
        
            <List
                grid={{
                gutter: 100,
                column: 4,
                }}
                dataSource={data}
                renderItem={(item) => (
                <List.Item>
                    <Card title={item.user_name} style={{display:'flex' , flexDirection:'column', height:'220px'}}>
                        <div style={{height:'30%'}}>
                            <p style={{color:'black' , fontWeight:'bold'}}>{item.text}</p>
                        </div>

                        <div style={{height:'40%'}}>
                            <p style={{color:'gray', fontSize:'14px', fontStyle:'italic'}}>{item.user_email}</p>
                        </div>
                        
                        <hr style={{marginTop:'0px'}}/>

                        <div style={{height:'20%'}}>
                            <p style={{color:'gray' , fontSize:'11px'}}>{item.date}</p>
                        </div>
                    </Card>
                </List.Item>
                )}
            />
        </>
    )
}

export default Blogs;