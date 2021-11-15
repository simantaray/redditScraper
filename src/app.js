 
const desplay= document.getElementById("main").innerHTML;

fetch('http://localhost:8000/results')
  .then(response => response.json())
  .then(data => console.log(data));
