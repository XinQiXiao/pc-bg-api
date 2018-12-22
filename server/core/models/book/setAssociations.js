/**
 * create at 12/21/18
 */

const { info } = require('../../../debug')('sequelize-book-association')

module.exports = function setAssociations(models){
	info('set associations')
	const { book_info, book_category, } = models
	book_category.hasMany(book_info, {as: 'book_info', foreignKey: 'book_category_id', target: 'category_id'})
	// book_info.hasOne(book_category, {as: 'book_category', foreignKey: 'category_id'})
	book_info.belongsTo(book_category, {as: 'bookCategory', foreignKey: 'book_category_id'})
}