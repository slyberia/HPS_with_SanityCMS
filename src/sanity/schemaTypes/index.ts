import type { SchemaTypeDefinition } from "sanity";

import { post } from "./post";
import { project } from "./project";
import { service } from "./service";
import { siteSettings } from "./siteSettings";
import { teamMember } from "./teamMember";

export const schemaTypes: SchemaTypeDefinition[] = [
  siteSettings,
  service,
  project,
  post,
  teamMember,
];
