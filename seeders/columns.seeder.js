import { Seeder } from 'mongoose-data-seed';
import { Columns } from '../models';
const columns = require('./json/columns.json');

class ColumnsSeeder extends Seeder {
  async shouldRun() {
    return Columns.countDocuments()
      .exec()
      .then(count => count === 0);
  }

  async run() {
    return Columns.create(columns);
  }
}

export default ColumnsSeeder;
