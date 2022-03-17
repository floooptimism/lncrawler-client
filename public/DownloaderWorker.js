// Request boy
self.importScripts("DownloaderWorkerRequest.js");


function getQueryString(type, p1,p2){
  const api = {
    "chaptercontent": "https://lncrawler.azurewebsites.net/chaptercontent?",
    "chaptermeta" :"https://lncrawler.azurewebsites.net/chapters?",
  }
  const param = {
    "chaptercontent": "chapterURL",
    "chaptermeta" :"novelURL",
  }

  let query = api[type] + `scraperSource=${p1}&${param[type]}=${p2}`;
  return query;
}

class DownloaderWorker {
  constructor() {
    this.state = "paused"; // states -> "idle", "working", "paused"
    this.callMeToAbortDownload = null;
  }

  cancelDownload() {
    if(this.callMeToAbortDownload) {
      console.log("Called the abort function");
      this.callMeToAbortDownload.abort();
      this.callMeToAbortDownload = null;
    }
  }

  getState() {
    return this.state;
  }

  setState(state) {
    this.state = state;
  }

  stop() {
    this.setState("paused");
    this.cancelDownload();
    postMessage({ type: "aborted" });
  }

  processTask(task) {
    this.setState("working");

    if (task.source && task.url) {
      let query = getQueryString(task.type, task.source, task.url);
      let xhr = request(
        query,
        () => {}, //progress
        (result) => { // success
          this.sendResult(result, task);
        },
        (status) => { // error
          this.sendResult(null, task, false);
        }
      );
      this.callMeToAbortDownload = xhr;
    }else{
      this.sendResult(null, task, false);
    }
  }

  sendResult(result,task, success = true) {
    postMessage({ type: success ? "success" : "fail", result: result, task: task });
    if (this.getState() !== "paused") {
      this.requestTask();
    }
  }

  requestTask() {
    this.setState("idle");
    postMessage({ type: "request" });
  }
}
