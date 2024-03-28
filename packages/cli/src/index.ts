import { Command } from 'commander';

const program: Command = new Command();

program
  .name("gribi-cli")
  .description("Utility for working with gribi projects")
  .version("0.0.1");

// Init command
program
  .command('init')
  .description('Initialize a new project config file')
  .action(() => {
    console.log(`This isn't working yet`);
    // Add your init logic here
  });

// Generate command
program
  .command('generate')
  .description('Generate codefiles from your gribi.config.ts')
  .action(() => {
    console.log('Generation process started...');
    // Add your generate logic here
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
