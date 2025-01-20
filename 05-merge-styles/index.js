const fs = require('fs');
const path = require('path');
const srcPath = path.join(__dirname, 'styles');
const distPath = path.join(__dirname, 'project-dist', 'bundle.css');
fs.readdir(srcPath, { withFileTypes: true }, (err, files) => {
  if (err) throw err;
  const stylesArr = [];
  let filesProcessed = 0;
  files.forEach((file) => {
    if (file.isFile() && path.extname(file.name) === '.css') {
      const srcFilePath = path.join(srcPath, file.name);
      fs.readFile(srcFilePath, 'utf-8', (err, data) => {
        if (err) throw err;
        stylesArr.push(data);
        filesProcessed += 1;
        if (
          filesProcessed ===
          files.filter(
            (file) => file.isFile() && path.extname(file.name) === '.css',
          ).length
        ) {
          fs.writeFile(distPath, stylesArr.join('\n'), (err) => {
            if (err) throw err;
          });
        }
      });
    }
  });
});
