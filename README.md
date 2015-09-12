## Mixpanel Data Export Tool

This is a command line tool that exports data from Mixpanel using the [Mixpanel Data Export API](https://mixpanel.com/docs/api-documentation/data-export-api).

Per the Mixpanel Data Export API, output format is JSONL, ie. a JSON object on each line.

### Install

`npm install -g mixpanel-export-cli`

### Usage

Example: `mixpanel-export --from 2015-09-08 --to 2015-09-10 --event "CTA click,Login"`

Full details:

    Usage: mixpanel-export --from <YYYY-MM-DD> --to <YYYY-MM-DD> --event <events> [options]

    Options:

    -h, --help               output usage information
    -f, --from <YYYY-MM-DD>  From date (inclusive)
    -t, --to <YYYY-MM-DD>    To date (inclusive)
    -e, --event <events>     Events that you wish to get data for, comma separated
    -w, --where [where]      An expression to filter events by (see Mixpanel expressions, https://goo.gl/IWaUH1)
    -b, --bucket [bucket]    The specific data bucket you would like to query
    -k, --key [key]          API key (defaults to env.MIXPANEL_API_KEY)
    -s, --secret [secret]    API secret (defaults to env.MIXPANEL_API_SECRET)

Set `MIXPANEL_API_KEY` and `MIXPANEL_API_SECRET` in your environment to avoid having to specify --key and --secret each time.
