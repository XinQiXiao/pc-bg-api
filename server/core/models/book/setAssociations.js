/**
 * create at 12/21/18
 */

const { info } = require('../../../debug')('sequelize-book-association')

module.exports = function setAssociations(models){
	info('set associations')
	const { book_info, book_category, players, teams } = models
	book_category.hasMany(book_info, {as: 'book_info', foreignKey: 'book_category_id', target: 'category_id'})
	book_info.belongsTo(book_category,{foreignKey: 'book_category_id'})
	players.belongsTo(teams, {as: 'teams', foreignKey: 'team_id'})
}