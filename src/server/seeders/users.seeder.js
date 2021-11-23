const { Seeder } = require('mongoose-data-seed');
const { Users } = require('./../models');
const users = require('./json/users.json');

class UsersSeeder extends Seeder {
  async shouldRun() {
    return Users.countDocuments()
      .exec()
      .then(count => count === 0);
  }

  async run() {
    return Users.create(users);
  }
}

export default UsersSeeder;
