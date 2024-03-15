const User = require("../modals/User");
const userService = require("../services/UserService");

exports.getAllUsers = async () => {
    return await User.find();
};

exports.addUser = async (user) => {
   
    // var newuser= new User(user)
    return await  User.create(user);
};
exports.addBulkUser = async (user) => {
    return await User.create(user);
};
exports.addBulkUserQuery = async (user,imsi) => {
    
    return await User.create(user);
    
};



exports.getUserById = async (id) => {
    return await User.findOne({imsi:id});
};

exports.deleteUserById = async (id) => {
    return await User.findByIdAndDelete(id);
};
exports.deleteAllQuery=async()=>{
  return await User.deleteMany({})

  
}

exports.deleteUserByImsi = async (id) => {
    return await User.deleteOne({imsi:id});
};

exports.searchImsiQuery = async (id) => {
    return await User.find({ imsi: { $regex: id } });
};
exports.searchDeviceTypeQuery = async (id) => {
    return await User.find({ deviceType: id });
};

exports.deleteManyUserQuery =  async(imsi) => {
return  await User.find({ }).limit(3).cursor().forEach(function (user) {
    console.log(user.imsi)
    user.delete({imsi:user.imsi})
  
  
})

    
       
};



exports.updateUserById = async (id, user) => {
    return await User.findByIdAndUpdate(id, user);
};

