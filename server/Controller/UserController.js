const asyncHandler = require("express-async-handler");
const User = require("../Models/UserModel");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const AuthUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Người dùng chưa đăng nhập" });
    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Lỗi máy chủ" });
  }
});

/**
 * Route:api/user/register
 * Description:Đăng kí tài khoản
 * Protect:Public
 */
const RegisterUser = asyncHandler(async (req, res) => {
  const { name, email, password, image } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "Email đăng kí tài khoản đã được sử dụng",
      });
    }
    const hashPassword = await argon2.hash(password);
    const newUser = new User({ name, email, password: hashPassword, image });
    await newUser.save();

    // Cấp token cho người đăng kí mới
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET,
    );

    if (newUser) {
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        image: newUser.image,
        token: accessToken,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Đăng kí tài khoản thất bại",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Lỗi máy chủ",
    });
  }
});

/**
 * Route:api/user/login
 * Description:Đăng nhập tài khoản
 * Protect:Public
 */
const LoginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Tài khoản không tồn tại",
      });
    }
    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid) {
      return res.status(400).json({
        success: false,
        message: "Email hoặc mật khẩu không chính xác",
      });
    }
    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
      token: accessToken,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Lỗi máy chủ",
    });
  }
});

module.exports = { AuthUser, RegisterUser, LoginUser };
