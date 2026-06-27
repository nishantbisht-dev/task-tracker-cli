const fs = require("fs");
const path = require("path");

// Path of tasks.json file
const filePath = path.join(__dirname, "tasks.json");

// Read terminal arguments
const args = process.argv.slice(2);

const command = args[0];
const firstInput = args[1];
const secondInput = args[2];

// Read tasks from tasks.json
function readTasks() {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
  }

  const data = fs.readFileSync(filePath, "utf-8");

  if (!data) {
    return [];
  }

  return JSON.parse(data);
}

// Save tasks into tasks.json
function saveTasks(tasks) {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
}

// Add new task
function addTask(description) {
  if (!description) {
    console.log("Please provide task description");
    return;
  }

  const tasks = readTasks();

  const newTask = {
    id: tasks.length === 0 ? 1 : tasks[tasks.length - 1].id + 1,
    description: description,
    status: "todo",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  tasks.push(newTask);
  saveTasks(tasks);

  console.log(`Task added successfully (ID: ${newTask.id})`);
}

// List tasks
function listTasks(status) {
  const tasks = readTasks();

  let filteredTasks = tasks;

  if (status) {
    const validStatuses = ["todo", "in-progress", "done"];

    if (!validStatuses.includes(status)) {
      console.log("Invalid status. Use todo, in-progress, or done.");
      return;
    }

    filteredTasks = tasks.filter((task) => task.status === status);
  }

  if (filteredTasks.length === 0) {
    console.log("No tasks found");
    return;
  }

  filteredTasks.forEach((task) => {
    console.log(`${task.id}. ${task.description} [${task.status}]`);
  });
}

// Update task description
function updateTask(id, newDescription) {
  if (!id || !newDescription) {
    console.log('Usage: node task-cli.js update 1 "New description"');
    return;
  }

  const tasks = readTasks();

  const task = tasks.find((task) => task.id === Number(id));

  if (!task) {
    console.log("Task not found");
    return;
  }

  task.description = newDescription;
  task.updatedAt = new Date().toISOString();

  saveTasks(tasks);

  console.log("Task updated successfully");
}

// Delete task
function deleteTask(id) {
  if (!id) {
    console.log("Usage: node task-cli.js delete 1");
    return;
  }

  const tasks = readTasks();

  const taskExists = tasks.some((task) => task.id === Number(id));

  if (!taskExists) {
    console.log("Task not found");
    return;
  }

  const updatedTasks = tasks.filter((task) => task.id !== Number(id));

  saveTasks(updatedTasks);

  console.log("Task deleted successfully");
}

// Mark task status
function markTask(id, status) {
  if (!id) {
    console.log("Please provide task id");
    return;
  }

  const tasks = readTasks();

  const task = tasks.find((task) => task.id === Number(id));

  if (!task) {
    console.log("Task not found");
    return;
  }

  task.status = status;
  task.updatedAt = new Date().toISOString();

  saveTasks(tasks);

  console.log(`Task marked as ${status}`);
}

// Command handling
switch (command) {
  case "add":
    addTask(firstInput);
    break;

  case "list":
    listTasks(firstInput);
    break;

  case "update":
    updateTask(firstInput, secondInput);
    break;

  case "delete":
    deleteTask(firstInput);
    break;

  case "mark-in-progress":
    markTask(firstInput, "in-progress");
    break;

  case "mark-done":
    markTask(firstInput, "done");
    break;

  default:
    console.log("Invalid command");
    console.log("Available commands:");
    console.log('node task-cli.js add "Task description"');
    console.log("node task-cli.js list");
    console.log("node task-cli.js list todo");
    console.log("node task-cli.js list in-progress");
    console.log("node task-cli.js list done");
    console.log('node task-cli.js update 1 "New description"');
    console.log("node task-cli.js delete 1");
    console.log("node task-cli.js mark-in-progress 1");
    console.log("node task-cli.js mark-done 1");
}