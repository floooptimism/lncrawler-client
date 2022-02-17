import styles from "./DownloadsSideBar.module.css";

import useDownloader from "../../../../hooks/useDownloader";
import { useEffect } from "react";

function DownloadsSideBar(props) {
  const {
    tasks,
    currentTask,
    isRunning,
    functions: downloader,
  } = useDownloader();

  useEffect(()=>{
    window.downloader = downloader;
  }, [])

  return (
    <div
      className={`${styles.DownloadsBar} ${
        props.downloadsBarOpen ? "right-0" : "-right-64"
      }`}
    >
      {/* Head */}
      <div className="flex items-center mb-3">
        <h1>Downloads</h1>
        <div className="ml-auto p-1 rounded-md flex items-center justify-center">
          {/* play and pause button */}
          {isRunning ? (
            <svg
              onClick={() => downloader.pauseWorker()}
              className="text-red-600 opacity-80 fill-current stroke-current"
              height="16"
              width="16"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect height="16" width="4" x="6" y="4" />
              <rect height="16" width="4" x="14" y="4" />
            </svg>
          ) : (
            <svg
              onClick={() => console.log(downloader.startWorker())}
              className="text-gray-50 fill-current stroke-current"
              height="16"
              width="16"
              version="1.1"
              viewBox="0 0 22 28"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>play</title>
              <defs />
              <g
                id="Page-1"
                fill="none"
                fillRule="evenodd"
                stroke="none"
                strokeWidth="1"
              >
                <g
                  id="Icon-Set-Filled"
                  className="text-gray-600 fill-current"
                  fill="#000000"
                  transform="translate(-419.000000, -571.000000)"
                >
                  <path
                    id="play"
                    d="M440.415,583.554 L421.418,571.311 C420.291,570.704 419,570.767 419,572.946 L419,597.054 C419,599.046 420.385,599.36 421.418,598.689 L440.415,586.446 C441.197,585.647 441.197,584.353 440.415,583.554"
                  />
                </g>
              </g>
            </svg>
          )}

        </div>
      </div>

      {tasks.map((task) => {
        return (
          <div key={task.id} className={`${styles.DownloadsBarItem}`}>
            <div>
              <h6 className={`${styles.DownloadsBarItemTitle}`}>{task.name}</h6>
              <p className={`${styles.DownloadsBarItemStatus}`}>
                {(currentTask?.id == task.id && isRunning && "Downloading") ||
                  "In Queue"}
              </p>
            </div>

            <div className="ml-auto" onClick={() => downloader.removeTask(task)}>
              <svg
                className="text-red-600 opacity-80 fill-current"
                height="18"
                width="18"
                viewBox="0 0 18 18"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
              </svg>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default DownloadsSideBar;
