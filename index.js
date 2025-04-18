const express = require("express");
const app = express();
const PORT = 8000;
const path = require("path");
const multer = require("multer");
const {cleanData} = require("./clean");
const pdfParse = require("pdf-parse");
const {checkResume} = require("./checkResume");

const upload = multer({ storage : multer.memoryStorage()});


app.set("view engine" , "ejs");
app.set("views" , path.resolve("./views"));

app.use(express.urlencoded({extended : false}));

app.get("/" , (req,resp)=>{
    return resp.render("index" , {suggestions : null});
})

app.post("/upload" ,upload.single("resume"), async (req,resp)=>{
    if(!req.file) return resp.status(400).send("No file found");
    try{
        const data = await pdfParse(req.file.buffer);
        console.log(data);
        // return resp.send("Resume extracted");
        const cleanedData = cleanData(data.text);
        console.log("THE CLEANED DATA IS \n" , cleanedData);
        console.log("NOW GETTING SUGGESTIONS .....");
        const suggestions = await checkResume(cleanedData);
        console.log(suggestions);
        console.log("Done cleaning and providing suggestions ......");
        resp.render("index" , {suggestions});
    }catch(err){
        console.log("Failed to parse resume ...." , err);
        return resp.status(500).send(err);
    }
})



app.listen(PORT , ()=>{
    console.log("Server started at PORT " , PORT);
})