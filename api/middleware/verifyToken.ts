const verifyToken = async ({ jwt, cookie: { auth } }) => {
  if (!auth) {
    return null;
  }
  const profile = await jwt.verify(auth);

  if (!profile?.userId) {
    return null;
  }

  return profile.userId;
};

export default verifyToken;
