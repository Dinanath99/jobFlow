const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "Please enter your name"],
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: [true, "Please enter a password"],
    },

    confirmPassword: {
      type: String,
      required: [true, "Please confirm your password"],
    },

    phoneNumber: {
      type: String,
      required: [true, "Please enter your mobile number"],
      validate: {
        validator: function (el) {
          return validator.isMobilePhone(el);
        },
        message: "Please enter a valid mobile number",
      },
    },

    role: {
      type: String,
      enum: ["applicant", "recruiter"],
      default: "applicant",
      required: true,
    },
    profile: {
      bio: String,
      skills: [
        {
          type: String,
        },
      ],
      resume: { type: String },
      resumeOriginalName: { type: String },
      company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
      },
      profilePhoto: {
        type: String,
        default: "",
      },
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timeStamps: true }
);

// Pre-save middleware to remove confirmPassword field
UserSchema.pre("save", function (next) {
  this.confirmPassword = undefined;
  next();
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
