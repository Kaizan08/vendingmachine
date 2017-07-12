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