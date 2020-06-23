import React,{useState, useEffect} from 'react'

import axios from 'axios'

const baseURL = "http://localhost:61952/getData";
const saveDataSheetURL = "http://localhost:61952/upload";

async function saveUrl(id, url){
  var bodyFormData = new FormData();
  bodyFormData.set("sheetURL", url);
  const result = await axios({
    method:"POST",
    url: `${saveDataSheetURL}/${id}`,
    data:bodyFormData
  }); 
  console.log(result); 
}

function renderList(dataSheets){
    if(dataSheets)
    return dataSheets.map((dataSheet) => {
        return (         
          <tr className="" key={dataSheet.dataSheetId}>
            <td>{dataSheet.productId}</td>
            <td>{dataSheet.supplierId}</td>
            <td>{dataSheet.dataSheetUrl}</td>
            <td>{dataSheet.updatedAt}</td>
            <td>{dataSheet.isValid? "Valid":""}</td>
            <td><button onClick={()=>saveUrl(dataSheet.dataSheetId, dataSheet.dataSheetUrl)} >Save</button></td>
          </tr>
        );
      });
    return <div>No dataSheets Found</div>;
}


function App() {
  let [dataSheets, setdataSheets] = useState([]);
  useEffect(()=>{
    async function getdataSheets(){
      const result = await axios.get(baseURL);  
      setdataSheets(result.data);
    }
    getdataSheets();
  },[]);

  
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
    {renderList(dataSheets)}
  </tbody>
</table>
    </div>
  );
}

export default App;
