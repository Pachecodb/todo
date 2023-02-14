import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';



const Form = () => {

    const [tarefa, setTarefa] = useState("");
    const [lista, setLista] = useState([]);
    const [show, setShow] = useState(false);
    const [mostrarNoModal, setMostrarNoModal] = useState({ name: '' });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        if (localStorage.getItem("Lista_tarefas")) {
            const listaSalva = JSON.parse(localStorage.getItem("Lista_tarefas"));
            setLista(listaSalva);
        }
    }, []);
    const addTarefa = () => {
        if (tarefa.trim()) {
            const novaTarefa = { id: new Date().getTime().toString(), name: tarefa };
            setLista([...lista, novaTarefa]);
            localStorage.setItem("Lista_tarefas", JSON.stringify([...lista, novaTarefa]));
        }
    };
    const deleteTarefa = (index) => {
        const deleteTarefa = lista.filter((value) => {
            return index !== value.id
        });
        setLista(deleteTarefa);
        localStorage.setItem("Lista_tarefas", JSON.stringify(deleteTarefa))
        handleClose()
    
    }
    const modalConfirmacao = (index) => {
        let modal = lista.find((value) => {
            return index === value.id
        });
        handleShow();
        setMostrarNoModal(modal);
    }

    const handleClear = () => {
        setLista([]);
        localStorage.removeItem("Lista_tarefas");
    }

    return (
        <div>
            <form>
                <h3>Lista de tarefas</h3>
                <input type="text" placeholder="Digite a tarefa" name='tarefa'
                    onChange={(e) => setTarefa(e.target.value)} value={tarefa} required autoFocus></input>
                <button type='submit' onClick={addTarefa}>Adicionar</button>
            </form>
            <div>
                {
                    lista.map((tarefa) => {
                        return (
                            <div key={tarefa.id}>
                                <h3>{tarefa.name}</h3>
                                <div>
                                    <button type="button" className="btn btn-danger" onClick={() => modalConfirmacao(tarefa.id)}>excluir</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title> Voce realmente deseja excluir esta tarefa? Essa ação sera ireversivel.</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <h3>Tarefa: {mostrarNoModal.name}</h3>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Fechar</Button>
                    <Button variant="danger" onClick={() => deleteTarefa(mostrarNoModal.id)}>Excluir</Button>
                </Modal.Footer>
            </Modal>
            <div>
                <button className="btn btn-secondary  mt-4 mb-4" onClick={() => handleClear()}>
                    Limpar
                </button>
            </div>
        </div>
    )
}

export default Form;