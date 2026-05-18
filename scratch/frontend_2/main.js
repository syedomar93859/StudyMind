const button = document.getElementById("btn");
button.addEventListener("click", display)

function display(){
    let input = document.getElementById("something").value; 
    const content = document.querySelector('.result');
    content.innerHTML = input;
}