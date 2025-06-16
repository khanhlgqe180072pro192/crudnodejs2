import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// Đăng ký tài khoản
export const registerUser = async (req, res) => {
	try {
		let { username, password } = req.body;

		if (!username || !password) {
			return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin" });
		}

		username = username.trim().toLowerCase();

		const userExists = await User.findOne({ username });
		if (userExists) {
			return res.status(400).json({ message: "Tên đăng nhập đã tồn tại!" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = new User({
			username,
			password: hashedPassword,
		});

		await newUser.save();
		res.status(201).json({ message: "Đăng ký thành công" });
	} catch (err) {
		console.error("Register error:", err);
		if (err.code === 11000) {
			return res.status(400).json({ message: "Tên đăng nhập đã tồn tại!" });
		}
		res.status(500).json({ message: "Lỗi máy chủ khi đăng ký" });
	}
};

// Đăng nhập
export const loginUser = async (req, res) => {
	try {
		let { username, password } = req.body;

		if (!username || !password) {
			return res.status(400).json({ message: "Vui lòng nhập tên và mật khẩu" });
		}

		username = username.trim().toLowerCase();

		const user = await User.findOne({ username });
		if (!user) {
			return res.status(400).json({ message: "Tên đăng nhập hoặc mật khẩu không đúng" });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ message: "Tên đăng nhập hoặc mật khẩu không đúng" });
		}

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
			expiresIn: "1d",
		});

		res.json({
			token,
			user: {
				id: user._id,
				username: user.username,
			},
		});
	} catch (err) {
		console.error("Login error:", err);
		res.status(500).json({ message: "Lỗi máy chủ khi đăng nhập" });
	}
};
