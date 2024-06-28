import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TodoList.css';

const TodoList = () => {
    const [todo, setTodo] = useState('');
    const [todos, setTodos] = useState([]);

    function create() {
        axios.post('http://localhost:5000/posting', { todo })
            .then(() => {
                alert('Data has been posted successfully');
                setTodo('');
            })
            .catch(() => {
                alert('Failed to post data');
            });
    }

    function getData() {
        axios.get('http://localhost:5000/getting')
            .then((response) => {
                setTodos(response.data);
            })
            .catch(() => {
                alert('Failed to retrieve data');
            });
    }

    const updatedTodo = (id, updatedData) => {
        axios.put(`http://localhost:5000/updating/${id}`, { todo: updatedData })
            .then(() => {
                console.log('Todo updated successfully');
                getData();
            })
            .catch((error) => {
                console.error('Failed to update todo:', error);
                alert('Failed to update todo');
            });
    };

    const handleEditButtonClick = (id) => {
        const newdata = prompt("Enter the new data");

        if (newdata === null || newdata.trim() === '') {
            alert("Please enter valid new data");
            return;
        }

        updatedTodo(id, newdata.trim());
    };

    function deleteTodo(id) {
        axios.delete(`http://localhost:5000/deleting/${id}`)
            .then(() => {
                getData();
            })
            .catch(() => {
                alert("Data cannot change");
            });
    }

    return (
        <div className="container">
            <div className="input-container">
                <input type="text" id="todo" value={todo} onChange={(e) => setTodo(e.target.value)} placeholder="Todo" className="input"/>
                <button onClick={create} className="button">Post</button>
                <button onClick={getData} className="button">Get All</button>
            </div>
            <ol className="todo-list">
                {todos.map((item) => (
                    <li key={item._id} className="todo-item">
                        {item.todo}
                        <button onClick={() => handleEditButtonClick(item._id)} className="button edit-button">Edit</button>
                        <button onClick={() => deleteTodo(item._id)} className="button delete-button">Delete</button>
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default TodoList;
