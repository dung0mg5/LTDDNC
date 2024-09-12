const Relationship = require("../models/relationship.model");
const User = require("../models/user.model");
const Connection = require("../models/connection.model");
const UserService = require("./user.service");

module.exports = class {
  static async followUser({ followerId, followingId }) {
    const relationshipExists = await Relationship.exists({
      follower: followerId,
      following: followingId,
    });

    if (relationshipExists) return false;

    await Promise.all([
      User.findByIdAndUpdate(
        followerId,
        {
          $addToSet: { following: followingId },
        },
        { new: true },
      ),
      User.findByIdAndUpdate(
        followingId,
        {
          $addToSet: { followers: followerId },
        },
        { new: true },
      ),
    ]);

    await Relationship.create({
      follower: followerId,
      following: followingId,
    });

    return true;
  }

  static async unfollowUser({ followerId, followingId }) {
    const relationshipExists = await Relationship.exists({
      follower: followerId,
      following: followingId,
    });

    if (!relationshipExists) return false;

    await Promise.all([
      User.findByIdAndUpdate(
        followingId,
        { $pull: { followers: followerId } },
        { new: true },
      ),
      User.findByIdAndUpdate(
        followerId,
        { $pull: { following: followingId } },
        { new: true },
      ),
    ]);

    await Relationship.findOneAndDelete({
      follower: followerId,
      following: followingId,
    });

    return true;
  }

  static async getFollowingUser({ followerId, page, limit }) {
    const relationships = await Relationship.find({
      follower: followerId,
    })
      .populate("following")
      .lean();

    const followingUsers = relationships
      .map((relationship) => ({
        ...relationship.following,
        createdAt: relationship.createdAt,
      }))
      .sort((a, b) => b.createdAt - a.createdAt);

    return {
      followingUsers: followingUsers.slice((page - 1) * limit, page * limit),
      amountFollowing: followingUsers.length,
    };
  }

  static async requestConnection({ recipientId, note, requesterId }) {
    if (String(recipientId) === String(requesterId))
      return { error: "You can't connect with yourself", status: 400 };

    const existingConnection = await Connection.findOne({
      requester: requesterId,
      recipient: recipientId,
    });

    if (existingConnection)
      return { error: "You requested to this user", status: 400 };

    const recipient = await UserService.checkUserExist({
      userId: recipientId,
    });
    if (!recipient) return { error: "User not found", status: 404 };

    const reqConnection = await Connection.create({
      requester: requesterId,
      recipient: recipientId,
      status: 1,
      note,
    });
    const recConnection = await Connection.create({
      requester: recipientId,
      recipient: requesterId,
      status: 2,
      note,
    });

    await User.findByIdAndUpdate(requesterId, {
      $push: { connections: reqConnection._id },
    });
    await User.findByIdAndUpdate(recipientId, {
      $push: { connections: recConnection._id },
    });

    return { error: null, status: 200 };
  }

  static async getPendingConnections({ user, page, limit }) {
    let connections = await Promise.all(
      user.connections.map(async (connection) => {
        const c = await Connection.findById(connection)
          .populate("recipient")
          .populate("requester")
          .lean();

        return c;
      }),
    );

    connections = connections.filter((c) => c.status === 2);

    return {
      connections: connections.slice((page - 1) * limit, page * limit),
      amountConnection: connections.length,
    };
  }

  static async confirmConnection({ connectionId, recipientId }) {
    const recConnection = await Connection.findById(connectionId);
    if (!recConnection)
      return {
        error: "Connection is not found! Something went wrong",
        status: 404,
      };

    if (String(recConnection.requester) !== String(recipientId))
      return { error: "You are not authorized to reject", status: 403 };

    const reqConnection = await Connection.findOne({
      requester: recConnection.recipient,
      recipient: recConnection.requester,
    });

    if (!reqConnection)
      return {
        error: "Connection is not found! Something went wrong",
        status: 500,
      };

    reqConnection.status = 3;
    recConnection.status = 3;
    await reqConnection.save();
    await recConnection.save();
    await this.followUser({
      followerId: recConnection.requester,
      followingId: recConnection.recipient,
    });
    await this.followUser({
      followerId: recConnection.recipient,
      followingId: recConnection.requester,
    });

    return { error: null, status: 200 };
  }

  static async rejectConnection({ connectionId, recipientId }) {
    const recConnection = await Connection.findById(connectionId);
    if (!recConnection)
      return { error: "Connection is not found", status: 404 };

    if (String(recConnection.requester) !== String(recipientId))
      return { error: "You are not authorized to reject", status: 403 };

    await Connection.findByIdAndDelete(connectionId);
    const reqConnection = await Connection.findOneAndDelete({
      requester: recConnection.recipient,
      recipient: recConnection.requester,
    });

    await User.findByIdAndUpdate(recipientId, {
      $pull: { connections: connectionId },
    });
    await User.findByIdAndUpdate(recConnection.recipient, {
      $pull: { connections: reqConnection._id },
    });

    return { error: null, status: 200 };
  }

  static async getSentConnection({ user, page, limit }) {
    let connections = await Promise.all(
      user.connections.map(async (connection) => {
        const c = await Connection.findById(connection)
          .populate("recipient")
          .populate("requester")
          .lean();

        return c;
      }),
    );

    connections = connections.filter((c) => c.status === 1);

    return {
      connections: connections.slice((page - 1) * limit, page * limit),
      amountConnection: connections.length,
    };
  }

  static async withdrawSentConnection({ connectionId, requesterId }) {
    const reqConnection = await Connection.findById(connectionId);
    if (!reqConnection)
      return { error: "Connection is not found", status: 404 };

    if (String(reqConnection.requester) !== String(requesterId))
      return { error: "You are not authorized to withdraw", status: 403 };

    await Connection.findByIdAndDelete(connectionId);
    const recConnection = await Connection.findOneAndDelete({
      requester: reqConnection.recipient,
      recipient: reqConnection.requester,
    });

    await User.findByIdAndUpdate(requesterId, {
      $pull: { connections: connectionId },
    });
    await User.findByIdAndUpdate(recConnection.recipient, {
      $pull: { connections: reqConnection._id },
    });

    return { error: null, status: 200 };
  }

  static async getConnections({ user, page, limit }) {
    let connections = await Promise.all(
      user.connections.map(async (connection) => {
        const c = await Connection.findById(connection)
          .populate("recipient")
          .populate("requester")
          .lean();

        return c;
      }),
    );

    connections = connections
      .filter((c) => c.status === 3)
      .map((c) => {
        if (String(c.requester._id) === String(user._id)) {
          return {
            ...c,
            user: { ...c.recipient },
            _id: c._id,
            status: c.status,
            note: c.note,
          };
        }

        return {
          ...c,
          user: { ...c.requester },
          _id: c._id,
          status: c.status,
          note: c.note,
        };
      });

    return {
      connections: connections.slice((page - 1) * limit, page * limit),
      amountConnection: connections.length,
    };
  }

  static async removeConnection({ connectionId, requesterId }) {
    const reqConnection = await Connection.findById(connectionId);
    if (!reqConnection)
      return { error: "Connection is not found", status: 404 };

    await Connection.findByIdAndDelete(connectionId);
    const recConnection = await Connection.findOneAndDelete({
      requester: reqConnection.recipient,
      recipient: reqConnection.requester,
    });

    await User.findByIdAndUpdate(requesterId, {
      $pull: { connections: connectionId },
    });
    await User.findByIdAndUpdate(recConnection.requester, {
      $pull: { connections: recConnection._id },
    });

    await this.unfollowUser({
      followerId: reqConnection.requester,
      followingId: reqConnection.recipient,
    });

    await this.unfollowUser({
      followerId: reqConnection.recipient,
      followingId: reqConnection.requester,
    });

    return { error: null, status: 200 };
  }

  static async searchConnection({ name, page, limit, requesterId }) {
    let connections = await Connection.find({
      requester: requesterId,
      status: 3,
    })
      .populate("recipient")
      .lean();

    connections = connections.filter((c) =>
      c.recipient.fullName.toLowerCase().includes(name.toLowerCase()),
    );

    return {
      connections: connections.slice((page - 1) * limit, page * limit),
      amountConnection: connections.length,
    };
  }

  static async checkUserIsConnected({ userId, requesterId }) {
    const connection = await Connection.findOne({
      requester: requesterId,
      recipient: userId,
      status: 3,
    });

    if (!connection) return false;

    return true;
  }
};
