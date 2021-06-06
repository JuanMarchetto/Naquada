import React, { useState } from 'react'
import './app.css'
import { when } from "view-logics";

export function App(): React.ReactElement {
	const [url, setUrl] = useState("");
  const [response, setResponse] = useState("");
  const [HTTPMethod, setHTTPMethod] = useState("GET");
  const [body, setBody] = useState(undefined);
  const [headers, setHeaders] = useState(undefined);
  const [showOptions, setShowOptions] = useState(false);
  const getData = () => fetch(url, {method:HTTPMethod, body: JSON.stringify(body), headers})
    .then(response => response.json())
    .then(data => setResponse(JSON.stringify(data)));
  const input = "HTTPRequest";
  const output = "textarea";

  return when([
    [input === "HTTPRequest",
      <section>
        <div>
          <label>URL:</label>
          <input type="text" onChange={({target})=>setUrl(target.value)} />
        </div>
        <select value={HTTPMethod} onChange={({target})=>setHTTPMethod(target.value)}>
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="DELETE">DELETE</option>
          <option value="PUT">PUT</option>
          <option value="PATCH">PATCH</option>
        </select>
        <button onClick={getData}>{">"}</button>
        <div className="options-container">
          <span
            className="options-toggler"
            onClick={()=>setShowOptions(!showOptions)}
          >
            {showOptions ? "show less" : "show more"}
          </span>
          {showOptions && (
            <>
              <div>
                <label>Body:</label>
                <input type="text" onChange={({target})=>setBody(target.value)} />
              </div>
              <div>
                <label>headers:</label>
                <input type="text" onChange={({target})=>setHeaders(target.value)} />
              </div>
            </>
          )}
        </div>
      </section>
    ],
    [output === "textarea",
    <section>
      <span>Response:</span>
      <textarea value={response} readOnly />
    </section>
    ],
  ])
}