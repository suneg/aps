export type Sections = {
  [name: string]: string[];
};

export const DEFAULT = "default";

export class Configuration {
  readonly profiles: Sections;
  #current: string;

  constructor() {
    this.profiles = {};
    this.#current = DEFAULT;
  }

  setActive(profileName: string) {
    this.profiles[DEFAULT] = this.profiles[profileName];
    this.#current = profileName;
  }

  get current(): string {
    return this.#current;
  }
}

export const compile = ({ profiles }: Configuration): string => {
  return Object.keys(profiles)
    .map(name => `[${name}]\n${profiles[name].join("\n")}`)
    .join("\n");
};
