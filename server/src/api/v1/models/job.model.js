const { Schema, model } = require("mongoose");

const jobSchema = new Schema(
  {
    writer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    jobTitle: {
      type: String,
      required: true,
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
    },
    workplaceType: {
      type: String,
      enum: ["On-site", "Hybrid", "Remote"],
      required: true,
    },
    jobLocation: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      required: true,
      enum: ["Full-time", "Part-time", "Internship", "Freelance", "Contract", "Self-employed"],
    },
    description: {
      type: String,
      required: true,
    },
    applicants: [
      {
        type: Object,
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        cv: {
          type: Object,
          url: {
            type: String,
            required: true,
          },
          public_id: {
            type: String,
            required: true,
          },
          resource_type: {
            type: String,
            required: true,
          },
        },

        phone: {
          type: String,
          required: true,
        },

        phoneCountryCode: {
          type: String,
          required: true,
        },

        email: {
          type: String,
          required: true,
        },
      },
    ],
    activelyRecruiting: {
      type: Boolean,
      default: true,
    },

    promoted: {
      type: Boolean,
      default: false,
    },

    reportBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  },
);

jobSchema.index({ jobTitle: "text", jobLocation: "text" });

module.exports = model("Job", jobSchema);
