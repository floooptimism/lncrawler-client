function request(url, progress, success, error){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'blob';
    xhr.onprogress = function(e){
        if (e.lengthComputable){
            progress(e.loaded, e.total);
        }
    };
    xhr.onload = function(){
        if (this.status == 200){
            success(this.response);
        } else {
            error(this.status);
        }  
    };
    xhr.send();

    return xhr;
}

