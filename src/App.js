import React, { useState, useEffect } from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const reponse = await api.post('repositories',
    {
      title: `Novo repositório ${Date.now()}`,
      owner: "Jhonatan de Oliveira",
      url: "https://github.com/jhonatanoliveira1"
    });

    const repository = reponse.data;

    setRepositories([...repositories, repository]);
  };

  async function handleRemoveRepository(id) {
    const repositoryIndex = repositories.findIndex(repository => repository.id === id);

    if(repositoryIndex => 0) {
      const repositoryList = [...repositories];
      
      repositoryList.splice(repositoryIndex, 1);
      
      setRepositories(repositoryList);

      await api.delete(`/repositories/${id}`);
    };
  };

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository =>
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
