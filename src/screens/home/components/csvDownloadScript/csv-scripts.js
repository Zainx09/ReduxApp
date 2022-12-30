import { writeFile , readFile , DownloadDirectoryPath } from 'react-native-fs';
import XLSX from 'xlsx';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { useEffect, useState } from 'react';
import { head } from 'lodash';

export const exportDataToPDF=async (data,fileName)=>{

  // const data = {'1111' : {
  //   'name' : 'first',
  //   'id' : '1111',
  //   'date' : new Date(Date.now())
  // }}

  // const [heading , setHeading] = useState({});
  // const [body , setBody] = useState({});

  // const [data2 , setData2] = useState();


  

  // useEffect(()=>{
  //   setData2()
  //   if(data){
  //     let head=[]
  //     let bodyObj = {}
  //     Object.values(data[0]).forEach((key)=>{
  //       head.push(key);
  //       let listValues = []
  //       Object.values(data).forEach((obj)=>{
  //         listValues.push(obj[key])
  //       })
  //       bodyObj[key] = listValues
  //     })
  //     setData2(bodyObj)
  //   }
  // },[data])

  // const heading = ['Name', 'City', 'Course'];

  if(data){

  // let head=[]
  let bodyObj = {}
  Object.keys(Object.values(data)[0]).forEach((key)=>{
    // head.push(key);
    let listValues = []
    Object.values(data).forEach((obj)=>{
      if(key==='dateTime'){
        listValues.push(obj[key]?(obj[key].toDate()):'null')
      }else{
        listValues.push(obj[key]?obj[key]:'null')
      }
      
    })
    bodyObj[key] = listValues
  })
  
  const html = `
    <html>
      <head>
        <style>
          body {
            font-family: 'Helvetica';
            font-size: 12px;
          }
          header, footer {
            height: 50px;
            background-color: #fff;
            color: #000;
            display: flex;
            justify-content: center;
            padding: 0 20px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            border: 1px solid #000;
            padding: 5px;
            text-align: center;
            vertical-align: middle;
          }
          th {
            background-color: #ccc;
          }
        </style>
      </head>
      <body>
        <header>
          <h1>Events</h1>
        </header>
        <table style={{ width: 500 }}>
          <thead>
              <tr>
                  ${Object.keys(bodyObj).map(head => 
                    `<th>${head}</th>`
                  ,
                  ).join('')}
              </tr>
          </thead>
          <tbody>
              ${Object.keys(bodyObj).map((header, index) =>
                `<tr>
                  ${Object.values(bodyObj).map((val, index2) => 
                    !val[index] ? `<td>${"null"}</td>` : `<td>${val[index]}</td>`
                    
                  )}
                </tr>`
              ,
              ).join('')}
    
          </tr>
          </tbody>
        </table>
        <footer>
          <p>Thank you for your business!</p>
        </footer>
      </body>
    </html>
  `

  let options = {
    html:html,
    fileName: fileName,
    directory: 'Download',
  };

  let file = await RNHTMLtoPDF.convert(options)
  alert(file.filePath)}

  // let wb = XLSX.utils.book_new();
  // let ws = XLSX.utils.json_to_sheet(data);
  // XLSX.utils.book_append_sheet(wb , ws , 'Users');
  // const wbout = XLSX.write(wb , {type:'binary' , bookType:'csv'});

  // writeFile(
  //   DownloadDirectoryPath+'/'+fileName+'.pdf',
  //   wbout,
  //   'ascii',

  // ).then(res=>{
  //   alert("File Downloaded!")

  // }).catch(e=>{
  //   console.log("Error while downloading : "+e)
  //   alert("Failed Download!")
  // })
}
