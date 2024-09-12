const { Schema, model } = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    provider: {
      type: String,
      required: true,
      default: "local",
    },

    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },

    firstName: {
      type: String,
      trim: true,
      required: [true, "You must have a first name"],
      minlength: [2, "First name must have more or equal than 2 characters"],
    },

    lastName: {
      type: String,
      trim: true,
      required: [true, "You must have a last name"],
      minlength: [2, "Last name must have more or equal than 2 characters"],
    },

    location: {
      type: String,
      trim: true,
    },

    fullName: String,

    cover: {
      type: Object,
      url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
        required: true,
      },
      default: {
        url: "https://res.cloudinary.com/myshop-it/image/upload/v1709004468/avatars/default-avatar.png",
        public_id: "avatars/default-avatar.png",
      },
    },

    avatar: {
      type: Object,
      url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
        required: true,
      },
      default: {
        url: "https://res.cloudinary.com/myshop-it/image/upload/v1709004468/avatars/default-avatar.png",
        public_id: "avatars/default-avatar.png",
      },
    },

    email: {
      type: String,
      trim: true,
      required: [true, "You must have a email"],
      lowercase: true,
      unique: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },

    password: {
      type: String,
      minlength: [8, "Password must have more or equal than 8 characters"],
      maxLength: [200, "Password must have less or equal than 200 characters"],
    },

    about: {
      type: String,
      trim: true,
    },

    skills: [
      {
        type: String,
        trim: true,
      },
    ],

    // first education is primary
    educations: [
      {
        school: {
          type: Schema.Types.ObjectId,
          ref: "University",
        },
        fieldOfStudy: String,
        degree: String,
        grade: Number,
        activities: String,
        description: String,
        skills: [
          {
            type: String,
            trim: true,
          },
        ],
        startYear: Number,
        endYear: Number,
        _id: false, // remove _id from subdocument
      },
    ],
    headline: String,
    // first experience is primary
    experiences: [
      {
        company: {
          type: Schema.Types.ObjectId,
          ref: "Company",
        },
        jobTitle: String,
        typeEmployment: String,
        description: String,
        location: String,
        locationType: String,
        industry: String,
        skills: [
          {
            type: String,
            trim: true,
          },
        ],
        start: Date,
        end: Date,
        _id: false, // remove _id from subdocument
      },
    ],

    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    savedPosts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],

    savedJobs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Job",
      },
    ],

    connections: [
      {
        type: Schema.Types.ObjectId,
        ref: "Connection",
      },
    ],

    isVerified: {
      type: Boolean,
      default: false,
    },

    active: {
      type: Boolean,
      default: true,
    },

    role: {
      type: String,
      enum: ["user", "admin", "page"],
      default: "user",
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function (next) {
  this.fullName = `${this.firstName} ${this.lastName}`;

  next();
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  next();
});

userSchema.methods.comparePassword = async function (password) {
  const result = await bcrypt.compare(password, this.password);
  return result;
};

userSchema.index({ fullName: "text" });
module.exports = model("User", userSchema);
