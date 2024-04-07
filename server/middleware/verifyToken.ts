const verifyToken = async ({ jwt, cookie }) => {
  if (!cookie.auth) {
    return null;
  }
  const profile = await jwt.verify(cookie.auth);

  if (!profile?.userId) {
    return null;
  }

  return profile.userId;
};

export default verifyToken;
