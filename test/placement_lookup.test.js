const {lookupContentUnitId} = require("../src");
const mapping = {
    "*": {
        "mob": { "par": 11 },
        "app": { "par": 12 },
        "web": {
            "par": 13,
            "bil":  14
        }
    },
    "/foo/bar": {
        "mob": { "par": 41 },
        "app": { "par": 42 },
        "web": {
            "par": 43,
            "bil":  44
        }
    }
};

test("lookup parallel placements", () => {
    expect(lookupContentUnitId(mapping, "/invalid/path", "web", "par")).toBe(13);
    expect(lookupContentUnitId(mapping, "/invalid/path", "web", "bil")).toBe(14);
    expect(lookupContentUnitId(mapping, "/foo/bar", "web", "par")).toBe(43);
    expect(lookupContentUnitId(mapping, "/foo/bar", "web", "bil")).toBe(44);
});

test("fail lookup and return null because of undefined placement", () => {
    expect(lookupContentUnitId(mapping, "/invalid/path", "web", "box")).toBeNull();
    expect(lookupContentUnitId(mapping, "/foo/bar", "web", "box")).toBeNull();
});
