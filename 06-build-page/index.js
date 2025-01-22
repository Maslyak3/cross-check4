const fs = require('fs');
const path = require('path');
const templatehtmlPath = path.join(__dirname, 'template.html');
const distPath = path.join(__dirname, 'project-dist');
const componentshtmlPath = path.join(__dirname, 'components');
fs.mkdir(distPath, { recursive: true }, (err) => {
  if (err) throw err;
});
let indexString = '';
fs.readFile(templatehtmlPath, 'utf-8', (err, data) => {
  if (err) throw err;
  indexString = data;
  processHtmlComponents();
});
processCss();
const srcDirPath = path.join(__dirname, 'assets');
const destDirPath = path.join(distPath, 'assets');
copyDir(srcDirPath, destDirPath);
function processHtmlComponents() {
  fs.readdir(componentshtmlPath, { withFileTypes: true }, (err, files) => {
    if (err) throw err;
    let filesProcessed = 0;
    files.forEach((file) => {
      if (file.isFile() && path.extname(file.name) === '.html') {
        const htmlFilePath = path.join(componentshtmlPath, file.name);
        fs.readFile(htmlFilePath, 'utf-8', (err, data) => {
          if (err) throw err;
          indexString = indexString.replace(
            `{{${path.basename(file.name, path.extname(file.name))}}}`,
            data,
          );
          filesProcessed += 1;
          if (
            filesProcessed ===
            files.filter(
              (file) => file.isFile() && path.extname(file.name) === '.html',
            ).length
          ) {
            const indexPath = path.join(distPath, 'index.html');
            fs.writeFile(indexPath, indexString, (err) => {
              if (err) throw err;
            });
          }
        });
      }
    });
  });
}
function processCss() {
  const srcPath = path.join(__dirname, 'styles');
  const stylecssPath = path.join(distPath, 'style.css');
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
            fs.writeFile(stylecssPath, stylesArr.join('\n'), (err) => {
              if (err) throw err;
            });
          }
        });
      }
    });
  });
}
function copyDir(src, dest) {
  fs.mkdir(dest, { recursive: true }, (err) => {
    if (err) throw err;
  });
  fs.readdir(src, { withFileTypes: true }, (err, entries) => {
    if (err) throw err;
    entries.forEach((entry) => {
      const srcEntryPath = path.join(src, entry.name);
      const destEntryPath = path.join(dest, entry.name);
      if (entry.isDirectory()) {
        copyDir(srcEntryPath, destEntryPath);
      } else {
        fs.copyFile(srcEntryPath, destEntryPath, (err) => {
          if (err) throw err;
        });
      }
    });
  });
}
