import { Seeder } from 'mongoose-data-seed';
import { Templates } from '../models';
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

export default TemplatesSeeder;
