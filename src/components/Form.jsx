import React, {  useEffect, useState } from 'react'

export default function Form() {

  

    return (
        <div>
            <h3>Lista de tarefas</h3>
            <input type="text" placeholder="Digite a tarefa" name='tarefa' onChange={(e) => setTarefa(e.target.value)} value={tarefa} autoFocus required></input>
            <button type='submit' onClick={addTarefa}>Adicionar</button>
            <h3>{tarefa}</h3>
        </div>
    )
}
