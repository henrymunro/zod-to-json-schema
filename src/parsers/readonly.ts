import { ZodReadonlyDef } from "zod";
import { parseDef } from "../parseDef.js";
import { Refs } from "../Refs.js";

export const parseReadonlyDef = (def: ZodReadonlyDef<any>, refs: Refs) => {
  const schema = parseDef(def.innerType._def, refs);
  if (schema && refs.enableReadonly) {
    schema.readOnly = true;
  }
  return schema;
};
