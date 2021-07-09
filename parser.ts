type Sections = {
  [name: string]: string[];
};

class Configuration {
  profiles: Sections;
  current: string;

  constructor() {
    this.profiles = {};
    this.current = "test";
  }
}

const isNewSection = (line: string) => {
  return line.match(/\[.*\]/);
};

const areArraysEqual = (a: string[], b: string[]) => {
  if (a.length !== b.length) return false;

  return a
    .map((element, i) => element === b[i])
    .every((equal) => equal === true);
};

const findProfileNameFromDefault = (sections: Sections): string => {
  const defaultConfig = sections["default"];

  const activeName = Object.keys(sections)
    .filter((key) => key != "default")
    .find((key) => areArraysEqual(sections[key], defaultConfig));

  if (!activeName) {
    console.log("Default configuration does not match any named profile.");
    Deno.exit(1);
  }

  return activeName;
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

  configuration.current = findProfileNameFromDefault(configuration.profiles);

  return configuration;
};
