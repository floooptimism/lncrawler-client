export default function debounce(func, delay = 800){
    let timeout;
    return function(...args){
        clearTimeout(timeout);
        timeout = setTimeout(func.bind(func,...args), delay);
    }
}
