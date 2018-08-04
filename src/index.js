'use strict'

const Protos = () => [
  require('./tcp')
]

function iterate (protos, options) {
  return protos.filter(proto => !proto.disabled).filter(proto => options[proto.name] || typeof options[proto.name] === 'undefined').map(proto => {
    proto.options = options[proto.name] || {}
    if (proto.children) {
      proto.children = iterate(proto.children, options)
    }
    return proto
  })
}

module.exports = (options) => iterate(Protos(), options || {})
