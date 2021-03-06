/*global $, jQuery, CountlyHelpers, countlyCommon*/
(function() {
    var langmap;
    $.ajax({
        type: "GET",
        url: countlyCommon.API_PARTS.data.r + "/langmap",
        dataType: "json",
        data: {"preventRequestAbort": true},
        success: function(json) {
            langmap = json;
        }
    });

    /**
    * Get language name from language code
    * @param {string} code - language code
    * @returns {string} language name
    */
    function getLanguageName(code) {
        if (langmap && langmap[code]) {
            return langmap[code].englishName;
        }
        else {
            return code;
        }
    }

    /** Function gets list of language codes
    * @param {string} name  - language name
    * @returns{array} list if language codes
    */
    function getCodesFromName(name) {
        var codes = [];
        var lowerCase = name.toLowerCase();
        if (langmap) {
            for (var p in langmap) {
                if (langmap[p].englishName.toLowerCase().startsWith(lowerCase)) {
                    codes.push(p);
                }
            }
        }
        return codes;
    }

    CountlyHelpers.createMetricModel(window.countlyLanguage = window.countlyLanguage || {getLanguageName: getLanguageName, getCodesFromName: getCodesFromName}, {name: "langs", estOverrideMetric: "languages"}, jQuery, getLanguageName);
}());