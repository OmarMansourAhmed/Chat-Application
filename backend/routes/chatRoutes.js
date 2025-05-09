const express = require("express");
const { protect } = require('../middlewares/authMiddleware');
const  {accessChat, fetchChats, createGroupChat, renameGroupName, addUserToGroup, removeUserFromGroup }  = require("../controllers/chatControllers");
// const { registerUser, authUser, allUsers } = require('../controllers/userControllers');

const router = express.Router();


router.route('/').post(protect, accessChat)
.get(protect, fetchChats);
router.route('/group').post(protect,createGroupChat);
router.route('/rename').put(protect, renameGroupName);
router.route('/groupadd').put(protect, addUserToGroup);
router.route('/groupremove').put(protect, removeUserFromGroup);

module.exports = router; 