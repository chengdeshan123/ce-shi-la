const mongodb = require("mongodb");//引入mongodb模块；
const MongoClient = mongodb.MongoClient;//引入连接模块；
const ObjectId = mongodb.ObjectId;
const url = "mongodb://localhost:27017";
const db_name = "xinyuan";
function connect(callback){
	MongoClient.connect(url,{useNewUrlParser:true},(err,db)=>{
		if(err) throw err;
		var dbase = db.db(db_name);
		return callback(dbase);//此处return可以省略
	})
}

//插入一条数据
/*
 * collection_name:集合名称
 * obj:插入的数据对象
 * backFn:回调函数
 */
exports.insertOne = function(collection_name,obj,backFn){
	connect(function(dbase){
		dbase.collection(collection_name).insertOne(obj,(err,data)=>{
			backFn(err,data);
		})
	})
}
//插入多条数据
/*
 * collection_name:集合名称
 * arr:插入的数据数组
 * backFn:回调函数
 */
exports.insertMany = function(collection_name,arr,backFn){
	connect(function(dbase){
		dbase.collection(collection_name).insertMany(arr,(err,data)=>{
			backFn(err,data);
		})
	})
}
//删除一条数据
/*
 * collection_name:集合名称
 * obj:筛选条件
 * backFn:回调函数
 */
exports.deleteOne = function(collection_name,obj,backFn){
	connect(function(dbase){
		dbase.collection(collection_name).deleteOne(obj,(err,data)=>{
			backFn(err,data);
		})
	})
}
//删除多条数据
/*
 * collection_name:集合名称
 * obj:筛选条件
 * backFn:回调函数
 */
exports.deleteMany = function(collection_name,obj,backFn){
	connect(function(dbase){
		dbase.collection(collection_name).deleteMany(obj,(err,data)=>{
			backFn(err,data);
		})
	})
}
//通过id删除数据
/*
 * collection_name:集合名称
 * id:被删除的数据id
 * backFn:回调函数
 */
exports.deleteById = function(collection_name,id,backFn){
	connect(function(dbase){
		dbase.collection(collection_name).deleteOne({_id:ObjectId(id)},(err,data)=>{
			backFn(err,data)
		})
	})
}
//修改一条数据
/*
 * collection_name:集合名称
 * query:筛选条件
 * updataObj：修改后的对象
 * backFn:回调函数
 */
exports.updateOne = function(collection_name,query,updataObj,backFn){
	connect(function(dbase){
		dbase.collection(collection_name).updateOne(query,{$set:updataObj},function(err,data){
			backFn(err,data);
		})
	})
}
//修改多条数据
/*
 * collection_name:集合名称
 * query:筛选条件
 * updataObj：修改后的对象
 * backFn:回调函数
 */
exports.updateMany = function(collection_name,query,updataObj,backFn){
	connect(function(dbase){
		dbase.collection(collection_name).updateMany(query,{$set:updataObj},function(err,data){
			backFn(err,data);
		})
	})
}
//通过id检索修改数据
/*
 * collection_name:集合名称
 * id:被修改的数据id值
 * updataObj：修改后的对象
 * backFn:回调函数
 */
exports.updateById = function(collection_name,id,updataObj,backFn){
	connect(function(dbase){
		dbase.collection(collection_name).updateOne({_id:ObjectId(id)},{$set:updataObj},function(err,data){
			backFn(err,data);
		})
	})
}
//find(xxx,{where:{title:"1"}})
//查找数据
/*
 * collection_name：集合名称
 * obj 
	 * where :{} //筛选对象
	 * limit: //返回数据条数 0，正无穷时   返回所有数据
	 * skip://跳过多少条数据进行返回
	 * backFn:回调函数
 */
exports.find = function(collection_name,obj,backFn){
	if(obj.where == undefined){
		obj.where = {};
	}
	if(obj.limit == undefined){
		obj.limit = 0;
	}
	if(obj.skip == undefined){
		obj.skip = 0;
	}
	connect(function(dbase){
		dbase.collection(collection_name).find(obj.where).skip(obj.skip).limit(obj.limit).toArray((err,data)=>{
			backFn(err,data);
		})
	})
}

//通过id检索数据
/*
 * collection_name:集合名称
 * id:被检索的数据id
 * backFn:回调函数
 */
exports.findById = function(collection_name,id,backFn){
	connect(function(dbase){
		dbase.collection(collection_name).find({_id:ObjectId(id)}).toArray((err,data)=>{
			backFn(err,data);
		})
	})
}

//count返回目标集合中的数量
/*
 * collection_name:集合名称
 * obj:筛选条件
 * backFn:回调函数
 */
exports.count = function(collection_name,obj,backFn){
	connect(function(dbase){
		dbase.collection(collection_name).count(obj,(err,data)=>{
			backFn(err,data);
		})
	})
}
