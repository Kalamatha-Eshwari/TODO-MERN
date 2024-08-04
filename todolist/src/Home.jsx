import React, { useEffect, useState } from 'react'
import Create from './Create'
import axios from 'axios'
import { BsCircleFill, BsFillTrashFill ,BsFillCheckCircleFill} from 'react-icons/bs';
import './App.css'; // Ensure this CSS file is imported


function Home() {
    const [todos , setTodos]=useState([])
    useEffect(()=>{
        axios.get('http://localhost:3001/get')
        .then(result => setTodos(result.data))
        .catch (err => console.log(err))
    }, [])

    const handleEdit = (id)=>{
        axios.put('http://localhost:3001/update/'+id)
        .then(result =>
            {
                location.reload()
            } )
        .catch (err => console.log(err))

    }
    const   handleDelete=(id)=>{
        axios.delete('http://localhost:3001/delete/'+id)
        .then(result =>
            {
                location.reload()
            } )
        .catch (err => console.log(err))
    }
  return (
    <div>
       <h2>TO-DO List</h2>
       <Create/>
       {
        todos.length===0
        ?
        <div><h2>No Record</h2></div>
        :
        todos.map((todo, index) => (
            <div key={index} className="task">
              <div className="checkbox" onClick={()=> handleEdit(todo._id)}>
                {todo.done?<BsFillCheckCircleFill className="icon"></BsFillCheckCircleFill>:
                <BsCircleFill className="icon" />}
                <p className={todo.done ? "line_through":""}>{todo.task}</p>
              </div>
              <div className="delete">
                <BsFillTrashFill
                  className="icon delete-icon" onClick={() => handleDelete(todo._id)}
                 
                />
              </div>
            </div>
          ))
       }
    </div>
  )
}

export default Home
