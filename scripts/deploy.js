const fs = require('fs');
const path = require('path');

// Read the config file
const configPath = path.join(__dirname, '../src/config.ts');
let configContent = fs.readFileSync(configPath, 'utf8');

// Replace Debug with Production in the export
configContent = configContent.replace(
    'Env: Debug',
    'Env: Production'
);

// Write the updated content back to the file
fs.writeFileSync(configPath, configContent);

console.log('Updated config.ts to use Production environment'); 