import { User } from "../models/user.ts";

export default class UserController {
  // ======= Authentication =======
  async signUp({ jwt, setCookie, set, body }) {
    try {
      const user = await User.findOne({ username: body.username });
      if (user) {
        set.status = 400;
        return { message: "Username is unique!" };
      }

      const encodedPassword = await jwt.sign({ theTruth: body.password });
      const newUser = new User({
        ...body,
        password: encodedPassword,
      });
      await newUser.save();

      setCookie("auth", await jwt.sign({ userId: newUser._id }), {
        httpOnly: true,
        secure: true,
        maxAge: 7 * 86400, // expires in 7days
      });
      const { password, ...others } = newUser._doc;
      set.status = 200;
      return {
        message: "Created user successfully!",
        data: others,
      };
    } catch (error) {
      set.status = 500;
      return { message: "Server failed" };
    }
  }

  async signIn({ jwt, setCookie, set, body }) {
    try {
      const user = await User.findOne({ username: body.username });
      if (!user) {
        set.status = 400;
        return { message: "Wrong credentials!" };
      }

      const { theTruth } = await jwt.verify(user.password);

      if (body.password !== theTruth) {
        set.status = 400;
        return { message: "Wrong credentials!" };
      }

      setCookie("auth", await jwt.sign({ userId: user._id }), {
        httpOnly: true,
        secure: true,
        maxAge: 7 * 86400, // expires in 7days
      });

      const { password, ...others } = user._doc;
      set.status = 200;
      return { message: "Logged in successfully!", data: others };
    } catch (error) {
      set.status = 500;
      return { message: "Server failed" };
    }
  }

  async signOut({ setCookie, set }) {
    try {
      setCookie("auth", "");
      return { message: "Logged out successfully!" };
    } catch (err) {
      set.status = 500;
      return { message: "Server failed" };
    }
  }

  async getUserByUserId({ set, userId }) {
    try {
      const data = await User.findById(userId).select("-password");

      if (!data) {
        set.status = 400;
        return { message: "Bad request!" };
      }

      set.status = 200;
      return data;
    } catch (error) {
      set.status = 500;
      return { message: "Server failed" };
    }
  }
}
