import { areArraysEqual} from "./utils.ts";
import { Sections, Configuration, DEFAULT } from "./configuration.ts";

const isNewSection = (line: string) => {
  return line.match(/\[.*\]/);
};

const findProfileNameFromDefault = (sections: Sections): string => {
  const defaultConfig = sections[DEFAULT];

  const activeName = Object.keys(sections)
    .filter((key) => key != DEFAULT)
    .find((key) => areArraysEqual(sections[key], defaultConfig));

  return activeName || "";
};

export const parseConfiguration = (configSource: string): Configuration => {
  const lines = configSource.split("\n");

  const configuration = new Configuration();

  let currentProfile = null;

  for (const line of lines) {
    if (isNewSection(line)) {
      currentProfile = line.substring(1, line.length - 1);

      configuration.profiles[currentProfile] = [];
      continue;
    }

    if (!currentProfile) {
      console.log("Parse error. Found property outside named profile section.");
      Deno.exit(1);
    }

    configuration.profiles[currentProfile!].push(line);
  }

  if(!configuration.profiles[DEFAULT]) {
    configuration.profiles[DEFAULT] = [];
  }

  configuration.setActive(findProfileNameFromDefault(configuration.profiles));

  return configuration;
};
