class Downloader {
  constructor() {
    this.tasks = [
    ];

    // Status -> downloading = 1 , pending = 0
    this.tasksHash = {
    };

    this.worker = new Worker("Worker.js");
    this.currentTask = this.tasks[0];
    this.running = false;

    // * callbacks
    this.successCallback = function () {};
    this.failCallback = function () {};
    this.currentTaskChangedCallback = function() {};

    window.tasks = this.tasks;
    window.hashes = this.tasksHash;
  }

  //* Getters and Setters ********************
  setSuccessCallback(callback) {
    this.successCallback = callback;
  }
  setFailCallback(callback) {
    this.failCallback = callback;
  }
  setCurrentTaskCallback(callback){
    this.currentTaskChangedCallback = callback;
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

  getTasksHashTable(){
    return this.tasksHash;
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
    if(this.tasksHash[task.id]){
      this.sendTask();
      return;
    }
    this.tasks.push(task);
    this.tasksHash[task.id] = { idx: this.tasks.length - 1, status: 0 };
    this.sendTask();
  }

  bulkAddTask(tasks){
    let validTasks = tasks.filter( (task) => {
      return !this.tasksHash[task.id];
    })
    if(validTasks.length <= 0){
      this.sendTask();
      return;
    }

    for(var task of validTasks){
      this.tasks.push(task);
      this.tasksHash[task.id] = { idx: this.tasks.length - 1, status: 0 };
    }

    this.sendTask();
  }

  removeTask(task) {
    if(this.tasksHash[task.id]){
        this.tasks.splice(
          this.tasksHash[task.id].idx,
          1
        );
        delete this.tasksHash[task.id];
        
        // recalculate indices
        let count = 0;
        for(var t of this.tasks){
          this.tasksHash[t.id].idx = count++;
        }
    }
  }

  bulkRemoveTask(tasks) {
    tasks.forEach((task) => {
      this.removeTask(task);
    });
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
          console.log("SUCCESS TASK");
          this.removeTask(msg.data.task);
          this.setCurrentTask(null);
          this.successCallback({
            task: msg.data.task,
            result: msg.data.result
          });
          this.currentTaskChangedCallback();
          break;
        case "accepted": // worker is working on a task
          this.setCurrentTask(msg.data.task);
          this.currentTaskChangedCallback();
          break;
        default:
          break;
      }
    };
  }
}

let downloader = new Downloader();
downloader.init();
downloader.startWorker();


export default downloader;
