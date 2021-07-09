import * as parser from "./parser.ts";
import * as reader from "./reader.ts";
import * as writer from "./writer.ts";
import { compile, DEFAULT } from "./configuration.ts";
import { areArraysEqual } from "./utils.ts";

const [credentialsSource] = await Promise.all([
  reader.readCredentialsFile(),
]);

const credentials = parser.parseConfiguration(credentialsSource);

if (
  Deno.args.length === 0 ||
  areArraysEqual(Deno.args, ["-l"]) ||
  areArraysEqual(Deno.args, ["--list"])
) {
  const output = Object.keys(credentials.profiles)
    .filter((p) => p !== DEFAULT)
    .map((p) => `${p === credentials.current ? "*" : " "} ${p}`)
    .join("\n");

  console.log(output);
} else if (Deno.args.length === 1) {
  if (credentials.current) {
    credentials.setActive(Deno.args[0]);
  }

  writer.writeCredentialsFile(compile(credentials));

  console.log(`Current AWS profile: ${credentials.current}`);
}
