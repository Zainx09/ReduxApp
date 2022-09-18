import React from "react";
import { HomeOutlined, ContactsOutlined } from '@ant-design/icons';
import { Button, Radio } from 'antd';
import "antd/dist/antd.css";

const Header=(props) => {

    function setNavigation(nav){
        props.setNavigate(nav)
    }

    return(
        <div style={{width:'100%',height:'50px',background:'crimson', display:'flex' , flexDirection:'row', justifyContent:'center'}}>

            <div style={{width:'80%', display:'flex', flexDirection:'row',justifyContent:'center'}}>
                <p style={{width:'82%', fontFamily:'fantasy', fontSize:'25px', marginTop:'5px', color:'white'}}>VOTE YOUR TEAM</p>

                <div style={{width:'10%' , display:'flex' , flexDirection:'row', flexFlow:'row-reverse', justifyContent:'space-around', marginTop:'4px'}}>
                    <Button 
                        shape={'circle'}
                        size={'large'}
                        icon={<ContactsOutlined />}
                        onClick={()=>{setNavigation(1)}}>
                    </Button>

                    <Button 
                        shape={'circle'}
                        size={'large'}
                        icon={<HomeOutlined />}
                        onClick={()=>{setNavigation(0)}}>
                    </Button>

                </div>
            </div>
            
            
        </div>
    )
}

export default Header;