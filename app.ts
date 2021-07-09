#!/usr/bin/env -S deno run --allow-env=HOME --allow-read=${HOME}/.aws/ --allow-write=${HOME}/.aws/

import * as parser from "./parser.ts";
import * as reader from "./reader.ts";
import * as writer from "./writer.ts";
import { compile } from "./configuration.ts";
import { areArraysEqual } from "./utils.ts";

const [configSource, credentialsSource] = await Promise.all([
  reader.readConfigFile(),
  reader.readCredentialsFile(),
]);

const credentials = parser.parseConfiguration(credentialsSource);

if (
  areArraysEqual(Deno.args, ["-l"]) ||
  areArraysEqual(Deno.args, ["--list"])
) {
  const output = Object.keys(credentials.profiles)
    .filter((p) => p !== "default")
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
