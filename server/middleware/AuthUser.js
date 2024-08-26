const User = require("../models/UsersModel");
const Role = require("../models/RoleModel");

// Function for verify user from the session
const verifyUser = async (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Please login to your account" });
  }

  try {
    const user = await User.findOne({
      where: { id: req.session.userId },
      include: [{ model: Role, as: 'role', attributes: ['name'] }],
    });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    req.userId = user.id;
    req.role = user.role.name;
    next(); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = {
  verifyUser
};

