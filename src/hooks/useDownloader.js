const { useState, useEffect } = require("react");
const Downloader = require("../functionalcomponents/Downloader/Downloader");

function useDownloader(){
    console.log("Rerender");
    const [tasks, setTasks] = useState([]);
    const [currentTask, setCurrentTask] = useState(null);
    const [isRunning, setIsRunning] = useState(false);

    //* Initialize Downloader
    // * Effects!!!!
    useEffect(function initializeDownloader(){
        setTasks([...Downloader.getTaskList()]);
        setCurrentTask(Downloader.getCurrentTask());
        setIsRunning(Downloader.isRunning());
        Downloader.setSuccessCallback(function update(){
            setTasks([...Downloader.getTaskList()]);
            setCurrentTask(Downloader.getCurrentTask());
        })
    },[])

    //* Add Task
    function addTask(task){
        Downloader.addTask(task);
        setTasks([...Downloader.getTaskList()]);
    }

    //* Remove Task
    function removeTask(task){
        Downloader.removeTask(task);
        setTasks([...Downloader.getTaskList()]);
    }

    //* Swap Tasks
    function swapTasks(task1, task2){
        Downloader.swapTasks(task1, task2);
        setTasks([...Downloader.getTaskList()]);
    }

    //* Start Worker
    function startWorker(){
        Downloader.startWorker();
        setIsRunning(Downloader.isRunning());

    }

    //* Pause Worker
    function pauseWorker(){
        Downloader.pauseWorker();
        setIsRunning(Downloader.isRunning());
    }

    return {
        tasks,
        currentTask,
        isRunning,
        functions: {
            addTask,
            removeTask,
            swapTasks,
            startWorker,
            pauseWorker
        }
    }   

}

module.exports = useDownloader;