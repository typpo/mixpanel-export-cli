#!/usr/bin/env node

'use strict';

var program = require('commander');
var StringDecoder = require('string_decoder').StringDecoder;
var MixpanelExport = require('mixpanel-data-export');

function list(val) {
  return val.split(',');
}

program
  .option('-f, --from <YYYY-MM-DD>', 'From date (inclusive)')
  .option('-t, --to <YYYY-MM-DD>', 'To date (inclusive)')
  .option('-e, --event <events>', 'Events that you wish to get data for, comma separated', list)
  .option('-w, --where [where]', 'An expression to filter events by (see Mixpanel expressions, https://goo.gl/IWaUH1)')
  .option('-b, --bucket [bucket]', 'The specific data bucket you would like to query')
  .option('-k, --key [key]', 'API key (defaults to env.MIXPANEL_API_KEY)')
  .option('-s, --secret [secret]', 'API secret (defaults to env.MIXPANEL_API_SECRET)')
  .parse(process.argv);

if (!program.from || !program.to || !program.event) {
  console.error('from, to, and event parameters are required. Run with --help for more info.');
  process.exit(1);
}

var key = program.key || process.env.MIXPANEL_API_KEY;
var secret = program.secret || process.env.MIXPANEL_API_SECRET;

if (!key || !secret) {
  console.error('Mixpanel API key and secret are required. Run with --help for more info.');
  process.exit(1);
}

var client = new MixpanelExport({
  api_key: key,
  api_secret: secret,
});

var exportArgs = {
  from_date: program.from,
  to_date: program.to,
  event: program.event,
};
if (program.where) {
  exportArgs.where = program.where;
}
if (program.bucket) {
  exportArgs.bucket = program.bucket;
}

var stream = client.exportStream(exportArgs);

var decoder = new StringDecoder('utf8');

stream.on('data', function(data) {
  console.log(decoder.write(data));
});

stream.on('error', function(err) {
  console.log(decoder.write(err));
});
