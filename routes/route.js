const { uploadPost, deletePosts, getPost,updatePost, retrievePost, handlePostStatus, checkPostStatus } = require("../controllers/postController");
const { userSignup, login } = require("../controllers/userController");
const { auth } = require("../middleware");

const router = require("express").Router();

router.route("/signup").post(userSignup);
router.route("/login").post(login);
router.route("/post").post( auth,uploadPost);
router.route("/get/post/:_id").get( auth,getPost);
router.route("/delete/post/:_id").delete( auth,deletePosts);
router.route("/update/post/:_id").put( auth,updatePost).put(handlePostStatus)
router.route("/get/posts").get(retrievePost);
router.route("/post/status").get(checkPostStatus);


module.exports = router;
