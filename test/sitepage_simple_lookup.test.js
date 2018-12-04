const {lookupContentUnitId} = require("../src");

test("test if function is defined", () => {
    expect(typeof lookupContentUnitId).toEqual("function");
});

const mapping = {
    "*": {
        "mob": { "par": 11 },
        "app": { "par": 12 },
        "web": {
            "par": 13,
            "bil":  14
        }
    },
    "/": {
        "mob": { "par": 21 },
        "app": { "par": 22 },
        "web": {
            "par": 23,
            "bil":  24
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

test("test immuatbility of mapping", () => {
    const clone = Object.assign({}, mapping);
    lookupContentUnitId(mapping, "/foo/bar", "mob", "par");
    expect(mapping).toStrictEqual(clone);
});

test("lookup defined sitepage", () => {
    expect(lookupContentUnitId(mapping, "/", "mob", "par")).toBe(21);
    expect(lookupContentUnitId(mapping, "/", "app", "par")).toBe(22);
    expect(lookupContentUnitId(mapping, "/", "web", "par")).toBe(23);
    expect(lookupContentUnitId(mapping, "/", "web", "bil")).toBe(24);

    expect(lookupContentUnitId(mapping, "/foo", "mob", "par")).toBe(31);
    expect(lookupContentUnitId(mapping, "/foo", "app", "par")).toBe(32);
    expect(lookupContentUnitId(mapping, "/foo", "web", "par")).toBe(33);
    expect(lookupContentUnitId(mapping, "/foo", "web", "bil")).toBe(34);

    expect(lookupContentUnitId(mapping, "/foo/bar", "mob", "par")).toBe(41);
    expect(lookupContentUnitId(mapping, "/foo/bar", "app", "par")).toBe(42);
    expect(lookupContentUnitId(mapping, "/foo/bar", "web", "par")).toBe(43);
    expect(lookupContentUnitId(mapping, "/foo/bar", "web", "bil")).toBe(44);

    expect(lookupContentUnitId(mapping, "/foo/bar/baz", "mob", "par")).toBe(51);
    expect(lookupContentUnitId(mapping, "/foo/bar/baz", "app", "par")).toBe(52);
    expect(lookupContentUnitId(mapping, "/foo/bar/baz", "web", "par")).toBe(53);
    expect(lookupContentUnitId(mapping, "/foo/bar/baz", "web", "bil")).toBe(54);
});

test("lookup sitepage with unmatched suffix", () => {
    expect(lookupContentUnitId(mapping, "/xyz", "mob", "par")).toBe(21);
    expect(lookupContentUnitId(mapping, "/xyz", "app", "par")).toBe(22);
    expect(lookupContentUnitId(mapping, "/xyz", "web", "par")).toBe(23);
    expect(lookupContentUnitId(mapping, "/xyz", "web", "bil")).toBe(24);

    expect(lookupContentUnitId(mapping, "/foo/xyz/efg", "mob", "par")).toBe(31);
    expect(lookupContentUnitId(mapping, "/foo/xyz/efg", "app", "par")).toBe(32);
    expect(lookupContentUnitId(mapping, "/foo/xyz/efg", "web", "par")).toBe(33);
    expect(lookupContentUnitId(mapping, "/foo/xyz/efg", "web", "bil")).toBe(34);

    expect(lookupContentUnitId(mapping, "/abc/xyz/efg", "mob", "par")).toBe(21);
    expect(lookupContentUnitId(mapping, "/abc/xyz/efg", "app", "par")).toBe(22);
    expect(lookupContentUnitId(mapping, "/abc/xyz/efg", "web", "par")).toBe(23);
    expect(lookupContentUnitId(mapping, "/abc/xyz/efg", "web", "bil")).toBe(24);
});
