import { JSONSchema7Type } from "json-schema";
import { parseDef } from "../../src/parseDef.js";
import { z } from "zod";
import { getRefs } from "../../src/Refs.js";
import { suite } from "../suite.js";

suite("readonly", (test) => {
  test("should not add readOnly property if enableReadonly is false", (assert) => {
    const parsedSchema = parseDef(
      z.object({}).readonly()._def,
      getRefs({ enableReadonly: false }),
    );
    const jsonSchema: JSONSchema7Type = {
      type: "object",
      properties: {},
      additionalProperties: false,
    };
    assert(parsedSchema, jsonSchema);
  });

  test("should work for objects", (assert) => {
    const parsedSchema = parseDef(
      z.object({}).readonly()._def,
      getRefs({ enableReadonly: true }),
    );
    const jsonSchema: JSONSchema7Type = {
      type: "object",
      properties: {},
      additionalProperties: false,
      readOnly: true,
    };
    assert(parsedSchema, jsonSchema);
  });

  test("should work for nested objects", (assert) => {
    const parsedSchema = parseDef(
      z.object({ nested: z.object({}).readonly() })._def,
      getRefs({ enableReadonly: true }),
    );

    const jsonSchema: JSONSchema7Type = {
      type: "object",
      properties: {
        nested: {
          type: "object",
          properties: {},
          additionalProperties: false,
          readOnly: true,
        },
      },
      required: ["nested"],
      additionalProperties: false,
    };

    assert(parsedSchema, jsonSchema);
  });

  test("should work for arrays", (assert) => {
    const parsedSchema = parseDef(
      z.object({ array: z.array(z.string()).readonly() })._def,
      getRefs({ enableReadonly: true }),
    );

    const jsonSchema: JSONSchema7Type = {
      type: "object",
      properties: {
        array: {
          type: "array",
          readOnly: true,
          items: {
            type: "string",
          },
        },
      },
      required: ["array"],
      additionalProperties: false,
    };

    assert(parsedSchema, jsonSchema);
  });

  test("should work for strings", (assert) => {
    const parsedSchema = parseDef(
      z.object({ string: z.string().readonly() })._def,
      getRefs({ enableReadonly: true }),
    );

    const jsonSchema: JSONSchema7Type = {
      type: "object",
      properties: {
        string: {
          type: "string",
          readOnly: true,
        },
      },
      required: ["string"],
      additionalProperties: false,
    };

    assert(parsedSchema, jsonSchema);
  });
});
