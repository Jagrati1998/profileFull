const express = require("express");

const {
    getAllUsers,
    addUser,
    getUserById,
  
    updateUserById,
    deleteUserByImsi,
    deleteManyUserByImsi,
    addBulkUser,
    deleteAll,
    loginUserByName,
    serachImsi,
    getByDeviceType,
   
} = require("../controllers/UserController");

const router = express.Router();
router.route("/deletebulkall").delete(deleteAll)
router.route("/").get(getAllUsers).post(addUser);
router.route("/:id").get(getUserById).delete(deleteUserByImsi).put(updateUserById);
router.route("/deletemany/:id").delete(deleteUserByImsi);
router.route("/searchByImsi/:id").get(serachImsi);
router.route("/devicetagfilter/:id").get(getByDeviceType);

router.route("/deletebulk/:imsi/:bulk").delete(deleteManyUserByImsi);
router.route("/addbulk/:bulk").post(addBulkUser);
router.route("/login").post(loginUserByName);



module.exports = router;