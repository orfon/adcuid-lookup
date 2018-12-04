"use strict";

/**
 * Looks up a content unit id for the given sitepage / platform / placement in the mapping object.
 *
 * @param mapping {Object} the full mapping of sitepages to a content unit id
 * @param sitepage {string} the sitepage to look up; must not end with a slash
 * @param platform {string} shortcut of the platform, must be one of 'web', 'app', or 'mob'
 * @param placement {string} name of the placement slot, e.g. 'sb' for sitebar
 * @return {?number} a content unit id or null
 */
exports.lookupContentUnitId = (mapping, sitepage, platform, placement) => {
    if (!mapping || typeof mapping !== "object") {
        throw new TypeError("Invalid mapping object provided!");
    }

    if (typeof sitepage !== "string" || typeof platform !== "string" || typeof placement !== "string") {
        throw new TypeError("Invalid type: sitepage, platform, placement must be of type string!");
    }

    // this is the sitepage regex from the JSON schema
    if (/^(\/|(\/[a-z0-9]+)+)$/.test(sitepage) === false) {
        throw new Error("Invalid sitepage!");
    }

    if (sitepage.length > 1) {
        const sitepageParts = sitepage.substring(1).split("/");
        for (let i = sitepageParts.length; i > 0; i--) {
            const matchedMapping = mapping["/" + sitepageParts.slice(0, i).join("/")];
            if (matchedMapping && matchedMapping[platform] && matchedMapping[platform][placement] > 0) {
                return matchedMapping[platform][placement];
            }
        }
    }

    if (mapping["/"] && mapping["/"][platform] && mapping["/"][platform][placement] > 0) {
        return mapping["/"][platform][placement];
    }

    if (mapping["*"] && mapping["*"][platform] && mapping["*"][platform][placement] > 0) {
        return mapping["*"][platform][placement];
    }

    return null;
};
