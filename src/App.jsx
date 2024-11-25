import { useState } from "react";
import "./App.css";
import contacts from "./contacts.json"

function App() {
  const [producers, setContacts] = useState(contacts
    .filter((c, i) => i <= 4)
  )
  return (
    <div className="App">
      <h1>LAB | React IronContacts</h1>
      <table className="table mt-5">
        <thead>
          <tr>
            <th scope="col">Picture</th>
            <th scope="col">Name</th>
            <th scope="col">Popularity</th>
            <th scope="col">Won an Oscar</th>
            <th scope="col">Won an Emmy</th>
          </tr>
        </thead>
        <tbody>
          {producers.map( p => (
            <tr key={p.id}>
              <td><img width ="75px" src={p.pictureUrl} alt={p.name} /></td>
              <td>{p.name}</td>
              <td>{p.popularity.toFixed(2)}</td>
              {p.wonOscar ? <td>🏆</td> : <td></td>}
              {p.wonEmmy ? <td>🌟</td> : <td></td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
