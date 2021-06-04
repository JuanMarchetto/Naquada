import {useState} from "react";

function App() {
  const [url, setUrl] = useState("");
  const [response, setResponse] = useState("");
  const [HTTPMethod, setHTTPMethod] = useState("GET");
  const getData = () => fetch(url, {method:HTTPMethod})
    .then(response => response.json())
    .then(data => setResponse(JSON.stringify(data)));

  return (
    <>
      <input type="text" onChange={({target})=>setUrl(target.value)} />
          <select value={HTTPMethod} onChange={({target})=>setHTTPMethod(target.value)}>
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="DELETE">DELETE</option>
            <option value="PUT">PUT</option>
            <option value="PATCH">PATCH</option>
          </select>
      <button onClick={getData}>{"|>"}</button>
      <textarea value={response}/>
    </>
  );
}

export default App;
