#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { fromXlsx } from './fromXlsx';
import { toXlsx } from './toXlsx';

yargs(hideBin(process.argv))
  .command({
    command: 'fromXlsx',
    aliases: ['fx'],
    describe: 'Convert XLSX to JSON',
    handler: (argv) => {
      fromXlsx(argv.source as string, argv.destination as string);
    },
  })
  .command({
    command: 'toXlsx',
    aliases: ['tx'],
    describe: 'Convert JSON to XSLX',
    handler: (argv) => {
      toXlsx(argv.source as string, argv.destination as string);
    },
  })
  .demandCommand()
  .option('source', {
    alias: 's',
    describe: 'Path to Source',
  })
  .option('destination', {
    alias: 'd',
    describe: 'Path to Destination',
  })
  .help().argv;
