import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';


const Form = () => {
    //Armazena o valor da nova tarefa e a lista de tarefas criadas
    const [tarefa, setTarefa] = useState("");
    const [lista, setLista] = useState([]);

    // Controla a exibição do Modal de confirmação de exclusão
    const [show, setShow] = useState(false);
    const [mostrarNoModal, setMostrarNoModal] = useState({ name: '' });

    // Controla se está sendo feita uma edição de tarefa e qual é o item a ser editado
    const [isAnEdit, setIsAnEdit] = useState(false);
    const [isEditItem, setIsEditItem] = useState(null);

    // Fecha o Modal de confirmação de exclusão
    const handleClose = () => setShow(false);

    // Abre o Modal de confirmação de exclusão
    const handleShow = () => setShow(true);

    // Carrega a lista de tarefas salva no LocalStorage quando o componente é montado
    useEffect(() => {
        if (localStorage.getItem('Lista_tarefas') !== null) {
            setLista(JSON.parse(localStorage.getItem('Lista_tarefas')))
        }
    }, []);
    const addTarefa = () => {

        // Verifica se o campo de adição de tarefa está vazio
        if (tarefa.trim()) {
            const novaTarefa = { id: new Date().getTime().toString(), name: tarefa };
            setLista([...lista, novaTarefa]);
            localStorage.setItem("Lista_tarefas", JSON.stringify([...lista, novaTarefa]));
            setTarefa('')
        }

    }

     // Remove uma tarefa da lista
    const deleteTarefa = (index) => {
        const deleteTarefa = lista.filter((value) => {
            return index !== value.id
        });
        setLista(deleteTarefa);
        localStorage.setItem("Lista_tarefas", JSON.stringify(deleteTarefa))
        handleClose()

    }

     // Abre o Modal de confirmação de exclusão e exibe as informações da tarefa correspondente
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

    // Prepara a interface para a edição de uma tarefa
    function openEditarTarefa(id) {
        const tarefaAtual = lista.find((item) => item.id === id);
        setTarefa(tarefaAtual.name);
        setIsAnEdit(true);
        setIsEditItem(id);
    }

    // Edita uma tarefa já existente na lista
    function editarTarefa(id) {
        // Verifica se o campo de edição de tarefa está vazio
        if (tarefa.trim() === '') {
          return;
        }
      
        const tarefaEditada = lista.map((item) => {
          if (item.id === id) {
            return { ...item, name: tarefa };
          }
          return item;
        });
      
        setLista(tarefaEditada);
        setIsAnEdit(false);
        setTarefa("");
        localStorage.setItem('Lista_tarefas', JSON.stringify(tarefaEditada));
      }

    return (
        <div>
            <form>
                <h3>Lista de tarefas</h3>
                <input type="text" placeholder="Digite a tarefa" name='tarefa'
                    onChange={(e) => setTarefa(e.target.value)} value={tarefa} required autoFocus></input>
                {isAnEdit ? (
                    <button className="btn btn-info" onClick={() => editarTarefa(isEditItem)}>Salvar Tarefa Editada</button>
                ) : (
                    <button onClick={addTarefa}>Adicionar</button>
                )}
            </form>
            <div>
                {
                    lista.map((tarefa) => {
                        return (
                            <div key={tarefa.id}>
                                <h3>{tarefa.name}</h3>
                                <div>
                                    <button type="button" className="btn btn-danger" onClick={() => modalConfirmacao(tarefa.id)}>excluir</button>
                                    <button type="button" className="btn btn-warning" onClick={() => openEditarTarefa(tarefa.id)}>Editar</button>
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