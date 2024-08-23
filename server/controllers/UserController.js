const { Op } = require("sequelize");
const User = require("../models/UsersModel");
const Role = require("../models/RoleModel");
const bcrypt = require("bcrypt");

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "full_name", "email", "role_id", "phone_number"],
      include: [
        {
          model: Role,
          attributes: ["name"],
          as: "role",
        },
      ],
    });

    const formattedUsers = users.map((user) => ({
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      role_id: user.role_id,
      role_name: user.role ? user.role.name : null,
      phone_number: user.phone_number,
    }));

    res.status(200).json(formattedUsers);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const createUser = async (req, res) => {
  const { full_name, email, password, confPassword } = req.body;

  if (password !== confPassword) {
    return res
      .status(400)
      .json({ msg: "Password and Confirm Password do not match" });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await User.create({
      full_name,
      email,
      password: hashPassword,
    });

    res.status(201).json({ msg: "Register successful" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

module.exports = { getUsers, createUser };
