import * as path from "https://deno.land/std@0.100.0/path/mod.ts";
import { getHomeDirectory } from "./reader.ts";

export const writeCredentialsFile = (content: string) => {
  Deno.writeTextFile(
    path.join(getHomeDirectory(), ".aws/credentials"),
    content,
  );
};
