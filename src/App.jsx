import { useState } from "react";
import "./App.css";
import contacts from "./contacts.json"

function App() {
  const [producers, setContacts] = useState(contacts
    .filter((contact, index) => index <= 4)  //Get firs 5 contacts
  )
  // const handleRandom = () => {
  //   const RandomIndex = Math.ceil(Math.random() * contacts.length) //-->Floor
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

    // Comrobar si ya existeen producers
    const exists = producers.some((p) => p.id === contact.id);

    if (!exists) {
      // Si no existe, agregarlo a contacts
      setContacts([contact, ...producers]);
    } else if (contacts.length > producers.length) {
      // Si existe, intentar nuevamente
      handleRandom();
    } else {
      window.alert("Ya tienes todos los contactos importados")
    }
  };
  const handleSortPopularity = () => {
    const copyArray = Array.from(producers);
    const contactsByPopularity = copyArray.sort((producerA, producerB) => (
      producerB.popularity - producerA.popularity
    ));
    setContacts(contactsByPopularity);
  }
  const handleSortName = () => {
    const copyArray = Array.from(producers);
    const contactsByName = copyArray.sort((producerA, producerB) => (
      producerA.name.localeCompare(producerB.name)
    ));
    setContacts(contactsByName);
  }
  // const handleDelete = (event) => {
  const handleDelete = (id) => {
    const deleteFilter = producers.filter((p) => (
      p.id !== id // p.id !== event.target.id 
    ))
    setContacts(deleteFilter);
  }

  return (
    <div className="App">
      <h1>LAB | React IronContacts</h1>
      <div className="d-flex container gap-2">
        <button onClick={() => handleRandom()} className="mt-5" type="button">Add Random Contact</button>
        <button onClick={() => handleSortPopularity()} className="mt-5" type="button">Sort by popularity</button>
        <button onClick={() => handleSortName()} className="mt-5" type="button">Sort by name</button>
      </div>
      <table className="table mt-5">
        <thead>
          <tr>
            <th scope="col">Picture</th>
            <th scope="col">Name</th>
            <th scope="col">Popularity</th>
            <th scope="col">Won an Oscar</th>
            <th scope="col">Won an Emmy</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {producers.map(p => (
            <tr key={p.id}>
              <td><img width="75px" src={p.pictureUrl} alt={p.name} /></td>
              <td>{p.name}</td>
              <td>{p.popularity.toFixed(2)}</td>
              {p.wonOscar ? <td>🏆</td> : <td></td>}
              {p.wonEmmy ? <td>🌟</td> : <td></td>}
              {/* Opción idonea */}
              <td><button name="Delete" id={p.id} onClick={() => handleDelete(p.id)} className="mt-5" type="button">Delete</button></td> {/**Opción  onClick={(event) => handleDelete(event)}*/}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
