import React, { FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store'
import { TodoType, addNewTodo, changeStatus, deleteTodo, setTodoAsync } from './todoSlice';

interface IProps {}

/**
* @author
* @function @Todo
**/

export const Todo:FC<IProps> = (props) => {
    const [todoInput, setTodoInput] = useState('');
    const todo: TodoType[] = useSelector((state:RootState) => state.todo);
    const dispatch = useDispatch<AppDispatch>()
  return (
    <div>
        <h2>Todo List</h2>
           { todo.map((item) => 
           <div key={item.id}>
                <label>
                    <input
                    type='checkbox'
                    checked={item.completed}
                    onChange={() => {dispatch(changeStatus(item.id))}}
                    />
                    {item.title}
                    <button type='button' onClick={() => dispatch(deleteTodo(item.id))}>DELETE</button>
                </label>
            </div> 
            )
        }
       <input type='text' value={todoInput} onChange={(e) =>setTodoInput(e.target.value)} />
       <button type='button' onClick={() => dispatch(addNewTodo(todoInput))}>ADD NEW TODO</button>
       <button type='button' onClick={() => dispatch(setTodoAsync('https://jsonplaceholder.typicode.com/todos'))}>Fetch Todos</button>
    </div>
   )
 }
