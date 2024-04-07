import { User } from "../models/user.ts";

const verifyGuide = async ({ jwt, cookie }) => {
  if (!cookie.auth) {
    return null;
  }
  const profile = await jwt.verify(cookie.auth);

  if (!profile?.userId) {
    return null;
  }

  const isGuide = await User.findOne({
    _id: profile.userId,
    role: "Guide",
  });
  console.log("isGuide ne bo", isGuide);
  if (!isGuide) return null;

  return profile.userId;
};

export default verifyGuide;
