import React, { useState, useEffect } from "react"
import logo from "./logo.svg"
import "./App.css"

// import { Bootstrap, Grid, Row, Col, Container, Button } from "react-bootstrap"

function App() {
  
  const [values , setValues] = useState({
    newTask : "",
    taskList : []

  })

  const {newTask , taskList} = values


  const preload = () => {
    console.log("EXECUTING PRELOAD")
    const list = JSON.parse(localStorage.getItem("taskList"))
    if(list){
      setValues({...values, taskList : list})
    }else{
      setValues({...values, taskList : []})
    }
  }

  useEffect(()=>{
    preload()
  },[])


  const addTask = (e) => {
    let todoValue = newTask
    if (todoValue !== "") {
      const newTask = {
        id: Date.now(),
        value: todoValue,
        isDone: false
      }
      const list = taskList
      list.push(newTask)

      setValues({...values, taskList : list , newTask : ""})
      localStorage.setItem("taskList" , JSON.stringify(taskList))
    }
  }

  const deleteTask = (id) => {
    const list = taskList
    const updatedlist = list.filter((item) => item.id !== id)
    setValues({...values, taskList: updatedlist })
    localStorage.setItem("taskList",JSON.stringify(updatedlist))
  }

  const doneTask = (id) => {
    const list = taskList
    const task = list.filter((item) => item.id == id)
    task[0].isDone = true
    const updatedList = list.filter((item) => item.id !== id)
    updatedList.push(task[0])
    setValues({ ...values , taskList: updatedList })
    localStorage.setItem("taskList",JSON.stringify(updatedList))
  }

  const undoTask = (id) => {
    const list = taskList
    const task = list.filter((item) => item.id == id)
    task[0].isDone = false
    const updatedList = list.filter((item) => item.id !== id)
    updatedList.push(task[0])
    setValues({ ...values , taskList: updatedList })
    localStorage.setItem("taskList",JSON.stringify(updatedList))
  }

  const updateInput = (e) => {
    setValues({...values, newTask : e.target.value})
  }

  const clearAllTasks = () => {
    setValues({...values,newTask: "" , taskList : []})
    localStorage.removeItem("taskList")
  }

 
    return (
      <div>
        <div className="container bg-dark pb-5">
          <div className="row">
            <div className="col-md-6 offset-md-3 text-center text-white p-5">
              <h2>TODO APP</h2>
              <br />
              <input
                className="form-control form-control-lg"
                type="text"
                required
                onChange={(e) => updateInput(e)}
                placeholder="Write the task over here!!"
                value={newTask}
              />
              <br />
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => addTask()}
              >
                Add Task
              </button>
              <br/><br/>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => clearAllTasks()}
              >
                CLear All Tasks!!!
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-6 text-center">
              <div className="card">
                <h4 className="card-header bg-dark  text-white">TASK TODO</h4>
                <ul className="list-group">
                  {taskList.map((item, index) => {
                    if (!item.isDone) {
                      return (
                        <li key={index} className="list-group-item">
                          {item.value}
                          <button
                            type="button"
                            className="btn btn-success"
                            onClick={(e) => doneTask(item.id)}
                          >
                            Done Task
                          </button>{" "}
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => deleteTask(item.id)}
                          >
                            Delete Task
                          </button>
                        </li>
                      )
                    }
                  })}
                </ul>
              </div>
            </div>
            <div className="col-6 text-center">
              <div className="card">
                <h4 className="card-header bg-dark text-white">TASK DONE</h4>
                <ul className="list-group">
                  {taskList.map((item, index) => {
                    if (item.isDone) {
                      return (
                        <li key={index} className="list-group-item">
                          {item.value}
                          <button
                            type="button"
                            className="btn btn-info"
                            onClick={(e) => undoTask(item.id)}
                          >
                            Undo Task
                          </button>
                        </li>
                      )
                    }
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  
}

export default App
