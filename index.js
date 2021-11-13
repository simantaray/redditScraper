const axios=require("axios");
const express=require("express");
const cheerio=require("cheerio");

const app =express();

const link="https://simantaray.com/";
axios(link)
    .then((response)=>{
        const data = (response.data);
        
        const $=cheerio.load(data);
        
        $('.navbar__link',data).each(function(){
            console.log($(this).text())
        })

    }).catch(e=>console.log(e));


app.listen(8000,()=>{
    console.log('listening to 8000port');
})