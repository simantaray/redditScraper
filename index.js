const axios=require("axios");
const express=require("express");
const cheerio=require("cheerio");
const cors =require("cors");
const app =express();


app.use(cors());

const link="https://simantaray.com/";

app.get("/results", (req,res)=>{
    const results=[];
    axios(link)
    .then((response)=>{
        const data = (response.data);
        
        const $=cheerio.load(data);
        
        $('.navbar__link',data).each(function(){
            const title=$(this).text();
            
            results.push({title});
        })
        res.json(results)
    }).catch(e=>console.log(e));
    console.log(results);
    
})


app.listen(8000,()=>{
    console.log('listening to 8000port');
})