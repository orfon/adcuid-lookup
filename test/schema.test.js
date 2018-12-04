const schemaObj = require("../src/lookup.schema.json");

const Ajv = require('ajv');
const ajv = new Ajv();
const validate = ajv.compile(schemaObj);
test("test if schema is defined", () => {
    expect(typeof schemaObj).toEqual("object");
});

test("simple sitepage mapping", () => {
    // empty is not allowed
    expect(validate({})).toBe(false);

    // smallest possible mapping
    expect(validate({
        "*": {
            "mob": { "test_placement": 1 },
            "web": { "test_placement": 1 },
            "app": { "test_placement": 1 }
        }
    })).toBe(true);

    // the fallback sitepage '*' is always required
    expect(validate({
        "/foo": {
            "mob": { "test_placement": 1 },
            "web": { "test_placement": 1 },
            "app": { "test_placement": 1 }
        }
    })).toBe(false);

    // only mob | web | app are allowed platform identifiers
    expect(validate({
        "*": {
            "xxx": { "test_placement": 1 },
            "web": { "test_placement": 1 },
            "app": { "test_placement": 1 }
        }
    })).toBe(false);

    // placements are always lowercase strings and at least 2 characters
    expect(validate({
        "*": {
            "mob": { "": 1 },
            "web": { "": 1 },
            "app": { "": 1 }
        }
    })).toBe(false);
    expect(validate({
        "*": {
            "mob": { "A": 1 },
            "web": { "B": 1 },
            "app": { "C": 1 }
        }
    })).toBe(false);
    expect(validate({
        "*": {
            "mob": { "a": 1 },
            "web": { "a": 1 },
            "app": { "a": 1 }
        }
    })).toBe(false);
    expect(validate({
        "*": {
            "mob": { "ab": 1 },
            "web": { "ab": 1 },
            "app": { "ab": 1 }
        }
    })).toBe(true);

    // allow root mappings
    expect(validate({
        "*": {
            "mob": { "abc": 1 },
            "web": { "abc": 1 },
            "app": { "abc": 1 }
        },
        "/": {
            "mob": { "abc": 1 },
            "web": { "abc": 1 },
            "app": { "abc": 1 }
        }
    })).toBe(true);
});

test("simple-mapping.json", () => {
    const simpleMapping = require("./fixtures/simple-mapping.json");
    expect(validate(simpleMapping)).toBe(true);
});
