const {lookupContentUnitId} = require("../src");

test("test if function is defined", () => {
    expect(typeof lookupContentUnitId).toEqual("function");
});
