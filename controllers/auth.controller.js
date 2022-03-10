const Projects = require('../models/projects.model');

/**
 * Find All Projects
 * @public
 */
const findAll = async (req, res) => {
  Projects.find({}, (err, docs) => {
    if (err) {
      console.log(`Error: ` + err);
    } else {
      if (docs.length === 0) {
        console.log('message');
      } else {
      }
    }
  });
};

module.exports = {
  findAll
};
