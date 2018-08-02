# teletunnel-protocols

Protocol definitions and matchers for the teletunnel protocol

## API

`Protocols(options)`:

`options` are the individual per-protocol options that are needed for some protos to work

This object can also be used to disable protos by setting the proto name to false

- `ssl`:
  - `SNICallback`: Docs [ » TLS.createServer ](https://nodejs.org/api/tls.html#tls_tls_createserver_options_secureconnectionlistener)
