const User = require("../model/User");
const bcryptjs = require("bcryptjs");
const saltRounds = 10;

const userController = {};

userController.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        status: "failed",
        message: "이메일과 비밀번호를 모두 입력해주세요",
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      throw new Error("user already exists");
    }
    const salt = bcryptjs.genSaltSync(saltRounds);
    const hash = bcryptjs.hashSync(password, salt);
    const newUser = new User({ email, name, password: hash });
    await newUser.save();
    res.status(200).json({ status: "success" });
  } catch (error) {
    res.status(400).json({ status: "failed", error });
  }
};

userController.loginWithEmail = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        status: "failed",
        message: "이메일과 비밀번호를 모두 입력해주세요",
      });
    }

    const user = await User.findOne({ email }).select("-createdAt -updatedAt -__v");
    if (user) {
      const isMatch = bcryptjs.compareSync(password, user.password);
      if (isMatch) {
        const token = user.generateToken();
        return res.status(200).json({ status: "success!", user, token });
      }
    }
    throw new Error("ID or password does not match");
  } catch (error) {
    res.status(400).json({ status: "failed :(", message: error.message });
  }
};

userController.getUser = async (req, res) => {
  try {
    const { userId } = req; //req 라고 부르는것과의 차이?
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("can not find user");
    }
    res.status(200).json({ status: "success", user });
  } catch (error) {
    res.status(400).json({ status: "failed", message: error.message });
  }
};

module.exports = userController;
