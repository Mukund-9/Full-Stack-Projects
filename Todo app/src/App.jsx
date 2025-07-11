import { useState,useEffect } from 'react'

import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

function App() {

  const [todo,setTodo]=useState("")
  const [todos,setTodos]=useState([])
  const [showFinished,setshowFinished]=useState(true);
  useEffect(()=>{
    let todoString=localStorage.getItem("todos");
    if(todoString){
      let todos=JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);

    }
    
  },[])

  const saveTodos=()=>{
    localStorage.setItem("todos",JSON.stringify(todos));
  }  
  const toggleFinished=(e)=>{
    setshowFinished(!showFinished)

  }
  const handleEdit=(e,id)=>{
    let t=todos.filter(i=>i.id===id)
    setTodo(t[0].todo);
    let newTodos=todos.filter(item=>{
      return item.id!=id;
    })
    setTodos(newTodos);
    saveTodos();
  }

  const handleDelete=(e,id)=>{
    let newTodos=todos.filter(item=>{
      return item.id!=id;
    })
    setTodos(newTodos);
    saveTodos();

  }

  const handleAdd=()=>{
    setTodos([...todos,{id:uuidv4(),todo,isCompleted:false}])
    setTodo("")
    saveTodos();

  }

  const handleChange=(e)=>{
    setTodo(e.target.value)
  }

  const handleCheckbox=(e)=>{
    let id=e.target.name;
    let index=todos.findIndex(item=>{
      return item.id===id;
    })
    let newTodos=[...todos];
    newTodos[index].isCompleted=!newTodos[index].isCompleted;
    setTodos(newTodos);
    saveTodos();

  }
  return (
    <>
      <Navbar />
      <div className="w-full container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-1/2 shadow-black shadow-2xl">
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-lg font-bold md:text-2xl'>Add a Todo</h2>
          <input onChange={handleChange} type="text" className='w-full rounded-lg px-5 py-1' value={todo} placeholder='length of your todo must be greater than 3' />
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 font-bold text-sm disabled:bg-violet-500 text-white rounded-full cursor:pointer'>Add</button>
        </div>
        <input type="checkbox" onChange={toggleFinished} checked={showFinished} />Show Finished
        <div className='h-1 bg-black my-2 opacity-15 w-(90%) mx-auto'></div>
        <h2 className='text-lg font-bold md:text-2xl'>Your Todos</h2>
        <div className="todos ">
          {todos.length===0 && <div className='m-5'>No Todos to display</div>}
          {todos.map(item=>{

          
          return (showFinished|| !item.isCompleted) && <div key={item.id} className="todo flex justify-between my-3 w-full">
            <div className="flex gap-5">
            <input onChange={handleCheckbox} name={item.id} type="checkbox" checked={item.isCompleted} value={item.isCompleted} />
              <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e)=>{handleEdit(e,item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 font-bold text-sm text-white rounded-md mx-1 '><FaEdit />
                </button>
                <button onClick={(e)=>{ handleDelete(e,item.id) }}  className='bg-violet-800 hover:bg-violet-950 p-2 py-1 font-bold text-sm text-white rounded-md mx-1'><AiFillDelete /></button>
            </div>
          
          </div>
          })}
        </div>

      </div>
    </>
  )
}

export default App
