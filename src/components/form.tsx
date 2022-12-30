import { useState } from 'react'
import Link from 'next/link';

export default function TaskForm({initialValues = {}}) {

  const [name, setName] = useState(initialValues.name || "");
  const [description, setDescription] = useState(initialValues.description || "");
  const [author, setAuthor] = useState(initialValues.author || "");

  const onSubmitHandler = async function (event) {
    event.preventDefault();
    const method = initialValues.id ? "put" : "post";
    let url = "http://localhost:4000/task"
    if ( initialValues.id ) {
      url += `/${initialValues.id}`;
    }
    const response = await fetch(url, {
      method: method,
      body: JSON.stringify({
      name,
      description,
      author,
      }),
      headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
    });
    const task = await response.json();
    if ( !initialValues.id ) {
      location.href = `/task/${task.data.id}`;
    } else {
      setName(task.data.name);
      setDescription(task.data.description);
      setAuthor(task.data.author);
    }
  }

  return (
    <>
      <h1>Agregar tarea</h1>
      <h2><Link href="/">Inicio</Link></h2>
      <form onSubmit={onSubmitHandler}>
        <p><label htmlFor="">Nombre</label><input name="name" type="text" onChange={(e) => setName(e.target.value)} value={name} /></p>
        <p><label htmlFor="">Descripción</label><input name="description" type="text" onChange={(e) => setDescription(e.target.value)} value={description} /></p>
        <p><label htmlFor="">Autor</label><input name="author" type="text" onChange={(e) => setAuthor(e.target.value)} value={author} /></p>
        <button type="submit">Enviar</button>
      </form>
    </>
  )
}