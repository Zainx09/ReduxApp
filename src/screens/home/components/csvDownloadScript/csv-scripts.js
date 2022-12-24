import { writeFile , readFile , DownloadDirectoryPath } from 'react-native-fs';
import XLSX from 'xlsx';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

export const exportDataToPDF=async (data , fileName)=>{

  // alert(JSON.stringify(data))
    
  // const rows = [
  //   { name: 'Name', render: (item) => item.name },
  //   { name: 'Type', render: (item) => item.eventType },
  //   { name: 'Detail', render: (item) => item.eventDetail }
  // ];

  // const body = rows.map(({ name, render }) => (
  //   <tr key={name}>
  //     <td>{name}</td>
  //     {Object.keys(data).map((id, i) => (
  //       <td key={i}>{render(data[id])}</td>
  //     ))}
  //   </tr>
  // ));

  // const content = (
  //   <div>
  //     <table>
  //       <tbody>{body}</tbody>
  //     </table>
  //   </div>
  // );


    const heading = ['Name', 'City', 'Course'];
    const body =
        [['Kapil', 'Jaipur', 'MCA'],
        ['Aakash', 'Hisar', 'Btech'],
        ['Mani', 'Ranchi', 'MSc'],
        ['Yash', 'Udaipur', 'Mtech']];

    const content = `
    <table style={{ width: 500 }}>
      <thead>
          <tr>
              ${heading.map(head => <th>{head}</th>)}
          </tr>
      </thead>
      <tbody>
          ${body.map(row => <tr>{row.map(val => <td>{val}</td>)}</tr>)}
      </tr>
      </tbody>
    </table>
    `

    let options = {
      // html: '<h1>PDF TEST</h1>',
      html:content,
      fileName: fileName,
      directory: 'Downloads',
    };

    let file = await RNHTMLtoPDF.convert(options)
    // console.log(file.filePath);
    alert(file.filePath);

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
