import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';

import axios from 'axios';

import './TaskManager.css'; // Import your CSS file

const apiUrl = 'http://localhost:8000/tasks';

const isTaskDuplicate = (task, tasks) => {
  for (const existingTask of tasks) {
    if (
      existingTask.title.toLowerCase() === task.title.toLowerCase() &&
      existingTask.description.toLowerCase() === task.description.toLowerCase() &&
      existingTask.dueDate === task.dueDate
    ) {
      return true; // Duplicate task found
    }
  }
  return false; // No duplicate found
};

async function populateTasks() {
  try {
    const response = await axios.get(`${apiUrl}/`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    // console.log(response?.data?.tasks);
    return response?.data?.tasks;
  }
  catch (error) {
    console.error('Failed to fetch Ai', error);
    throw error;
  }
}

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    id: '',
    title: '',
    description: '',
    deadline: '',
  });
  // setTasks( populateTasks());
  const [showForm, setShowForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    // Sort tasks in ascending order by deadline
    populateTasks().then(tasks => {
      setTasks(tasks);
    });
    const sortedTasks = tasks.sort((a, b) => (a.deadline >= b.deadline ? 1 : -1));
    // console.log("Sroted tasks", sortedTasks);
    setTasks(sortedTasks);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleAddTask = async () => {
    if (isTaskDuplicate(newTask, tasks)) {
      alert('This task already exists.');
    }
    else {
      if (newTask.title.trim() !== '') {
        // const currentDate = new Date().toISOString().split('T')[0];
        // const threeMonthsLater = new Date();
        // threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);
        // const maxdeadline = threeMonthsLater.toISOString().split('T')[0];

        // if (newTask.deadline >= currentDate && newTask.deadline <= maxdeadline) {
        // console.log("newtask", newTask);
        const response = await axios.post(`${apiUrl}`, newTask, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          }
        })
        console.log(response.data.task);
        const task = response.data.task;
        setTasks([...tasks, task]);
        setNewTask({ title: '', description: '', deadline: '', id: '' });
        toggleForm();
        // } else {
        //   alert(
        //     'Please select a due date between the current date and 3 months from now.'
        //   );
        // }
      }
    }
  };

  const handleEditTask = (task) => {
    if (selectedTask && selectedTask._id === task._id) {
      setSelectedTask(null);
      setNewTask({ title: '', description: '', deadline: '', id: task._id });
      setShowForm(false);
    } else {
      setSelectedTask(task);
      setNewTask({
        title: task.title,
        description: task.description,
        deadline: task.deadline,
        id: task._id
      });
      setShowForm(true);
    }
  };

  const handleUpdateTask = async () => {

      if (newTask.title.trim() !== '') {
        // console.log("New task", newTask);
        const response = await axios.patch(
          `${apiUrl}/${newTask.id}`, newTask, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          }
        })
        console.log(response.data);
        //   const response = await fetch(`${API}/category/${userId}`, {
        //     method: "POST",
        //     headers: {
        //         Accept: "application/json",
        //         "Content-Type": "application/json",
        //         Authorization: `Bearer ${token}`
        //     },
        //     body: JSON.stringify(category)
        // })
        const updatedTask = { ...selectedTask, ...response.data.updatedTask };

        const updatedTasks = tasks.map((task) =>
          task._id === selectedTask._id ? updatedTask : task
        );
        setTasks(updatedTasks);
        setSelectedTask(null);
        setNewTask({ title: '', description: '', deadline: '', id: newTask.id });
        setShowForm(false);
    }
  };

  const handleRemoveTask = async (task) => {
    // console.log("de;e", task);
    const response = await axios.delete(
      `${apiUrl}/${task._id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    })
    // console.log(response.data.deletedId);
    const updatedTasks = tasks.filter((t) => t._id !== response.data.deletedId);
    setTasks(updatedTasks);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    setSelectedTask(null);
  };

  const toggleTaskDetails = (task) => {
    if (selectedTask === task) {
      setSelectedTask(null);
    } else {
      setSelectedTask(task);
    }
  };

  const getCardColor = (deadline) => {
    const today = new Date().getTime();
    const taskdeadline = new Date(deadline).getTime();
    const threeDaysFromNow = new Date();
    threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);
    const threeDaysFromNowTimestamp = threeDaysFromNow.getTime();

    if (taskdeadline < today) {
      return 'red-card';
    } else if (taskdeadline <= threeDaysFromNowTimestamp) {
      return 'yellow-card';
    } else {
      return 'green-card';
    }
  };

  // Group tasks by deadline and count the tasks in each group
  const groupedTasks = tasks.reduce((groups, task) => {
    const deadline = task.deadline;
    if (!groups[deadline]) {
      groups[deadline] = [];
    }
    groups[deadline].push(task);
    return groups;
  }, {});

  return (
    <div className="task-manager">
      <h2>Task Manager</h2>
      <div className="task-form">
        {showForm && (
          <>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={newTask.title}
              onChange={handleInputChange}
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={newTask.description}
              onChange={handleInputChange}
              required
            />
            <input
              type="date"
              name="deadline"
              placeholder="Due Date"
              value={newTask.deadline}
              onChange={handleInputChange}
              min={new Date().toISOString().split('T')[0]}
              showOnOpen={true}
              required
            />
            {selectedTask ? (
              <button onClick={handleUpdateTask}>Update Task</button>
            ) : (
              <button onClick={handleAddTask}>Add Task</button>
            )}
          </>
        )}
        <button onClick={toggleForm}>
          {showForm ? 'Cancel' : 'Add Task'}
        </button>
      </div>
      <div className="task-list-container">
        <h3>Added Tasks</h3>
        <div className="task-list">
          {Object.keys(groupedTasks).sort((a, b) => a.localeCompare(b)).map((deadline) => (
            <div key={deadline}>
              <h4>
                Due Date: {deadline.split("T")[0]} ({groupedTasks[deadline].length})
              </h4>
              {groupedTasks[deadline].sort((a, b) => a.deadline.localeCompare(b.deadline)).map((task) => (
                <div
                  key={deadline}
                  className={`faq-card ${selectedTask === task ? 'opened' : ''} ${getCardColor(
                    task.deadline
                  )}`}
                >
                  <div
                    className="faq-header"
                    onClick={() => toggleTaskDetails(task)}
                  >
                    <h3>{task.title}</h3>
                    <button onClick={() => toggleTaskDetails(task)}>
                      {selectedTask === task ? <FaAngleUp /> : <FaAngleDown />}
                    </button>
                    <div className="task-actions">
                      <button onClick={() => handleEditTask(task)}>
                        <FaEdit />
                      </button>
                      <button onClick={() => handleRemoveTask(task)}>
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  {selectedTask === task && (
                    <div className="faq-details">
                      <p className="description">{task.description}</p>
                      <p>Due Date: {task.deadline.split("T")[0]}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TaskManager;
