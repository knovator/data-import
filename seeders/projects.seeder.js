import { Seeder } from 'mongoose-data-seed';
import { Projects } from '../models';
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

export default ProjectsSeeder;
