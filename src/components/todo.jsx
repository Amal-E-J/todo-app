import React, { useEffect } from 'react'
import './todo.css'
import { useState, useRef } from 'react';
import { IoMdDoneAll } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

export default function Todo() {
  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState([])
  const [editId, setEditId] = useState(0)

  const addTodo = () => {
    if (todo !== '') {
      setTodos([...todos, { list: todo, id: Date.now(), status: false }])
      console.log(todos)
      setTodo('')
    }
    if (editId) {
      const editTodo = todos.find((todo) => todo.id == editId)
      const updateTodo = todos.map((to) => to.id == editTodo.Id
      ? (to = {id : to.id, list:todo})
      : (to = {id : to.id, list:to.list}))
      setTodos(updateTodo)
      setEditId(0);
      setTodo('')
    }
  }

  const onDelete = (id) => {
    setTodos(todos.filter((to) => to.id !== id))
  }

  const onEdit = (id) => {
    const editTodo = todos.find((to) => to.id === id)
    setTodo(editTodo.list)
    setEditId(editTodo.id)
  }

  const onComplete = (id) => {
    let complete = todos.map((list) => {
      if (list.id === id) {
        return ({ ...list, status: !list.status })
      }
      return list
    })
    setTodos(complete)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const inputRef = useRef('');

  useEffect(() => {
    inputRef.current.focus();
  })

  return (
    <div className='container'>
      <h2>TODO APP</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={todo}
          ref={inputRef}
          onChange={(event) => setTodo(event.target.value)}
          placeholder='Enter your todo'
        />
        <button onClick={addTodo}>{editId ? 'EDIT' : 'ADD'}</button>
      </form>
      <div className='list'>
        <ul>
          {
            todos.map((to) => (
              <li className='list-items'>
                <div className='list-item-list'
                  id={to.status ? 'list-item' : ''}>
                  {to.list}</div>
                <span className='icon'>
                  <IoMdDoneAll id='complete'
                    onClick={() => onComplete(to.id)} />
                  <FiEdit id='edit'
                    onClick={() => onEdit(to.id)} />
                  <MdDelete id='delete'
                    onClick={() => onDelete(to.id)} />
                </span>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
}