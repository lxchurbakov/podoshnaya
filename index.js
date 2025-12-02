#!/usr/bin/env node

const { Command } = require('commander');
const program = new Command();

const host = require('./commands/host');

program
  .name('p8a')
  .description('jspod management tool')
  .version('0.8.0');

program
    .command('host')
    .command('start')
    .description('Starts p8a root host')
    .option('--url <url>', 'display just the first substring')
    .option('--port <port>', 'server port number', '3000')
    .action((options) => {
        host.start(options.port);
    });

const remote_command = require('./commands/remote');

const remote = program
    .command('remote')
    .description('manager remote origins');

remote
    .command('add')
    .description('adds remote origin')
    .argument('<name>', 'name of the origin')
    .argument('<url>', 'url of the origin')
    .action((name, url, options) => {
        remote_command.add(name, url);
        console.log(`remote ${name} added`);
    });

remote
    .command('remove')
    .description('remove remote origin')
    .argument('<name>', 'name of the origin')
    .action((name) => {
        remote_command.remove(name);
        console.log(`remote ${name} removed`);
    });

remote
    .command('list')
    .description('lists available remote origins')
    .action(() => {
        const list = remote_command.list();

        for (let key in list) {
            console.log(`${key}: ${list[key]}`);
        }
    });

program.parse();


// const options = program.opts();
// const limit = options.first ? 1 : undefined;
// console.log(program.args[0].split(options.separator, limit));