"use strict";

exports.lookupContentUnitId = (mapping, sitepage, platform, placement) => {
    if (typeof mapping !== "object") {
        throw new TypeError("Invalid mapping object provided!");
    }

    if (typeof sitepage !== "string" || typeof platform !== "string" || typeof placement !== "string") {
        throw new TypeError("Invalid type: sitepage, platform, placement must be of type string!");
    }

    // fixme implement the lookup
    throw new Error("Not implemented yet.");
};
