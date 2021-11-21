const mongoose = require('mongoose');
const Users = require('./seeders/users.seeder');
const Projects = require('./seeders/projects.seeder');
const { mongo } = require('./config/vars');

const mongoURL = mongo.uri;

/**
 * Seeders List
 * order is important
 * @type {Object}
 */
exports.seedersList = {
  Users,
  Projects
};
/**
 * Connect to mongodb implementation
 * @return {Promise}
 */
exports.connect = async () => mongoose.connect(mongoURL);
/**
 * Drop/Clear the database implementation
 * @return {Promise}
 */
exports.dropdb = async () => mongoose.connection.db.dropDatabase();
