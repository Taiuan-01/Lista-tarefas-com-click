import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Erro ao buscar as tarefas:", error));

    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Erro ao buscar os usuários:", error));
  }, []);

  const getUserName = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.name : "Usuário desconhecido";
  };

  const completeTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: true } : task
      )
    );
  };

  const completedTasks = tasks.filter((task) => task.completed);
  const pendingTasks = tasks.filter((task) => !task.completed);

  return (
    <div className="container">
      <h1>Lista de Tarefas</h1>

      {}
      <div className="tarefas-container">
        {}
        <div className="tarefas-completas">
          <h2>Tarefas Completas</h2>
          {completedTasks.map((task) => (
            <div key={task.id} className="task">
              <p>
                <strong>Usuário:</strong> {getUserName(task.userId)}
              </p>
              <p>
                <strong>Tarefa:</strong> <strike>{task.title}</strike>
              </p>
            </div>
          ))}
        </div>

        {}
        <div className="tarefas-pendentes">
          <h2>Tarefas Pendentes</h2>
          {pendingTasks.map((task) => (
            <div
              key={task.id}
              className="task"
              onClick={() => completeTask(task.id)}
              style={{ cursor: "pointer" }}
            >
              <p>
                <strong>Usuário:</strong> {getUserName(task.userId)}
              </p>
              <p>
                <strong>Tarefa:</strong> {task.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
