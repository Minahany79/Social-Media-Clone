const cron = require("node-cron");

const dailyEmail = () => {
  cron.schedule("* 1 * * * *", () => {
    console.log("running a task every two second");
  });
};


module.exports = dailyEmail