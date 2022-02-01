// DownloaderWorker class
self.importScripts("DownloaderWorker.js");

let worker = new DownloaderWorker();

onmessage = function(msg) {
  switch (msg.data.type) {
    case "download":
      if (worker.getState() == "idle") {
        postMessage({ type: "accepted", task: msg.data.task });
        worker.processTask(msg.data.task);
      }
      break;
    case "cancel":
      worker.stop();
      break;
    case "pause":
      worker.stop();
      break;
    case "resume":
      if (worker.getState() == "paused" || worker.getState() == "idle") {
        console.log("Starting worker!");
        worker.requestTask();
      }
      break;
    case "start":
      if (worker.getState() == "paused" || worker.getState() == "idle") {
        console.log("Starting worker!");
        worker.requestTask();
      }
      break;
  }
};
