import { app } from './app.js';
import { config } from './config.js';
import { EventIndexer } from './services/eventIndexer.js';

// Contract event indexer (issue #31). Runs only when contract IDs are
// configured; the poll loop is a no-op until the SDK Soroban RPC read path
// lands. The interval is unref'd so it never blocks process exit.
let eventIndexer: EventIndexer | undefined;
if (config.contractsConfigured) {
  eventIndexer = new EventIndexer({
    contractIds: Object.values(config.contractIds).filter((id): id is string => Boolean(id)),
  });
  eventIndexer.start();
}

const port = config.port;
app.listen(port, () => {
  console.log(`LineProof backend listening on :${port} [${config.nodeEnv}]`);
});

export { app, eventIndexer };
