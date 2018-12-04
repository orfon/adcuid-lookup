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

test("invalid mapping", () => {
    expect(() => lookupContentUnitId("mapping", "/foo/bar", "web", "sb")).toThrowError("Invalid mapping object provided!");
    expect(() => lookupContentUnitId(null, "/foo/bar", "web", "sb")).toThrowError("Invalid mapping object provided!");
    expect(() => lookupContentUnitId(12345, "/foo/bar", "web", "sb")).toThrowError("Invalid mapping object provided!");
});

test("invalid sitepage", () => {
    expect(() => lookupContentUnitId(mapping, "/FOO/bAr", "web", "par")).toThrowError("Invalid sitepage!");
    expect(() => lookupContentUnitId(mapping, " /foo/bar", "web", "par")).toThrowError("Invalid sitepage!");
    expect(() => lookupContentUnitId(mapping, "", "web", "par")).toThrowError("Invalid sitepage!");
    expect(() => lookupContentUnitId(mapping, "/foo/bar/", "web", "par")).toThrowError("Invalid sitepage!");
});

test("invalid platform", () => {
    expect(() => lookupContentUnitId(mapping, "/foo/bar", null, "par")).toThrowError("Invalid type: sitepage, platform, placement must be of type string!");
    expect(() => lookupContentUnitId(mapping, "/foo/bar", 0, "par")).toThrowError("Invalid type: sitepage, platform, placement must be of type string!");
});

test("invalid platform", () => {
    expect(() => lookupContentUnitId(mapping, "/foo/bar", "web")).toThrowError("Invalid type: sitepage, platform, placement must be of type string!");
    expect(() => lookupContentUnitId(mapping, "/foo/bar", "web", null)).toThrowError("Invalid type: sitepage, platform, placement must be of type string!");
    expect(() => lookupContentUnitId(mapping, "/foo/bar", "web", 0)).toThrowError("Invalid type: sitepage, platform, placement must be of type string!");
});
