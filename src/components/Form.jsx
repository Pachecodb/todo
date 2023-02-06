import React, {  useEffect, useState } from 'react'

export default function Form() {

    const [tarefa, setTarefa] = useState("");
    const [lista, setLista] = useState([]);

    useEffect(()=>{
        if(localStorage.getItem("Lista_tarefas")){
            const listaSalva = JSON.parse(localStorage.getItem("Lista_tarefas"));
            setLista(listaSalva);
        }
    },[])

    const addTarefa = () => {
        if (tarefa.trim()) {
          const novaTarefa = { title: tarefa };
          setLista([...lista, novaTarefa]);
          localStorage.setItem("Lista_tarefas", JSON.stringify([...lista, novaTarefa]));
          setTarefa("");
        }
      };

    return (
        <div>
            <h3>Lista de tarefas</h3>
            <input type="text" placeholder="Digite a tarefa" name='tarefa' id='id' onChange={(e) => setTarefa(e.target.value)} value={tarefa} autoFocus required></input>
            <button type='submit' onClick={addTarefa}>Adicionar</button>
            <h3>{tarefa}</h3>
        </div>
    )
}
