module.exports = {
  default: {
    files: [{
      expand: true,
      cwd: "_sass",
      src: [ "**/*.scss" ],
      dest: "_site/css",
      ext: ".css"
    }],
    options: {
      style: "compressed"
    }
  }
}
