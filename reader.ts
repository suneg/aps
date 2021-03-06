import * as path from "https://deno.land/std@0.100.0/path/mod.ts";

export const getHomeDirectory = () => {
  const homeDirectory = Deno.env.get("HOME");

  if (!homeDirectory) {
    console.log("No HOME environment variable defined.");
    Deno.exit(1);
  }

  return homeDirectory;
};

export const readConfigFile = () => {
  const configFile = path.join(getHomeDirectory(), ".aws/config");
  return Deno.readTextFile(configFile);
};

export const readCredentialsFile = () => {
  const credentialsFile = path.join(getHomeDirectory(), ".aws/credentials");
  return Deno.readTextFile(credentialsFile);
};
