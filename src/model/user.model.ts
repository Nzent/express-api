import mongoose from "mongoose";
import config from "config";
import bcrypt from "bcrypt";

export interface UserDocument extends mongoose.Document {
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparedPassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next: (err?: Error) => void) {
  let user = this as UserDocument;

  //   hash the password if its new or updated
  if (!user.isModified("password")) return next();

  //   random salt data
  const salt = await bcrypt.genSalt(config.get("saltWorkFactor"));
  const hash = await bcrypt.hashSync(user.password, salt);

  // replace password with hash
  user.password = hash;
  return next();
});

// used for login
UserSchema.methods.comparedPassword = async function (
  candidatePassword: string
) {
  const user = this as UserDocument;
  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

const User = mongoose.model<UserDocument>("User", UserSchema);
export default User;
