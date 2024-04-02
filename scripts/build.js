const { execSync } = require('child_process');
const path = require('path');

// List of packages in the order you want to run `pnpm i` and `pnpm build`
const packageOrder = [
    'packages/circuits',
    'packages/types',
    'packages/evm-rootsystem/packages/circuits',
    'packages/evm-rootsystem/packages/contracts',
    'packages/evm-rootsystem/packages/client',
    'packages/vault',
    'packages/mud-integration/packages/client',
];

// Function to run a command in a given directory
function runCommandInDir(command, dir) {
    try {
        console.log(`Running "${command}" in ${dir}`);
        execSync(command, {
            cwd: dir,
            stdio: 'inherit', // This will show the command output in the console
        });
    } catch (error) {
        console.error(`Failed to run "${command}" in ${dir}: ${error}`);
        process.exit(1); // Exit script with error
    }
}

// Function to process packages in the specified order
function processPackages(packages) {
    packages.forEach(packageDir => {
        const fullDirPath = path.join(__dirname, "..", packageDir);
        runCommandInDir('pnpm i', fullDirPath); // Install dependencies
        runCommandInDir('pnpm build', fullDirPath); // Build package
    });
}

// Start the process
processPackages(packageOrder);