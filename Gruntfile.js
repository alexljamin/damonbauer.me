module.exports = function( grunt ) {
  require( "load-grunt-config" )( grunt, {
    loadGruntTasks: {
      config: require("./package.json"),
      pattern: [ "grunt-*" ]
    }
  });
};
