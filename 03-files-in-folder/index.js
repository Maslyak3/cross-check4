const fs = require('fs');
const path = require('path');
const { stdout } = process;
const dirPath = path.join(__dirname, 'secret-folder');
fs.readdir(dirPath, { withFileTypes: true }, (err, files) => {
  if (err) throw err;
  stdout.write(
    `information about files contained directly within 03-files-in-folder/secret-folder:\n`,
  );
  files.forEach((file) => {
    if (file.isFile()) {
      const filePath = path.join(dirPath, file.name);
      fs.stat(filePath, (err, stats) => {
        if (err) throw err;
        stdout.write(
          `${path.basename(file.name, path.extname(file.name))} - ${path
            .extname(file.name)
            .slice(1)} - ${stats.size / 1024}kb\n`,
        );
      });
    }
  });
});
