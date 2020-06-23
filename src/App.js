import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { Alert } from 'bootstrap';

const baseURL = "http://localhost:61952/getData";
const saveDataSheetURL = "http://localhost:61952/upload";


async function openUrl(url){
  var win = window.open(url, '_blank');
  win.focus();
}


function App() {
  let [dataSheets, setdataSheets] = useState([]);
  async function getdataSheets(){
    const result = await axios.get(baseURL); 
    setdataSheets(result.data);
  }
  useEffect(()=>{ getdataSheets(); },[]);

  async function saveUrl(id, url){
    var bodyFormData = new FormData();
    bodyFormData.set("sheetURL", url);
    await axios({
      method:"POST",
      url: `${saveDataSheetURL}/${id}`,
      data:bodyFormData}).then(res=>{
        alert( res.data);
        //Cause overhead rendering of all list instead of one item
        //TODO -- to be optimized 
       getdataSheets();
      }).catch(err=>{
        alert( "File not Exist");
        //Cause overhead rendering of all list instead of one item
        //TODO -- to be optimized 
       getdataSheets();
      })

  }

  function renderList(){
    if(dataSheets)
    return dataSheets.map((dataSheet) => {
        return (         
          <tr className="" key={dataSheet.dataSheetId}>
            <td>{dataSheet.productName}</td>
            <td>{dataSheet.supplierName}</td>
            <td  onClick={()=>openUrl(dataSheet.dataSheetUrl)}> {dataSheet.dataSheetUrl}</td>
            <td> {dataSheet.updatedAt}</td>
            <td>{dataSheet.isValid===1? "Valid": dataSheet.isValid===2 ?"InValid" : ""} </td>
            <td><button onClick={()=>saveUrl(dataSheet.dataSheetId, dataSheet.dataSheetUrl)} >Save</button></td>
          </tr>
        );
      });
    return <div>No dataSheets Found</div>;
}


  
  return (
    <div className="App">
       <table className="table">
  <thead>
    <tr>
      <th scope="col">Product</th>
      <th scope="col">Supplier</th>
      <th scope="col">DataSheet</th>
      <th scope="col">Updated At</th>
      <th scope="col">Valid</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    {renderList(dataSheets, setdataSheets)}
  </tbody>
</table>
    </div>
  );
}

export default App;
