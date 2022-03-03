const { Seeder } = require('mongoose-data-seed');
const { Templates } = require('../models');
const templates = require('./json/templates.json');

class TemplatesSeeder extends Seeder {
  async shouldRun() {
    return Templates.countDocuments()
      .exec()
      .then(count => count === 0);
  }

  async run() {
    return Templates.create(templates);
  }
}

module.exports = TemplatesSeeder;
