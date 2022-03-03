const Users = require('./users.model.js');
const Token = require('./tokens.model');
const Columns = require('./columns.model');
const Projects = require('./projects.model');
const Templates = require('./templates.model');
const Jobs = require('./jobs.model');
const FailedJobs = require('./failed_jobs.model.');
const SucceedJobs = require('./succeed_jobs.model');
const Settings = require('./settings.model');
const Files = require('./files.model');
const Masters = require('./masters.model');
const Roles = require('./roles.model');
const Workbooks = require('./workbooks.model');

module.exports = {
  Users,
  Token,
  Columns,
  Projects,
  Templates,
  Jobs,
  FailedJobs,
  SucceedJobs,
  Settings,
  Masters,
  Files,
  Roles,
  Workbooks
};
