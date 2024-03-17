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



exports.updateUserById = async (req , res) => {
    try {
        const user = await userService.updateUserById(req.params.id, req.body);
        res.json({status: "success"});
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
};




