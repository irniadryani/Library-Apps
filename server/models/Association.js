const Books = require("./BookModel");
const Loans = require("./LoansModel");
const Category = require("./CategoryModel");

// Create association for table
Books.hasMany(Loans, { foreignKey: "book_id", as: 'bookloans' });
Loans.belongsTo(Books, { foreignKey: "book_id", as: 'book' });


Books.belongsTo(Category, { foreignKey: "category_id", as: "category" });
Category.hasMany(Books, { foreignKey: "category_id", as: "books" });

module.exports = { Books, Loans, Category };
