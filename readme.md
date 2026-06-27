https://roadmap.sh/projects/task-tracker
# Task Tracker CLI

A simple command line task tracker built with Node.js.
It helps you add, update, delete, mark, and list tasks using terminal commands.

## Features

* Add a new task
* Update an existing task
* Delete a task
* Mark a task as in progress
* Mark a task as done
* List all tasks
* List tasks by status: `todo`, `in-progress`, or `done`
* Store tasks in a `tasks.json` file

## Technologies Used

* Node.js
* File System Module
* JSON file for data storage

## Project Structure

```bash
task-tracker-cli/
│
├── task-cli.js
├── tasks.json
└── README.md
```

## How to Run

First, make sure Node.js is installed on your system.

Clone or download this project, then open the project folder in terminal.

Run commands using:

```bash
node task-cli.js <command>
```

## Commands

### Add a Task

```bash
node task-cli.js add "Buy groceries"
```

Example output:

```bash
Task added successfully (ID: 1)
```

### List All Tasks

```bash
node task-cli.js list
```

### List Tasks by Status

```bash
node task-cli.js list todo
node task-cli.js list in-progress
node task-cli.js list done
```

### Update a Task

```bash
node task-cli.js update 1 "Buy groceries and cook dinner"
```

### Delete a Task

```bash
node task-cli.js delete 1
```

### Mark a Task as In Progress

```bash
node task-cli.js mark-in-progress 1
```

### Mark a Task as Done

```bash
node task-cli.js mark-done 1
```

## Task Data Format

Tasks are stored inside `tasks.json` like this:

```json
[
  {
    "id": 1,
    "description": "Buy groceries",
    "status": "todo",
    "createdAt": "2026-06-27T10:30:00.000Z",
    "updatedAt": "2026-06-27T10:30:00.000Z"
  }
]
```

## Status Types

Each task can have one of these statuses:

```bash
todo
in-progress
done
```

## Example Usage

```bash
node task-cli.js add "Learn Node.js"
node task-cli.js add "Complete assignment"
node task-cli.js list
node task-cli.js mark-in-progress 1
node task-cli.js mark-done 2
node task-cli.js list done
```

## Notes

* The `tasks.json` file is created automatically if it does not exist.
* No external libraries are used.
* All data is stored locally in the project folder.
