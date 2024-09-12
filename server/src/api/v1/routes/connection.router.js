const router = require("express").Router();
const { requireAuth } = require("../middlewares/auth");

const {
  requestConnection,
  confirmConnection,
  rejectConnection,
  getPendingConnections,
  getSentConnection,
  withdrawSentConnection,
  getConnections,
  searchConnection,
  removeConnection,
  checkConnection,
} = require("../controllers/connection.controller");
const { connectionLimiter } = require("../middlewares/limiter");
const {
  followUser,
  unfollowUser,
  getFollowingUser,
} = require("../controllers/relationship.controller");

router.use(requireAuth);

router.get("/", getConnections);
router.post("/search", searchConnection);
router.get("/pending", getPendingConnections);
router.get("/sent", getSentConnection);
router.get("/following", getFollowingUser);
router.post("/:userId/follow", followUser);
router.post("/:userId/unfollow", unfollowUser);
router.post("/:userId", connectionLimiter, requestConnection);
router.post("/:userId/check", checkConnection);
router.delete("/:connectionId", removeConnection);
router.post("/:connectionId/reject", rejectConnection);
router.post("/:connectionId/confirm", confirmConnection);
router.post("/:connectionId/withdraw", withdrawSentConnection);

module.exports = router;
