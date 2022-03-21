import Downloader from "../functionalcomponents/Downloader/Downloader";
import { singletonHook } from 'react-singleton-hook';
import successCallback from "./callbacks/downloaderSuccessCallback";


const { useState, useEffect } = require("react");

function useDownloader(){
    const [tasks, setTasks] = useState([]);
    const [tasksHash, setTasksHash] = useState([]);
    const [currentTask, setCurrentTask] = useState(null);
    const [isRunning, setIsRunning] = useState(false);

    //* Initialize Downloader
    // * Effects!!!!
    useEffect(function initializeDownloader(){
        setTasks([...Downloader.getTaskList()]);
        setTasksHash(Downloader.getTasksHashTable());
        setCurrentTask(Downloader.getCurrentTask());
        setIsRunning(Downloader.isRunning());
        
        Downloader.setSuccessCallback(function update(param){
            successCallback(param);
            setTasks([...Downloader.getTaskList()]);
            setTasksHash(Downloader.getTasksHashTable());
        })

        Downloader.setCurrentTaskCallback( function updateCurrentTask (){
            setCurrentTask(Downloader.getCurrentTask());
        });
    },[])


    function inQueue(url){
        return tasksHash[url] !== undefined;
    }

    function getAllTasks(){
        return tasks;
    }

    //* Add Task
    function addTask(task){
        Downloader.addTask(task);
        setTasks([...Downloader.getTaskList()]);
        setTasksHash(Downloader.getTasksHashTable());
    }

    function bulkAddTask(tasks){
        Downloader.bulkAddTask(tasks);
        setTasks([...Downloader.getTaskList()]);
        setTasksHash(Downloader.getTasksHashTable());
    }

    //* Remove Task
    function removeTask(task){
        Downloader.removeTask(task);
        setTasks([...Downloader.getTaskList()]);
        setTasksHash(Downloader.getTasksHashTable());
    }

    function bulkRemoveTask(tasks){
        Downloader.bulkRemoveTask(tasks);
        setTasks([...Downloader.getTaskList()]);
        setTasksHash(Downloader.getTasksHashTable());
    }

    //* Swap Tasks
    function swapTasks(task1, task2){
        Downloader.swapTasks(task1, task2);
        setTasks([...Downloader.getTaskList()]);
        setTasksHash(Downloader.getTasksHashTable());
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
        currentTask,
        isRunning,
        functions: {
            getAllTasks,
            inQueue,
            addTask,
            removeTask,
            swapTasks,
            startWorker,
            pauseWorker,
            bulkAddTask,
            bulkRemoveTask
        }
    }   

}

export default singletonHook({tasks:[], currentTask:null, isRunning:false, functions:{}}, useDownloader);