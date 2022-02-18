//
let display=document.getElementById("main");

fetch('http://localhost:3000/links')
  .then(response => response.json())
  .then(links => {
    links.forEach(link=>{
      console.log(link);
      display.innerHTML += `<img src=${link}>`;
    })
  });
