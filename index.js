const fs = require('fs');
const { Command } = require('commander');
const program = new Command();

program
  .name('counter')
  .description('CLI to do file-based tasks')
  .version('0.8.0');

// Add command: Accepts file and element to append
program
  .command('add')
  .description('Add element to a file')
  .argument('<file>', 'file to modify')
  .argument('<element>', 'element to add')  // Second argument for the element
  .action((file, element) => {  // file and element are the arguments
    fs.readFile(file, 'utf-8', (err, data) => {
      if (err) {
        console.log("Error reading file");
      } else {
        data += ' ' + element;  // Append the element
        fs.writeFile(file, data, (err) => {
          if (err) {
            console.log("Error writing to file");
          }
        });
      }
    });
  });

// Remove command: Accepts file and element to remove
program
  .command('remove')
  .description('Remove element from a file')
  .argument('<file>', 'file to modify')
  .argument('<element>', 'element to remove')  // Second argument for the element
  .action((file, element) => {  // file and element are the arguments
    fs.readFile(file, 'utf-8', (err, data) => {
      if (err) {
        console.log("Error reading file");
      } else {
        const arr = data.split(' ');
        const filtered = arr.filter(item => item !== element);  // Remove the element
        const updatedData = filtered.join(' ') + ' ';  // Re-join remaining elements
        fs.writeFile(file, updatedData, (err) => {
          if (err) {
            console.log("Error writing to file");
          }
        });
      }
    });
  });

// Corrected update command: Accepts file, element to update, and new element
program
  .command('update')
  .description('Update element in a file')
  .argument('<file>', 'file to modify')
  .argument('<element>', 'element to update')  // Element to replace
  .argument('<newele>', 'new element')  // New element to add
  .action((file, element, newele) => {  // file, element, and newele are the arguments
    fs.readFile(file, 'utf-8', (err, data) => {
      if (err) {
        console.log("Error reading file");
      } else {
        const arr = data.split(' ');
        let updatedData = "";
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] === element) {
            updatedData += newele;  // Replace with new element
          } else {
            updatedData += arr[i];
          }
          updatedData += " ";
        }
        fs.writeFile(file, updatedData, (err) => {
          if (err) {
            console.log("Error writing to file");
          }
        });
      }
    });
  });

program.parse();
