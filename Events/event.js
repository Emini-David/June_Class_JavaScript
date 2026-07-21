document.getElementById("btn").addEventListener("click", function(){
    alert("Button clicked");
});


const deleteBtn = document.getElementById("deleteBtn");
deleteBtn.addEventListener("dbclick", function() {
    console.log("Item deleted!");
});

const title = document.getElementById("title");
title.addEventListener("mouseover", function(){
    title.style.color = "purple";
});
title.addEventListener("mouseleave", function(){
    title.style.color = "black";
});


const input = document.getElementById("input");
input.addEventListener("keydown", function (event){
    console.log(event.key);
});
input.addEventListener("keyup", function (event){
    console.log("Key released");
});


const username = document.getElementById("username");
const output = document.getElementById("output");
username.addEventListener("input", function(){
    output.textContent = username.value;
});

const country = document.getElementById("country");
country.addEventListener("change", function(){
    alert(country.value);
});

const form = document.getElementById("form");
form.addEventListener("submit", function (event){
    event.preventDefault();
    alert("Form Submitted");
});