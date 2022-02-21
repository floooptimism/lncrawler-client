function enableScroll(){
    document.getElementsByTagName('body')[0].style.overflow = "auto"
}

function disableScroll(){
    document.getElementsByTagName('body')[0].style.overflow = "hidden"
}

let func = {
    disableScroll: disableScroll,
    enableScroll: enableScroll
}

export default func;