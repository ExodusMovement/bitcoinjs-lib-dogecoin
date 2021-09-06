// {OP_1-OP16} {2-40 bytes}

const bscript = require('../../script')
const OPS = require('bitcoin-ops')

const FUTURE_SEGWIT_MAX_SIZE = 40
const FUTURE_SEGWIT_MIN_SIZE = 2

function check (script) {
  const buffer = bscript.compile(script)

  const data = buffer.slice(2)
  if (data.length > FUTURE_SEGWIT_MAX_SIZE) return false
  if (data.length < FUTURE_SEGWIT_MIN_SIZE) return false

  const version = buffer[0]
  if (version < OPS.OP_1 || version > OPS.OP_16) return false

  return buffer[1] === data.length
}
check.toJSON = function () { return 'Future witness version output' }

module.exports = {
  check
}
