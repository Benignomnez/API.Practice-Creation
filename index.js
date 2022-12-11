
/* Bulding an API with nodejs and Express practice
with Dom at Dcode 

*/





const fs = require("fs/promises");
const express = require("express");
const cors = require("cors");
const _ = require("lodash");
const { v4:uuid} = require("uuid");
const { request } = require("http");
const { response, json } = require("express");
const exp = require("constants");

const app = express();
app.use(express.json());//middleware to suppport receiving json from server


app.get("/outfit", (request, response) =>{
   const tops =["Black","White", "Red", "Orange", "Navy"];
   const jeans =["Gray","Dark Gray", "Black", "Navy"];
   const shoes =["jordn 1 OG", "White", "Black", "Boots"];

   response.json({
    top: _.sample(tops),
    jeans: _.sample(jeans),
    shoes: _.sample(shoes)
   });
});


app.get("/comments/:id", async(request, response) =>{
   const id = request.params.id;
   let content;

   try{
      content = await fs.readFile(`data/comments/${id}.txt`, "utf-8");
   } catch (err) {
      return response.sendStatus(404);

   }

   response.json({
      content: content
   });

});





app.post("/comments", async (request, response) =>{
   const id = uuid();
   const content = request.body.content;

   if(!content){ // has no content then
      return response.sendStatus(400);
   }

   await fs.mkdir("data/comments", {recursive: true});
   await fs.writeFile(`data/comments/${id}.txt`, content);

   response.status(201).json({
      id: id
   });
});




app.listen(3000, () => console.log("API Server is running...!"));

