import { createClient } from "urql";

export const urqlClient = createClient({
  url: "https://api.thegraph.com/subgraphs/name/dhedge/dhedge-v2-optimism",
});
