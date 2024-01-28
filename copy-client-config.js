const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const ncp = require('ncp').ncp;

// Promisify functions for async/await usage
const copy = promisify(ncp);

// Define source and destination directories
const srcDir = path.join(__dirname, 'tmp/apps/client-config');
const destDirBase = path.join(__dirname, 'dist/apps');
const destDir = path.join(destDirBase, 'client-config');

async function deleteAndCopyDirectory(src, dest) {
  try {
    // Check if the destination directory exists and delete its contents
    if (fs.existsSync(dest)) {
      fs.rmSync(dest, { recursive: true, force: true });
      console.log(`Deleted contents of ${dest}`);
    }

    // Ensure the base destination directory exists
    if (!fs.existsSync(destDirBase)) {
      fs.mkdirSync(destDirBase, { recursive: true });
      console.log(`Created base directory: ${destDirBase}`);
    }

    // Create the specific destination directory
    fs.mkdirSync(dest, { recursive: true });
    console.log(`Created directory: ${dest}`);

    // Copy the contents from the source to the destination
    await copy(src, dest, { clobber: false });
    console.log(`Copied contents from ${src} to ${dest}`);
  } catch (error) {
    console.error(`Error occurred: ${error.message}`);
  }
}

// Run the function
deleteAndCopyDirectory(srcDir, destDir);
