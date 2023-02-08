import React, { useEffect, useState } from 'react'

export default function Form() {

    const [tarefa, setTarefa] = useState("");
    const [lista, setLista] = useState([]);

    useEffect(() => {
        if (localStorage.getItem("Lista_tarefas")) {
            const listaSalva = JSON.parse(localStorage.getItem("Lista_tarefas"));
            setLista(listaSalva);
        }
    }, []);

    const addTarefa = () => {
        if (tarefa.trim()) {
            const novaTarefa = { id: new Date().getTime().toString(), title: tarefa };
            setLista([...lista, novaTarefa]);
            localStorage.setItem("Lista_tarefas", JSON.stringify([...lista, novaTarefa]));
        }
    };
    return (
        <div>
            <form>
                <h3>Lista de tarefas</h3>
                <input type="text" placeholder="Digite a tarefa" name='tarefa' onChange={(e) => setTarefa(e.target.value)} value={tarefa} required></input>
                <button type='submit' onClick={addTarefa}>Adicionar</button>
            </form>
            {lista.map((tarefa) => (
                <div key={tarefa.id}>
                    <span>{tarefa.title}</span>               
                </div>
            ))}
        </div>
    )
}
