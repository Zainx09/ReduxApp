import { writeFile , readFile , DownloadDirectoryPath } from 'react-native-fs';
import XLSX from 'xlsx';

export const exportDataToExcel=(data , fileName)=>{
  let wb = XLSX.utils.book_new();
  let ws = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(wb , ws , 'Users');
  const wbout = XLSX.write(wb , {type:'binary' , bookType:'csv'});

  writeFile(
    DownloadDirectoryPath+'/'+fileName+'.csv',
    wbout,
    'ascii',

  ).then(res=>{
    alert("File Downloaded!")

  }).catch(e=>{
    console.log("Error while downloading : "+e)
    alert("Failed Download!")
  })
}
