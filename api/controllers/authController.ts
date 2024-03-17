import { User } from "../models/user.ts";

export default class AuthController {
  async signUp({ jwt, setCookie, set, body }) {
    try {
      const user = await User.findOne({ email: body.email });
      if (user) {
        set.status = 400;
        return { message: "This email address's already used, try another!" };
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
        data: { ...others },
      };
    } catch (error) {
      set.status = 500;
      return { message: "Server failed" };
    }
  }

  async signIn({ jwt, setCookie, set, body }) {
    try {
      const user = await User.findOne({ email: body.email });
      if (!user) {
        set.status = 400;
        return { message: "Wrong credentials!" };
      }

      const { theTruth } = await jwt.verify(user.password);

      if (body.password !== theTruth) {
        set.status = 400;
        return { message: "Wrong credentials!" };
      }

      if (body.remember) {
        setCookie("auth", await jwt.sign({ userId: user._id }), {
          httpOnly: true,
          secure: true,
          maxAge: 7 * 86400, // expires in 7days
        });
      }

      const { password, ...others } = user._doc;
      set.status = 200;
      return { message: "Logged in successfully!", data: others };
    } catch (error) {
      set.status = 500;
      return { message: "Server failed" };
    }
  }

  async signOut({ removeCookie }) {
    removeCookie("auth");
  }

  async forgotPw({}) {}

  async resetPw({}) {}
}
