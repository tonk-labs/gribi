import { Command } from 'commander';

const program: Command = new Command();

program
  .name("gribi-cli")
  .description("Gribi command line tool helps you to work with Gribi in your projects.")
  .version("0.0.1");

// Init command
const module = program
  .command('module')
  .description('Helpful actions when working with modules')

module
  .command('init')
  .argument('<template>', 'description or path to module template')
  .description('Initialize a new module using the module template')
  .action(() => {
    console.log(`This isn't working yet`);
    // Add your init logic here
  });

// Help command is built-in, but you can customize it
program
  .command('help')
  .description('Display help information')
  .action(() => {
    program.help();
  });

// Parse the arguments
program.parse(process.argv);
