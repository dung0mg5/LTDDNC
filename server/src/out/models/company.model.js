const { model, Schema } = require("mongoose");

const companySchema = new Schema({
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
      url: "https://res.cloudinary.com/myshop-it/image/upload/v1708862021/companies/default-company_zlxp3l.png",
      public_id: "default-company_zlxp3l",
    },
  },

  name: {
    type: String,
    required: true,
  },

  typeOfBusiness: {
    type: String,
    required: true,
  },
});

companySchema.index({ name: "text" });
module.exports = model("Company", companySchema);
