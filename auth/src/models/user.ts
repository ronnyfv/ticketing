import mongoose from "mongoose";

import { Password } from "./../services/password";

interface UserAttributes {
  email: string;
  password: string;
}

interface UserModel extends mongoose.Model<UserDocument> {
  build(attributes: UserAttributes): UserDocument;
}

interface UserDocument extends mongoose.Document {
  email: string;
  password: string;
}

const user_schema = new mongoose.Schema<UserDocument>({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

user_schema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.to_hash(this.get("password"));

    this.set("password", hashed);
  }

  done();
});

user_schema.statics.build = (attributes: UserAttributes): UserDocument => {
  return new User(attributes);
};

const User = mongoose.model<UserDocument, UserModel>("User", user_schema);

export { User };
