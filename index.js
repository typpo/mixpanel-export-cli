var program = require('commander');
var StringDecoder = require('string_decoder').StringDecoder;
var MixpanelExport = require('mixpanel-data-export');

function list(val) {
  return val.split(',');
}

program
  .option('-f, --from YYYY-MM-DD', 'From date (inclusive)',
          /^\d{4}\/(0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])$/)
  .option('-t, --to YYYY-MM-DD', 'To date (inclusive)',
          /^\d{4}\/(0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])$/)
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

var stream = client.exportStream({
  from_date: program.from,
  to_date: program.to,
  event: program.event,
  where: program.where,
  bucket: program.bucket,
});

var decoder = new StringDecoder('utf8');

// Listen on stream data
stream.on('data', function(data) {
  console.log(decoder.write(data));
});

// Listen for a stream error
stream.on('error', function(err) {
  console.log(decoder.write(err));
});

// Listen for the end of the stream
stream.on('end', function() {
  // move on to do other stuff
});
