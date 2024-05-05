import React, { useState, useEffect } from "react";

function TaskInput() {
  const storeTask = () => {
    let data = localStorage.getItem("todo");
    let json = JSON.parse(data);
    if (json) {
      return json;
    }
    return [];
  };

  const [todo, setTodo] = useState(storeTask());

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todo));
  }, [todo]);

  const [error, setError] = useState("");
  const [edit, setEdit] = useState({ index: null, value: "" });
  const [taskCount, setTaskCount] = useState(todo.length);

  const handleSubmit = (e) => {
    e.preventDefault();
    let task = e.target.task.value; // target->input field whereever target is written


    if (task == "" && !task) {
      // Set the error state to your error message
      setError("Please Enter a Task");
      // alert("Please enter a task");
      return;
    }
    
      // If the task is not empty, reset the error state and proceed as usual
      setError("");
      setTodo([...todo, {task:task, completed:false}]);
      setTaskCount(taskCount + 1);
      // alert(`new task ${task}`);
      e.target.reset(); // after click ok of alert box it will reset input field

    
  };

  function TaskStatus(index) {
    let newTask = [...todo];
    newTask[index].completed = !newTask[index].completed;
    setTodo(newTask);
  }
  function TaskDelete(index) {
    let newTask = [...todo];
    newTask.splice(index, 1);
    setTodo(newTask);
    setTaskCount(taskCount - 1);
  }

  function TaskEdit(index) {
    setEdit({ index, value: todo[index].task });
  }

  function saveTask(e) {
    e.preventDefault();
    if (edit.value) {
      let updatedTasks = [...todo];
      updatedTasks[edit.index].task = edit.value;
      setTodo(updatedTasks);
      setEdit({ index: null, value: "" });
    }
  }

  return (
    <div className="container my-5">
      {/* <div className="row"> */}
      <div
        className="col-sm mx-auto rounded p-4 shadow-lg p-3 mb-10 rounded custom-card"
        style={{ color: "#fff", width: "600px", backgroundColor: "#040449"}}>
        <h2 className="text-center mb-5" style={{ fontFamily: "monoton" }}>
          To-do List
        </h2>
        <form className="d-flex" onSubmit={handleSubmit}>
          <input
            className="form-control me-2 list"
            type="text"
            placeholder="Enter A Task..."
            name="task"
          />
          <button
            className="btn"
            style={{ backgroundColor: "black", color: "yellow" }}
            type="submit">Add</button>
        </form>
        {/* Display the error message conditionally */}
        {error && <div style={{ color: "red",fontFamily:"Inter",fontSize:"20px",fontWeight:"200" }}>{error}</div>}
  
        <div className="mt-2 listView" style={{ color: "yellow" }}>
          <p>You have to Complete {taskCount} Tasks</p>
        </div>

        {todo.map((todo, index, taskObj) => {
          return (
            <div
              key={index}
              className="rounded mt-4 p-2 d-flex listView"
              style={{
                color: "darkblue",
                fontFamily: "Inter",
                textTransform: "capitalize",
                fontWeight: "800",
                fontSize: "18px",
                backgroundColor: todo.completed ? "cyan" : "LightGray",
              }}
            >
              {/* display task */}
              <div className="me-auto">
                {/* me->marginend, me-auto or p-1 */}
                <i
                  className={
                    "h5 me-3 check" +
                    (todo.completed
                      ? "bi bi-check-circle-fill"
                      : "bi bi-circle")
                  }
                  style={{
                    fontSize: "20px",
                    fontWeight: "800",
                    cursor: "pointer",
                    textDecoration: "line-through",
                  }}
                  onClick={() => TaskStatus(index)}
                ></i>
                {todo.task}
              </div>
              <div>
                {/* me->marginend, me-auto or p-1 */}
                {edit.index === index ? (
                  <form onSubmit={saveTask}>
                    <input
                      type="text"
                      value={edit.value}
                      onChange={(e) =>
                        setEdit({ ...edit, value: e.target.value })
                      }
                    />
                  </form>
                ) : (
                  <span>{taskObj.task}</span>
                )}

                <i
                  className="bi bi-pencil-square text-dark h5 me-3"
                  style={{ cursor: "pointer", fontWeight: "800" }}
                  onClick={() => TaskEdit(index)}
                ></i>
                <i
                  className="bi bi-trash-fill text-danger h5"
                  style={{ cursor: "pointer", fontWeight: "800" }}
                  onClick={() => TaskDelete(index)}></i>
              </div>
            </div>
          );
        })}

      </div>
    {/* </div> */}
    </div>
  );
}

export default TaskInput;
