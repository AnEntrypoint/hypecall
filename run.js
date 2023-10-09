/**
 * Initializes the application with the given parameters.
 * @param {Function} runCall - The function to be called when the application is run.
 * @param {Object} [node] - The hyper-ipc-secure node object.
 * @param {Object} [serializedServerKey] - The serialized server key.
 * @param {Object} [serializedCallKey] - The serialized call key.
 * @returns {Object} - The initialized hyper-ipc-secure node object.
 */
const init = (runCall, node = ipc(), serializedServerKey = JSON.parse(Buffer.from(process.env.SERVERKEY, "hex")), serializedCallKey = JSON.parse(Buffer.from(process.env.CALLKEY, "hex"))) => {
  const serverKey = serializedServerKey;
  serverKey.publicKey = Buffer.from(serverKey.publicKey, 'hex');
  serverKey.scalar = Buffer.from(serverKey.scalar, 'hex');
  const callKey = serializedCallKey;
  callKey.publicKey = Buffer.from(callKey.publicKey, 'hex');
  callKey.scalar = Buffer.from(callKey.scalar, 'hex');
  node.lbserve(callKey, serverKey, process.env.IPCNAME, runCall);
  return node;
};

module.exports = init;