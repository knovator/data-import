const { Seeder } = require('mongoose-data-seed');
const { Projects } = require('../models');
const projects = require('./json/projects.json');

class ProjectsSeeder extends Seeder {
  async shouldRun() {
    return Projects.countDocuments()
      .exec()
      .then(count => count === 0);
  }

  async run() {
    return Projects.insertMany(projects);
  }
}

module.exports = ProjectsSeeder;
