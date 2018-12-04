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
    "/foo": {
        "mob": { "par": 31 },
        "app": { "par": 32 },
        "web": {
            "par": 33,
            "bil":  34
        }
    },
    "/foo/bar": {
        "mob": { "par": 41 },
        "app": { "par": 42 },
        "web": {
            "par": 43,
            "bil":  44
        }
    },
    "/foo/bar/baz": {
        "mob": { "par": 51 },
        "app": { "par": 52 },
        "web": {
            "par": 53,
            "bil":  54
        }
    }
};

test("lookup fallback sitepage for unmatched sitepage", () => {
    expect(lookupContentUnitId(mapping, "/", "mob", "par")).toBe(11);
    expect(lookupContentUnitId(mapping, "/", "app", "par")).toBe(12);
    expect(lookupContentUnitId(mapping, "/", "web", "par")).toBe(13);
    expect(lookupContentUnitId(mapping, "/", "web", "bil")).toBe(14);

    expect(lookupContentUnitId(mapping, "/xyz", "mob", "par")).toBe(11);
    expect(lookupContentUnitId(mapping, "/xyz", "app", "par")).toBe(12);
    expect(lookupContentUnitId(mapping, "/xyz", "web", "par")).toBe(13);
    expect(lookupContentUnitId(mapping, "/xyz", "web", "bil")).toBe(14);

    expect(lookupContentUnitId(mapping, "/foo/xyz/efg", "mob", "par")).toBe(31);
    expect(lookupContentUnitId(mapping, "/foo/xyz/efg", "app", "par")).toBe(32);
    expect(lookupContentUnitId(mapping, "/foo/xyz/efg", "web", "par")).toBe(33);
    expect(lookupContentUnitId(mapping, "/foo/xyz/efg", "web", "bil")).toBe(34);

    expect(lookupContentUnitId(mapping, "/abc/xyz/efg", "mob", "par")).toBe(11);
    expect(lookupContentUnitId(mapping, "/abc/xyz/efg", "app", "par")).toBe(12);
    expect(lookupContentUnitId(mapping, "/abc/xyz/efg", "web", "par")).toBe(13);
    expect(lookupContentUnitId(mapping, "/abc/xyz/efg", "web", "bil")).toBe(14);
});
