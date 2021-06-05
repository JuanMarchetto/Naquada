import React, { useState } from 'react'
import './app.css'
import { when } from "view-logics";

export function App(): React.ReactElement {
	const [url, setUrl] = useState("");
  const [response, setResponse] = useState("");
  const [HTTPMethod, setHTTPMethod] = useState("GET");
  const [body, setBody] = useState(undefined);
  const [headers, setHeaders] = useState(undefined);
  const getData = () => fetch(url, {method:HTTPMethod, body: JSON.stringify(body)})
    .then(response => response.json())
    .then(data => setResponse(JSON.stringify(data)));
  const input = "HTTPRequest";
  const output = "textarea";
  const showBody = true;
  const showheaders = false;

  return when([
    [input === "HTTPRequest",
      <section>
        <label>URL:
          <input type="text" onChange={({target})=>setUrl(target.value)} />
        </label>
        <select value={HTTPMethod} onChange={({target})=>setHTTPMethod(target.value)}>
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="DELETE">DELETE</option>
          <option value="PUT">PUT</option>
          <option value="PATCH">PATCH</option>
        </select>
        <button onClick={getData}>{">"}</button>
      </section>
    ],
    [showBody,
      <label>Body:
        <input type="text" onChange={({target})=>setBody(target.value)} />
      </label>
    ],
    [showheaders,
      <label>headers:
        <input type="text" onChange={({target})=>setHeaders(target.value)} />
      </label>
    ],
    [output === "textarea",
    <section>
      <label>Response:</label>
      <textarea value={response}/>
    </section>
    ],
  ])
}