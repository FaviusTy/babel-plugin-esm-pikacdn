const path = require("path");
const tester = require("babel-plugin-tester").default;

tester({
  plugin: require("../index"),
  fixtures: path.join(__dirname, "fixtures")
});
