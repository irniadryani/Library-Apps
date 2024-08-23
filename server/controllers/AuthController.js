const User  = require('../models/UsersModel');
const Role = require ("../models/RoleModel") // Adjust the path to your User model
const { comparePassword } = require('../utils/utils'); // Adjust the path to your utils


const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      where: { email },
      attributes: ["id", "full_name", "email", "password"],
      include: [{ model: Role, as: 'role', attributes: ['name'] }],
    });

    if (!user) {
      return res.status(401).send('Invalid email or password');
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return res.status(401).send('Invalid email or password');
    }

    req.session.userId = user.id;
    req.session.user = {
      id: user.id,
      email: user.email,
      role: user.role.name,
      full_name: user.full_name,
    };

    res.status(200).json({
      msg: 'Logged in successfully',
      session: req.session.user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

const me = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Please login to your account" });
  }

  try {
    const user = await User.findOne({
      where: { id: req.session.userId },
      attributes: ["id", "full_name", "email"],
      include: [{ model: Role, as: 'role', attributes: ['name'] }],
    });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({
      id: user.id,
      email: user.email,
      role: user.role.name,
      full_name: user.full_name,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};


const logout = async (req,res) => {
  req.session.destroy((err)=> {
    if (err) return res.status(400).json({msg: "Cannot Logout"});
    res.status(200).json({msg: "Successfully Logged out"});
  })
}

module.exports = {
  login, me, logout
};
