import React from "react";
import { Table} from 'antd';


const columns = [
  {
    title: 'Tag',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  }
]

const data = [
  {
    key: '1',
    name: 'Name',
    description: 'Zain Ul Abdin'
  },
  {
    key: '2',
    name: 'Email',
    description: 'Zainulabdin.x09@gmail.com'
  },
  {
    key: '3',
    name: 'Contact',
    description: '0313-2525514'
  },
  {
    key: '4',
    name: 'Education',
    description: "Bachelor's in Engineering"
  },
  {
    key: '5',
    name: 'Field',
    description: 'Computer and Information Systems Engineering'
  },
  {
    key: '6',
    name: 'University',
    description: 'NED University'
  },
  {
    key: '7',
    name: 'Linkedin',
    description: 'https://www.linkedin.com/in/zain-ul-abdin-136095175'
  },
];

const ContactPage=() => {
  return(
    <div style={{width:'80%', display:'flex' , flexDirection:'column'}}>

      <Table columns={columns} dataSource={data} style={{marginTop:'50px'}}/>;
     
    </div>
  )
}

export default ContactPage;