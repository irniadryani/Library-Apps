const { Op } = require("sequelize");
const Bookshelf = require("../models/BookshelvesModel");

// Function for get all bookshelf
const getBookshelf = async (req, res) => {
  try {
    const bookshelf = await Bookshelf.findAll();
   

    res.status(200).json(bookshelf);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = { getBookshelf}