const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Create CLI interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const baseDir = path.join(__dirname, 'files');

// Ensure 'files' folder exists
if (!fs.existsSync(baseDir)) {
  fs.mkdirSync(baseDir);
}

// Show menu
const showMenu = () => {
  console.log('\nFile Manager Options:');
  console.log('1. Create File');
  console.log('2. Read File');
  console.log('3. Rename File');
  console.log('4. Delete File');
  console.log('5. List Files');
  console.log('6. Exit\n');

  rl.question('Enter your choice: ', (choice) => {
    switch (choice.trim()) {
      case '1':
        createFile();
        break;
      case '2':
        readFile();
        break;
      case '3':
        renameFile();
        break;
      case '4':
        deleteFile();
        break;
      case '5':
        listFiles();
        break;
      case '6':
        rl.close();
        break;
      default:
        console.log('Invalid choice');
        showMenu();
    }
  });
};

const createFile = () => {
  rl.question('Enter file name: ', (filename) => {
    rl.question('Enter file content: ', (content) => {
      fs.writeFile(path.join(baseDir, filename), content, (err) => {
        if (err) return console.log('Error:', err);
        console.log('File created successfully.');
        showMenu();
      });
    });
  });
};

const readFile = () => {
  rl.question('Enter file name to read: ', (filename) => {
    fs.readFile(path.join(baseDir, filename), 'utf-8', (err, data) => {
      if (err) return console.log('Error:', err.message);
      console.log('\n--- File Content ---');
      console.log(data);
      console.log('--------------------');
      showMenu();
    });
  });
};

const renameFile = () => {
  rl.question('Enter current file name: ', (oldName) => {
    rl.question('Enter new file name: ', (newName) => {
      fs.rename(path.join(baseDir, oldName), path.join(baseDir, newName), (err) => {
        if (err) return console.log('Error:', err.message);
        console.log('File renamed successfully.');
        showMenu();
      });
    });
  });
};

const deleteFile = () => {
  rl.question('Enter file name to delete: ', (filename) => {
    fs.unlink(path.join(baseDir, filename), (err) => {
      if (err) return console.log('Error:', err.message);
      console.log('File deleted successfully.');
      showMenu();
    });
  });
};

const listFiles = () => {
  fs.readdir(baseDir, (err, files) => {
    if (err) return console.log('Error:', err.message);
    console.log('\nFiles in directory:');
    files.forEach(file => console.log('- ' + file));
    showMenu();
  });
};

// Start program
console.log('Welcome to the File Manager!');
showMenu();
