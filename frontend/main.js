const button = document.getElementById('submit')

button.addEventListener("click", doSomething);

function doSomething(){
    const input = document.getElementById('submission').value;

    if (input.length == 0){
        alert("Input box is empty!");
    } else{
        alert("Input box is not empty!");
    }
}