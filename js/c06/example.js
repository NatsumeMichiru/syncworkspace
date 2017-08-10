var noteInput, noteName, textEntered, target;

noteName = document.getElementById('noteName');
noteInput = document.getElementById('noteInput');

function writeLabel(e){
    if(!e){
        e = window.event;
    }
    textEntered = e.target.value;
    noteName.textContent = textEntered;
}

function recorderControl(e){
    if(!e){
        e = window.event;
    }
    if(e.preventDefault){
        e.preventDefault();
    }else{
        e.returnValue = false;
    }

    switch(e.target.getAttribute('data-state')){
        case 'record':
            e.target.setAttribute('data-state', 'stop');
            break;
        case 'stop':
            e.target.setAttribute('data-state', 'record');
            break;
    }
}

document.addEventListener('click', function(e){
    recorderControl(e);
}, false);
document.addEventListener('input', function(e){
    writeLabel(e);
}, false);