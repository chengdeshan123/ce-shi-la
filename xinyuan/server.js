const express = require("express");
const http = express();
const db = require("./js/db.js");
const bodyParser = require("body-parser")
http.listen(8080,()=>{
	console.log("ok")
})
http.use(bodyParser.urlencoded({extended:false}))
http.use(express.static("./public"));//写了静态资源打开页面方式就是localhost:8080
//http.use((req,res,next)=>{
//	res.header("Access-Control-Allow-Origin","*");
//	next();
//})
//添加
http.post("/add",(req,res)=>{
	let objQ = req.body;
	console.log(objQ)
	db.insertOne("xyList",objQ,(err,data)=>{
		if(err)throw err;
		res.send({
			status:"1",
			statusText:"ok"
		})
	})
})
//渲染
http.get("/msg",(req,res)=>{
	db.find("xyList",{where:{},limit:8},(err,data)=>{
		if(err)throw err;
		res.send({
			status:"1",
			statusText:"ok",
			data:data
		})
	})
})
//删除
http.get("/del",(req,res)=>{
	let objQ = req.query;
	db.deleteById("xyList",objQ.id,(err,data)=>{
		if(err)throw err;
		res.send({
			status:"1",
			statusText:"ok",
		})
	})
})
//变色
http.get("/change",(req,res)=>{
	let objQ = req.query;
	console.log(objQ)
	
	db.updateById("xyList",objQ.id,{bol:true},(err,data)=>{
		if(err)throw err;
		db.findById("xyList",objQ.id,(err,data1)=>{
				res.send(data1);
			})
	})
})
http.all("*",(req,res)=>{
	res.sendFile(__dirname+req.url)
})
