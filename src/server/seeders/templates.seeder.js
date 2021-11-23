import { Seeder } from 'mongoose-data-seed';
import { Templates } from '../models';

const data = [{}];

class TemplatesSeeder extends Seeder {
  async shouldRun() {
    return Templates.countDocuments()
      .exec()
      .then(count => count === 0);
  }

  async run() {
    return Templates.create(data);
  }
}

export default TemplatesSeeder;
