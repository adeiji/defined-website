const fs = require('fs');
const path = require('path');

// Read the config file
const configPath = path.join(__dirname, '../src/config.ts');
let configContent = fs.readFileSync(configPath, 'utf8');

// Replace Production with Debug in the export
configContent = configContent.replace(
    'Env: Production',
    'Env: Debug'
);

// Write the updated content back to the file
fs.writeFileSync(configPath, configContent);

console.log('Updated config.ts back to Debug environment after deployment'); 