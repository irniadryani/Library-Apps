
const { Op } = require("sequelize");
const Category = require("../models/CategoryModel");

// Function for get all category
const getCategory = async (req, res) => {
  try {
    const categories = await Category.findAll({ paranoid: false });
    if (categories.length === 0) {
      return res.status(404).json({ msg: 'No categories found.' });
    }
    res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error.message);
    res.status(500).json({ msg: 'An error occurred while fetching categories.' });
  }
};

module.exports = { getCategory };
