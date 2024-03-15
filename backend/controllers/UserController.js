const userService = require("../services/UserService");
const User = require("../modals/User");
exports.getAllUsers = async (req , res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
};

exports.addUser = async (req , res) => {
  
    try {
        const user = await userService.addUser(req.body);
        res.json({status: "success"});
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
};
exports.addBulkUser = async (req , res) => {
  const stringImsi=req.body.imsi;
  try {
     
        for(let i=0;i<req.params.bulk;i++){
          console.log(parseInt(stringImsi),i)
          req.body.imsi=parseInt(stringImsi)+parseInt(i)
       
      // i===0? req.body.imsi=parseInt(req.body.imsi):req.body.imsi=parseInt(req.body.imsi)+1
      // console.log(req.body.imsi,req.body.imsi.length)
      let nonZeroIndex = 0;
      var addprefix=""
   
      while (stringImsi[nonZeroIndex] === '0') {
        addprefix=addprefix.concat("0")
        nonZeroIndex++;
   
      }
    
      req.body.imsi= addprefix.concat(req.body.imsi)

       await userService.addBulkUserQuery(req.body);
       
        }
      res.json({status: "success"});
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

exports.getUserById = async (req , res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        res.json(user);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
};

exports.deleteUserById = async (req , res) => {
    try {
        const user = await userService.deleteUserById(req.params.id);
        res.json({status: "success"});
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
};
exports.deleteUserByImsi = async (req , res) => {
  try {
      const user = await userService.deleteUserByImsi(req.params.id);
      
      res.json({status: "success"});
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

exports.deleteManyUserByImsi=async(req,res)=>{
 
  try{
    User.find({ imsi:{$gte:req.params.imsi}}).limit(req.params.bulk).cursor().forEach(function (user) {
    console.log(user.imsi)
    user.delete({imsi:user.imsi})
  
  
})


   
    res.json({status:"success"});
  }catch(err){
    res.status(500).json({error:err.messsage});
  }
}
exports.updateUserById = async (req , res) => {
    try {
        const user = await userService.updateUserById(req.params.id, req.body);
        res.json({status: "success"});
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
};

exports.loginUserByName = async (req , res) => {

      // await userService.updateUserById(req.params.id, req.body);
      try {
      if((req.body.username==="user" && req.body.password==="123"))
      res.json({status: "success"});
      else  res.status(500).json({ error: err.message });
      }
      catch (err) {
        res.status(500).json({ error: err.message });
      }
      
       
      
    
};
exports.serachImsi=async(req,res)=>{
  try {
    const user = await userService.searchImsiQuery(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } 
}
exports.getByDeviceType=async(req,res)=>{
  try {
    const user = await userService.searchDeviceTypeQuery(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } 
}
exports.deleteAll=async(req,res)=>{
  try {
    await userService.deleteAllQuery();
    res.json({status:"succress"});
  }
  catch(err){
    res.status(500).json({error:err.message})
  }
}