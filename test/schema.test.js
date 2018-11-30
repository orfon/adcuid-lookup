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
            "mob": { "*": 1 },
            "web": { "*": 1 },
            "app": { "*": 1 }
        }
    })).toBe(true);

    // the fallback sitepage '*' is always required
    expect(validate({
        "/foo": {
            "mob": { "*": 1 },
            "web": { "*": 1 },
            "app": { "*": 1 }
        }
    })).toBe(false);

    // only mob | web | app are allowed platform identifiers
    expect(validate({
        "*": {
            "xxx": { "*": 1 },
            "web": { "*": 1 },
            "app": { "*": 1 }
        }
    })).toBe(false);

    // placements are always lowercase strings
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
});

test("simple-mapping.json", () => {
    const simpleMapping = require("./fixtures/simple-mapping.json");
    expect(validate(simpleMapping)).toBe(true);
});
