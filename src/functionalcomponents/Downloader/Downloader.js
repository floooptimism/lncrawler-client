class Downloader {
  constructor() {
    this.tasks = [
      {
        id: "https://lightnovel.world/book/1616/18.htmlhttps://lightnovel.world/content/1616/263863.html",
        novel: "https://lightnovel.world/book/1616/18.html",
        source: "https://lightnovel.world",
        type: "chaptercontent",
        url: "https://lightnovel.world/content/1616/263863.html",
      },
    ];
    this.worker = new Worker("Worker.js");
    this.currentTask = null;
  }

  setCurrentTask(task) {
    this.currentTask = task;
  }
  getCurrentTask() {
    return this.currentTask;
  }

  startWorker() {
    this.worker.postMessage({ type: "start" });
  }

  pauseWorker() {
    this.worker.postMessage({ type: "pause" });
  }

  sendTask() {
    this.worker.postMessage({ type: "download", task: this.tasks[0] });
  }

  addTask(task) {
    this.tasks.push(task);
    this.sendTask();
  }

  removeTask(task) {
    this.tasks.splice(
      this.tasks.findIndex((t) => t.id == task.id),
      1
    );
  }

  swapTasks(task1, task2) {
    let index1 = this.tasks.indexOf(task1);
    let index2 = this.tasks.indexOf(task2);

    this.tasks[index1] = task2;
    this.tasks[index2] = task1;
  }

  init() {
    this.worker.onmessage = (msg) => {
      switch (msg.data.type) {
        case "request":
          if (this.tasks.length > 0) {
            this.sendTask();
            break;
          }
          console.log("No more tasks!");
          break;
        case "fail":
          // this.removeTask(msg.data.task);
          break;
        case "success":
          console.log("Task ", msg.data.task, " completed!");
          console.log(msg.data)
          this.removeTask(msg.data.task);
          this.setCurrentTask(null);
          break;
        case "accepted": // worker is working on a task
          this.setCurrentTask(msg.data.task);
          break;
      }
    };
  }
}

module.exports = Downloader;
