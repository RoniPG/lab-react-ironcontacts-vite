import { useState } from "react";
import "./App.css";
import contacts from "./contacts.json"

function App() {
  const [producers, setContacts] = useState(contacts
    .filter((c, i) => i <= 4)
  )
  // const handleRandom = () => {
  //   const RandomIndex = Math.ceil(Math.random() * contacts.length)
  //   const contact = contacts.filter((c, i) => i === RandomIndex)
  //   producers.forEach(p => {
  //     if (p.id === contact.id) {
  //       handleRandom();
  //     } else {
  //       setContacts(contact.concat(producers));
  //     }
  //   })
  // }
  const handleRandom = () => {
    // Generar un índice aleatorio válido
    const randomIndex = Math.floor(Math.random() * contacts.length); 
  
    // Obtener el contacto aleatorio
    const contact = contacts[randomIndex];
  
    // Comprobar si ya existe en producers
    const exists = producers.some((p) => p.id === contact.id);
  
    if (!exists) {
      // Si no existe, agregarlo a contacts
      setContacts([contact, ...producers]);
    } else if (contacts.length > producers.length){
      // Si existe, intentar nuevamente
      handleRandom();
    } else {
      window.alert("Ya tienes todos los contactos importados")
    }
  };
  return (
    <div className="App">
      <h1>LAB | React IronContacts</h1>
      <button onClick={() => handleRandom()} className="mt-5" type="button">Add Random Contact</button>
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
