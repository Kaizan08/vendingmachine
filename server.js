const express = require("express");
const app = express();
const data = require('./models/data.js');

var history = []
var machine = data;

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
    //few way to copy item to another variable without copying the reference
    var localItem = JSON.parse(JSON.stringify(item));
    localItem["quantity"] = 1
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
    var obj = {"status": "success", "data":machine["data"]};
    res.json(obj);
})

app.post("/api/customer/items/:itemid/purchases", (req, res)=>{
    var itemid = parseInt(req.params.itemid, 10) - 1;
    var selecteditem = data["data"][itemid];
    if (machine["money"] >= selecteditem["cost"] & selecteditem["quantity"] > 0){
        machine = sale(selecteditem, machine);
        console.log(history);
        return res.json({"status": "success", "data": machine})
    } else if(machine["money"] < selecteditem["cost"]){
        var obj = {"status": "fail",
                "data": {
                    "money_given": machine['money'],
                    "money_required": selecteditem["cost"]
                    }
                }
        return res.json(obj);
    } else {
       var obj = {"status": "fail",
                "data": {
                    "quantity": machine["quantity"]
                    }
                } 
        return res.json(obj);
    }
    
})

//delete before turning in
app.listen(3000, (req, res)=>{
    console.log("port", 3000)
})
module.exports = app;





// POST /api/customer/items/:itemId/purchases - purchase an item
// GET /api/vendor/purchases - get a list of all purchases with their item and date/time
// GET /api/vendor/money - get a total amount of money accepted by the machine
// POST /api/vendor/items - add a new item not previously existing in the machine
// PUT /api/vendor/items/:itemId - update item quantity, description, and cost