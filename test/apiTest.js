const apiApp = require("../server");
const assert = require("assert");
const request = require("supertest");

describe("GET /api/customer/items", function(){
    it("should return successfully",function(done){
        request(apiApp).get("/api/customer/items")  
        .expect(200)
        .expect("Content-Type", "application/json; charset=utf-8")
        .expect(function(res){
            assert.equal( res.body["status"], "success");
        })
        .end(function(err, res){//or pass out done
            if (err){
                done(err);
            } else{
                done();
            }
        });
    });
});

describe("POST /api/customer/items/:itemid/purchases", function(){
    it("should return a success for a purchase", function(done){
        request(apiApp).post("/api/customer/items/5/purchases")
        .expect(200)
        .expect("Content-Type", "application/json; charset=utf-8")
        .expect(function(res){
            assert.equal( res.body["status"], "success");
        })
        .end(function(err, res){
            if (err){
                done(err);
            } else{
                done();
            }
        });
    });
});

describe("GET /api/vendor/purchases", function(){
    it("should return a success for a history", function(done){
        request(apiApp).get("/api/vendor/purchases")
        .expect(200)
        .expect("Content-Type", "application/json; charset=utf-8")
        .expect(function(res){
            assert.equal( res.body["status"], "success");
        })
        .end(function(err, res){
            if (err){
                done(err);
            } else{
                done();
            }
        });
    });
});

describe("GET /api/vendor/money", function(){
    it("should return a success for a listing of money", function(done){
        request(apiApp).get("/api/vendor/money")
        .expect(200)
        .expect("Content-Type", "application/json; charset=utf-8")
        .expect(function(res){
            assert.equal( res.body["status"], "success");
        })
        .end(function(err, res){
            if (err){
                done(err);
            } else{
                done();
            }
        });
    });
});
describe("POST /api/vendor/items", function(){
    it("should return a success for a listing of new item", function(done){
        request(apiApp).post("/api/vendor/items")
        .send({"id":"100", "description":"something", "cost": 100, "quantity": 5})
        .expect(200);
        .expect("Content-Type", "application/json; charset=utf-8");
        .expect(function(res){
            assert.equal( res.body.status, "success");
            console.log(res.body["data"]);
            assert.equal( res.body.data.id, "100");
            assert.equal( res.body["data"].description, "something");
        })
        .end(function(err, res){
            if (err){
                done(err);
            } else{
                done();
            }
        });
    });
});
describe("PUT /api/vendor/items/:itemId", function(){
    it("should update description of current item", function(done){
        request(apiApp).put("/api/vendor/items/5")
        .send({"id":"5", "description":"Doritos", "cost": 100, "quantity": 3})
        .expect(200)
        .expect("Content-Type", "application/json; charset=utf-8")
        .expect(function(res){
            assert.equal( res.body["status"], "success");
        })
        .end(function(err, res){
            if (err){
                done(err);
            } else{
                done();
            }
        });
    });
});