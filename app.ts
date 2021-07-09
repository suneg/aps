import * as parser from "./parser.ts";
import * as reader from "./reader.ts";

const [config, credentials] = await Promise.all([
  reader.readConfigFile(),
  reader.readCredentialsFile(),
]);

const configuration = parser.parseConfiguration(config);

console.log(configuration);