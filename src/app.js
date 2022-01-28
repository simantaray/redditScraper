 
const desplay= document.getElementById("main").innerHTML;

fetch('http://localhost:3000')
  .then(response => response.json())
  .then(data => console.log(data));
