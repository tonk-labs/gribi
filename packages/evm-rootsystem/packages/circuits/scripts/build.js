const Circuits = [
    "./helpers",
    // "./kernel"
];


const { exec } = require("child_process");
const util = require("util");
const path = require("path");

// Convert exec to return a promise, for better async/await usage
const execAsync = util.promisify(exec);

async function compileCircuits(circuitPaths) {
  for (const circuitPath of circuitPaths) {
    try {
      // Resolve the absolute path from the relative one
      const fullPath = path.resolve(process.cwd(), circuitPath);

      console.log(`Compiling in ${fullPath}...`);

      // Execute `nargo compile` in the circuit's directory
      const { stdout, stderr } = await execAsync("nargo compile", { cwd: fullPath });

      // Log the output and errors (if any)
      console.log(stdout);
      if (stderr) console.error(stderr);

      console.log(`${fullPath} compilation completed successfully.`);
    } catch (error) {
      // Log any errors that occur during the execution
      console.error(`Error compiling in ${circuitPath}:`, error);
    }
  }
}

// Run the compile function
compileCircuits(Circuits).then(() => console.log("All compilations completed."));