const express = require("express");

const {
    getAllUsers,
    addUser,
    getUserById,
  
    updateUserById,
    
   
    
   
} = require("../controllers/UserController");

const router = express.Router();
router.route("/").get(getAllUsers).post(addUser);
router.route("/:id").get(getUserById).put(updateUserById);




module.exports = router;