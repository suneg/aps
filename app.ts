import * as parser from "./parser.ts";
import * as reader from "./reader.ts";
import { areArraysEqual } from "./utils.ts";

const [configSource, credentialsSource] = await Promise.all([
  reader.readConfigFile(),
  reader.readCredentialsFile(),
]);

const config = parser.parseConfiguration(credentialsSource);

//console.log(config)

console.log(Deno.args);
if (
  areArraysEqual(Deno.args, ["-l"]) ||
  areArraysEqual(Deno.args, ["--list"])
) {
  const output = Object.keys(config.profiles)
    .filter((profile) => profile !== "default")
    .map((profile) => `${profile === config.current ? "*" : " "} ${profile}`)
    .join("\n");

  console.log(output);
}

//console.log(`Current AWS profile: ${config.current}`);
