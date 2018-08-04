# teletunnel-protocols

Protocol definitions and matchers for the teletunnel protocol

## API

`Protocols(options)`:

`options` are the individual per-protocol options that are needed for some protos to work

This object can also be used to disable protos by setting the proto name to false

## Protocols

 - `ssh`: SSH v2 protocol. Does not support `/stream`
 - `ssl`: SSL/TLS as provided by the `tls` module
  - `connection`: SSL/TLS options as documented [here](https://nodejs.org/api/tls.html#tls_tls_createserver_options_secureconnectionlistener)
