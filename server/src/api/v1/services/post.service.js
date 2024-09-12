const Post = require("../models/post.model");
const User = require("../models/user.model");
const Comment = require("../models/comment.model");
const React = require("../models/react.model");

const cloudinary = require("../../../../config/cloud");

module.exports = class {
  static async createPost({
    file,
    content,
    visibility,
    commentControl,
    owner,
  }) {
    const newPost = new Post({
      content,
      visibility,
      commentControl,
      owner,
    });

    if (file) {
      const options = {
        folder: "posts",
        resource_type: "auto",
      };
      const { secure_url: url, public_id } = await cloudinary.uploader.upload(
        file.path,
        options,
      );

      newPost.media = {
        url,
        public_id,
        resource_type: file.mimetype.startsWith("image") ? "image" : "video",
      };
    }

    let post = await newPost.save();
    post = await User.populate(post, {
      path: "owner",
    });

    return post;
  }

  static async deletePost({ postId }) {
    const post = await Post.findByIdAndDelete(postId);
    if (!post) return false;

    return true;
  }

  static async getPost({ postId }) {
    const post = await Post.findById(postId).populate("owner").lean();
    if (!post) return null;

    const comments = await Comment.find({ post: postId })
      .populate("owner")
      .lean();
    const reacts = await React.find({ post: postId }).populate("owner").lean();

    post.comments = comments;
    post.reacts = reacts;

    return post;
  }

  static async getFollowingUserPosts({ userId, limit, page }) {
    const followingUsers = await User.findById(userId)
      .select("following")
      .lean();

    const followingUserPosts = await Post.find({
      owner: { $in: followingUsers.following },
    })
      .populate("owner")
      .lean();

    const personalPosts = await Post.find({ owner: userId })
      .populate("owner")
      .lean();

    const posts = followingUserPosts
      .concat(personalPosts)
      .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
      .slice((page - 1) * limit, page * limit);

    return posts;
  }

  static async getComments({ postId }) {
    const comments = await Comment.find({ post: postId })
      .populate("owner")
      .sort({ createdAt: -1 })
      .lean();

    return comments;
  }

  static async createComment({ postId, content, owner }) {
    console.log(postId);
    const newComment = new Comment({
      content,
      owner,
      post: postId,
    });

    let comment = await newComment.save();
    comment = await User.populate(comment, {
      path: "owner",
    });

    return comment;
  }

  static async getReacts({ postId }) {
    const reacts = await React.find({ post: postId }).populate("owner").lean();

    return reacts;
  }

  static async createReact({ postId, type, owner }) {
    const newReact = new React({
      post: postId,
      type,
      owner,
    });

    let react = await newReact.save();
    react = await User.populate(react, {
      path: "owner",
    });

    return react;
  }
};
