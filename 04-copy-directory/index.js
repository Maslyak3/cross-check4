function copyDir(src) {
  const fs = require('fs');
  const path = require('path');
  fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {
    if (err) throw err;
  });
  const srcDir = path.join(__dirname, src);
  const distDir = path.join(__dirname, 'files-copy');
  fs.readdir(srcDir, (err, files) => {
    if (err) throw err;
    files.forEach((file) => {
      const srcFilePath = path.join(srcDir, file);
      const distFilePath = path.join(distDir, file);
      fs.copyFile(srcFilePath, distFilePath, (err) => {
        if (err) throw err;
      });
    });
  });
}
copyDir('files');
