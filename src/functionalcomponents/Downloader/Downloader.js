class Downloader {
  constructor() {
    this.tasks = [
      {
        id: "https://lightnovel.world/book/1616/18.htmlhttps://lightnovel.world/content/1616/263863.html",
        name: "Chapter 1",
        novel: "https://lightnovel.world/book/1616/18.html",
        source: "https://lightnovel.world",
        type: "chaptercontent",
        url: "https://lightnovel.world/content/1616/263863.html",
      },
    ];

    // Status -> downloading = 1 , pending = 0
    this.tasksHash = {
      "https://lightnovel.world/book/1616/18.htmlhttps://lightnovel.world/content/1616/263863.html": { idx: 0, status: 0}
    };

    this.worker = new Worker("Worker.js");
    this.currentTask = this.tasks[0];
    this.running = false;

    // * callbacks
    this.successCallback = function () {};
    this.failCallback = function () {};
  }

  //* Getters and Setters ********************
  setSuccessCallback(callback) {
    this.successCallback = callback;
  }
  setFailCallback(callback) {
    this.failCallback = callback;
  }

  setCurrentTask(task) {
    this.currentTask = task;
  }
  getCurrentTask() {
    return this.currentTask;
  }

  getTaskList(){
    return this.tasks;
  }

  setIsrunning(isRunning) {
    this.running = isRunning;
  }
  isRunning() {
    return this.running;
  }
  // *****************************************

  startWorker() {
    this.worker.postMessage({ type: "start" });
    this.setIsrunning(true);
  }

  pauseWorker() {
    this.worker.postMessage({ type: "pause" });
    this.setIsrunning(false);
  }

  sendTask() {
    this.worker.postMessage({ type: "download", task: this.tasks[0] });
  }

  addTask(task) {
    this.tasks.push(task);
    this.tasksHash[task.id] = { idx: this.tasks.length - 1, status: 0 };
    this.sendTask();
  }

  removeTask(task) {
    this.tasks.splice(
      this.tasksHash[task.id].idx,
      1
    );
    delete this.tasksHash[task.id];
  }

  swapTasks(task1, task2) {
    let idx1 = this.tasksHash[task1.id].idx;
    let idx2 = this.tasksHash[task2.id].idx;

    this.tasks[idx1] = task2;
    this.tasks[idx2] = task1;

    this.tasksHash[task1.id].idx = idx2;
    this.tasksHash[task2.id].idx = idx1;
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
          this.failCallback();
          break;
        case "success":
          console.log("Task ", msg.data.task, " completed!");
          console.log(msg.data)
          this.removeTask(msg.data.task);
          this.setCurrentTask(null);
          this.successCallback();
          break;
        case "accepted": // worker is working on a task
          this.setCurrentTask(msg.data.task);
          break;
        default:
          break;
      }
    };
  }
}

let downloader = new Downloader();
downloader.init();

export default downloader;
