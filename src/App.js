import React, { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([{ data: 'รอรับข้อมูล...' }]);

  const theApi = async () => {
    const rawResponse = await fetch("https://api.dev.farmbook.co/mbapi/test", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fn: "nodeJS" }),
    });
    const content = await rawResponse.json();
    return content;
  };

  const myPromises = [
    new Promise((resolve) => setTimeout(() => {resolve(theApi())}, 1000)),
    new Promise((resolve) => setTimeout(() => {resolve(theApi())}, 2000)),
    new Promise((resolve) => setTimeout(() => {resolve(theApi())}, 3000)),
    new Promise((resolve) => setTimeout(() => {resolve(theApi())}, 4000)),
    new Promise((resolve) => setTimeout(() => {resolve(theApi())}, 5000)),
  ];

  useEffect(async () => {
    const myData = await Promise.all(myPromises);
    setData(myData);
  }, []);

  console.log(data);

  return (
    <div>
      <ul>
        {data.map((items, index) => {
          return <li key={index}>{items.data}</li>;
        })}
      </ul>
    </div>
  );
}

export default App;
