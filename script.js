class Task {
  constructor(name, priority) {
    this.name = name;
    this.priority = priority;
  }
}

class TaskScheduler {
  constructor() {
    this.queue = [];
  }

  addTask(task) {
    this.queue.push(task);

    this.updateTaskQueue();
  
  }

  removeTask() {
    if (this.queue.length === 0) {
      console.log("Task queue is empty.");
      return;
    }

    let highestPriorityIndex = 0;
    let highestPriority = this.queue[0].priority;

    for (let i = 1; i < this.queue.length; i++) {
      if (this.queue[i].priority > highestPriority) {
        highestPriorityIndex = i;
        highestPriority = this.queue[i].priority;
      }
    }

    const removedTask = this.queue.splice(highestPriorityIndex, 1)[0];
    console.log(`Removed task: ${removedTask.name}`);
    this.updateTaskQueue();
  }

  executeTask() {
    if (this.queue.length === 0) {
      console.log("Task queue is empty.");
      return;
    }

    let highestPriorityIndex = 0;
    let highestPriority = this.queue[0].priority;

    for (let i = 1; i < this.queue.length; i++) {
      if (this.queue[i].priority > highestPriority) {
        highestPriorityIndex = i;
        highestPriority = this.queue[i].priority;
      }
    }
    /*if(highestPriority.length ===1){
      return this.queue.shift();
    }*/

    const executedTask = this.queue.shift();
    console.log(`Executing task : ${executedTask.name}`);
    this.updateTaskQueue();
  }

  updateTaskQueue() {
    const taskQueueElement = document.getElementById('taskQueue');
    taskQueueElement.innerHTML = '<h3>Task Queue:</h3>';
    if (this.queue.length === 0) {
      const emptyMessage = document.createElement('p');
      emptyMessage.textContent = 'Task queue is empty.';
      taskQueueElement.appendChild(emptyMessage);
    } else {
      for (const task of this.queue) {
        const taskItem = document.createElement('p');
        //this.priority.sort((a,b)=>a-b);
        taskItem.textContent = `Task: ${task.name} (Priority: ${task.priority})`;
        taskQueueElement.appendChild(taskItem);
      }
    }
  }
}

const scheduler = new TaskScheduler();

function addTask() {
  const taskName = document.getElementById('taskName').value;
  const taskPriority = parseInt(document.getElementById('taskPriority').value);

  if (!taskName || !taskPriority) {
    console.log("Please enter a valid task name and priority.");
    return;
  }

  const task = new Task(taskName, taskPriority);
  scheduler.addTask(task);

  // Clear input fields
  document.getElementById('taskName').value = '';
  document.getElementById('taskPriority').value = '';
}

function removeTask() {
  scheduler.removeTask();
}

function executeTask() {
  scheduler.executeTask();
}
