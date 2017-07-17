const express = require("express");
const app = express();
const db = require('./models/data.js');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var history = [];

function currentDate(){
    var currentdatetime = new Date();
    currentdatetime = currentdatetime.getDate() + "/"
                + (currentdatetime.getMonth()+1)  + "/" 
                + currentdatetime.getFullYear() + " @ "  
                + currentdatetime.getHours() + ":"  
                + currentdatetime.getMinutes() + ":" 
                + currentdatetime.getSeconds();
    return currentdatetime;
}
function addToHistory(item){
    var localItem = JSON.parse(JSON.stringify(item));
    localItem["quantity"] = 1;
    localItem["saletime"] = currentDate();
    history.push(localItem);
}

function sale(item, inventory){
    addToHistory(item);
    inventory["money"]= inventory["money"]-item["cost"];
    inventory["data"][item["id"]-1]["quantity"] = inventory["data"][item["id"]-1]["quantity"]-1; 
    return inventory;
}

app.get("/api/customer/items", (req,res)=>{
    var obj = {"status": "success", "data":db["data"]};
    res.json(obj);
})

app.post("/api/customer/items/:itemid/purchases", (req, res)=>{
    var itemid = parseInt(req.params.itemid, 10) - 1;
    var selecteditem = db["data"][itemid];
    if (db["money"] >= selecteditem["cost"] & selecteditem["quantity"] > 0){
        sale(selecteditem, db);
        return res.json({"status": "success", "data": history[history.length-1]})
    } else if(db["money"] < selecteditem["cost"]){
        var obj = {"status": "fail",
                "data": {
                    "money_given": db['money'],
                    "money_required": selecteditem["cost"]
                    }
                }
        return res.json(obj);
    } else {
       var obj = {"status": "fail",
                "data": {
                    "description": db["description"],
                    "quantity": db["quantity"]
                    }
                } 
        return res.json(obj);
    }
    
})
app.get("/api/vendor/purchases", (req,res)=>{
    console.log(history);
    var obj = {"status": "success", "data":history}
    res.json(obj);
});

app.get("/api/vendor/money", (req, res)=>{
    var money_given = 0;
    for (var i = 0; i< history.length; i++){
        money_given += history[i]["cost"];
    }
    var obj = {"status": "success", "data": {
    "money_given": money_given+db["money"]
    }}
    res.json(obj);                
})

app.post("/api/vendor/items", (req, res)=>{
    db["data"].push(req.body);
    console.log(req.body);
    res.json({"status":"success", "data": req.body});
})
app.put("/api/vendor/items/:itemId", (req, res)=>{
    var value = parseInt(req.params.itemId -1, 10)
    var obj= db["data"][value];
    obj = {"id": req.body.id,
        "description":req.body.description,
        "cost": req.body.cost,
        "quantity": req.body.quantity};
    db["data"].splice(value,1, obj);
    res.json({"status": "success", "data":db}); 
})
//delete before turning in
app.listen(3000, (req, res)=>{
    console.log("port", 3000)
})
module.exports = app;
