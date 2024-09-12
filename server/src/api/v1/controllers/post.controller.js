const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const PostService = require("../services/post.service");

const createPost = catchAsync(async (req, res, next) => {
  const { file } = req;
  const { content, visibility, commentControl } = req.body;

  if (!content) return next(new AppError("Content is required", 400));

  const post = await PostService.createPost({
    file,
    content,
    visibility,
    commentControl,
    owner: req.user.authenticatedUser._id,
  });

  res.json({ post });
});

const getPosts = catchAsync(async (req, res, next) => {
  const { limit = 10, skip = 0 } = req.query;

  res.json({ message: "This route is not implemented yet" });
});

const getPost = catchAsync(async (req, res, next) => {
  const { postId } = req.params;

  const post = await PostService.getPost({ postId });
  if (!post) return next(new AppError("Post not found", 404));

  res.json({ post });
});

const getFollowingUserPosts = catchAsync(async (req, res, next) => {
  const { limit = 10, page = 0 } = req.query;

  const posts = await PostService.getFollowingUserPosts({
    userId: req.user.authenticatedUser._id,
    limit,
    page,
  });

  res.json({ data: posts });
});

const getCommunityPosts = catchAsync(async (req, res, next) => {
  res.json({ message: "This route is not implemented yet" });
});

const deletePost = catchAsync(async (req, res, next) => {
  const { postId } = req.params;

  const isSuccessful = await PostService.deletePost({ postId });
  if (!isSuccessful) return next(new AppError("Post not found", 404));

  res.json({ message: "Post is deleted" });
});

const getComments = catchAsync(async (req, res, next) => {
  const { postId } = req.params;
  console.log(postId);

  const post = await PostService.getPost({ postId });
  if (!post) return next(new AppError("Post not found", 404));

  const comments = await PostService.getComments({ postId });
  res.json({ data: comments });
});

const createComment = catchAsync(async (req, res, next) => {
  const { postId } = req.params;
  const { content } = req.body;

  if (!content) return next(new AppError("Content is required", 400));

  const comment = await PostService.createComment({
    content,
    owner: req.user.authenticatedUser._id,
    postId,
  });

  res.json({ data: comment });
});

const getPostReacts = catchAsync(async (req, res, next) => {
  const { postId } = req.params;

  const post = await PostService.getPost({ postId });
  if (!post) return next(new AppError("Post not found", 404));

  const reacts = await PostService.getReacts({ postId });

  res.json({ data: reacts });
});

const createReact = catchAsync(async (req, res, next) => {
  const { postId } = req.params;
  const { type } = req.body;

  const react = await PostService.createReact({
    owner: req.user.authenticatedUser._id,
    postId,
    type,
  });

  res.json({ data: react });
});

const moreInforPost = catchAsync(async (req, res, next) => {
  const { postId } = req.params;

  const comments = await PostService.getComments({ postId });

  res.json({
    data: {
      amountComments: comments.length,
    },
  });
});

module.exports = {
  createPost,
  getPost,
  deletePost,
  getPosts,
  getFollowingUserPosts,
  getComments,
  createComment,
  getPostReacts,
  createReact,
};
