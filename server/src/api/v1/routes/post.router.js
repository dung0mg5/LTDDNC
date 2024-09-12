const router = require("express").Router();
const {
  createPost,
  getPost,
  deletePost,
  getFollowingUserPosts,
  createComment,
  getComments,
  getPostReacts,
  createReact,
} = require("../controllers/post.controller");
const { requireAuth } = require("../middlewares/auth");
const { createPostLimiter } = require("../middlewares/limiter");
const { uploadFile } = require("../middlewares/multer");

router.use(requireAuth);

router.get("/", getFollowingUserPosts);
router.post("/create", createPostLimiter, uploadFile, createPost);
router.route("/:postId").get(getPost).delete(deletePost);
router.route("/:postId/comment").get(getComments).post(createComment);
router.route("/:postId/react").post(createReact).get(getPostReacts);

module.exports = router;
