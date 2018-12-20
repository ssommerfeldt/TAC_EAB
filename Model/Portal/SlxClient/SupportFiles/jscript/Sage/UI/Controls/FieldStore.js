/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/UI/Controls/FieldStore", [
    'dojo/string',
    'dojo/_base/declare',
    "dojo/_base/lang",
    'dojo/store/Memory',
    'dojo/i18n!./nls/PropertyStore',
    'Sage/UI/Controls/FieldPropertyObject'
],
function (
    dString,
    declare,
    lang,
    memory,
    nlsResource,
    FieldPropertyObject
) {


    var FieldStoreModel = declare('Sage.UI.Controls.FieldStore', null, {
        typeStore: null,
        _nlsResource: null,
        isUnicode: false,
        blankTemplate: null,

        // queryOptions contains the 3 different type filters.
        constructor: function (queryOptions) {
            this._nlsResource = nlsResource;
            this.populateSystemOptions();

            this.blankTemplate = new FieldPropertyObject("", "", this.isUnicode);

            //FieldPropertyObject({type id}, {localized name}, {db encoding=unicode?}, {This type is currently supported})
            // all types should be in this list since it is used to get the localized type name.
            this.typeStore = new memory({
                data: [
                    // property types; type=base
                        new FieldPropertyObject('47f90249-e4c8-4564-9ae6-e1fa9904f8b8', this._nlsResource['integer'], this.isUnicode, true),            // integer
                        new FieldPropertyObject('f37c635c-9fbf-40d8-98d5-750a54a3cca1', this._nlsResource['double'], this.isUnicode, true),             // double
                        new FieldPropertyObject('a6bf2690-3477-4a18-9849-56abf8693934', this._nlsResource['single'], this.isUnicode, true),             // single
                        new FieldPropertyObject('2596d57d-89d6-4b72-9036-b18c64c5324c', this._nlsResource['decimal'], this.isUnicode, true),            // decimal
                        new FieldPropertyObject('6b0b3d51-0728-4b67-9473-52836a81da53', this._nlsResource['short'], this.isUnicode, true),              // short
                        new FieldPropertyObject('30053f5a-8d40-4db1-b185-1e4128eb26cc', this._nlsResource['standardId'], this.isUnicode, true),         // standard id
                        new FieldPropertyObject('92432b4d-8206-4a96-ba7b-e4cbd374f148', this._nlsResource['trueFalse'], this.isUnicode, true),          // true/false
                        new FieldPropertyObject('95ca9d52-6f0b-4a96-bd40-43583f41faf8', this._nlsResource['yesNo'], this.isUnicode, true),              // yesNo
                        new FieldPropertyObject('3edc7c52-e711-431d-b150-969d88ebabf4', this._nlsResource['boolean'], this.isUnicode, true),            // boolean
                        new FieldPropertyObject('1f08f2eb-87c8-443b-a7c2-a51f590923f5', this._nlsResource['dateTime'], this.isUnicode, true),           // dateTime
                        new FieldPropertyObject('31e8638d-4232-4c61-8827-d94132a33887', this._nlsResource['email'], this.isUnicode, true),              // email
                        new FieldPropertyObject('85f2bba5-1fb7-4ecf-941a-d98d4739c305', this._nlsResource['phone'], this.isUnicode),                    // phone
                        new FieldPropertyObject('b71918bf-fac1-4b62-9ed5-0b0294bc9900', this._nlsResource['pickList'], this.isUnicode, true),           // picklist
                        new FieldPropertyObject('17541523-fc31-4269-ac97-df63290d0e31', this._nlsResource['owner'], this.isUnicode, true),              // owner
                        new FieldPropertyObject('a3b52518-801b-44be-96bf-fdca3de84f7f', this._nlsResource['lookup'], this.isUnicode, false),            // lookup
                        new FieldPropertyObject('517d5e69-9efa-4d0a-8e7a-1c7691f921ba', this._nlsResource['dependencyLookup'], this.isUnicode, false),  // dependency lookup
                        new FieldPropertyObject('189a1a4e-396c-4146-95c0-93b5d9e7d160', this._nlsResource['char'], this.isUnicode, true),               // character
                        new FieldPropertyObject('8edd8fce-2be5-4d3d-bedd-ea667e78a8af', this._nlsResource['enum_'], this.isUnicode, false),             // enumeration
                        new FieldPropertyObject('3ca925e1-4b76-4621-a39c-a0d4cb7327d5', this._nlsResource['guid'], this.isUnicode, true),               // guid
                        new FieldPropertyObject('68e04249-f7e2-4b63-90be-55fbb1f4aa77', this._nlsResource['byte'], this.isUnicode, true),               // byte
                        new FieldPropertyObject('07370ef3-ad24-409f-86a8-ff2db5ee6d69', this._nlsResource['binary'], this.isUnicode, true),             // binary
                        new FieldPropertyObject('5685161e-5f0a-4a36-83fe-89e8e462e9e7', this._nlsResource['url'], this.isUnicode, true),                // url
                        new FieldPropertyObject('f750817f-73ad-4bf3-b2de-bd0f5cc47dfd', this._nlsResource['calcSF'], this.isUnicode, true),             // calculated string field 
                        new FieldPropertyObject('44bc190a-99f3-4fa9-98a3-d5b2336d6e7c', this._nlsResource['calcNF'], this.isUnicode, true),             // calculated number field 
                        new FieldPropertyObject('76c537a8-8b08-4b35-84cf-fa95c6c133b0', this._nlsResource['text'], this.isUnicode, this.isUnicode),     // Text (unicode)
                        new FieldPropertyObject('b2ed309e-ea89-4eef-8051-6244987953a4', this._nlsResource['memo'], this.isUnicode, this.isUnicode),     // Memo (unicode)
                        new FieldPropertyObject('ccc0f01d-7ba5-408e-8526-a3f942354b3a', this._nlsResource['text'], this.isUnicode, !this.isUnicode),    // Text
                        new FieldPropertyObject('f4ca6023-9f5f-4e41-8571-50ba94e8f233', this._nlsResource['memo'], this.isUnicode, !this.isUnicode)     // Memo
                ]
            });
        },
        _addSystemIfNeeded: function (strVal) {
            if (strVal.indexOf("System") < 0) {
                strVal = dString.substitute("System.${0}", [strVal]);
            }
            return strVal;
        },
        query: function (queryOptions) {
            var typeIdArg = null;
            var parentTypeArg = null;

            if (typeof (queryOptions) !== "undefined") {
                if (typeof (queryOptions.superType) !== "undefined" && queryOptions.superType !== null) { // apply a filter to the superType ie if the type is text it is apart of the string superType
                    parentTypeArg = queryOptions.superType;
                    if (lang.isArray(parentTypeArg)) {
                        for (var i = 0; i < parentTypeArg.length; i++) {
                            parentTypeArg[i] = this._addSystemIfNeeded(parentTypeArg[i]);
                        }
                    }
                    else {
                        parentTypeArg = this._addSystemIfNeeded(parentTypeArg);
                    }
                }
                // apply a filter to the id... assuming one knows the id ahead of time
                if (typeof (queryOptions.typeId) !== "undefined" && queryOptions.typeId !== null) { 
                    typeIdArg = queryOptions.typeId;
                }
            }

            var data = this.typeStore.query(
                function (curr) {
                    var include = true;

                    // handles the relationship between the lookup by id and lookup by a readable name, which is for now if either match then include.
                    var tmp = false; 
                    if (parentTypeArg !== null) {
                        tmp = parentTypeArg.indexOf(curr.ClrDataType) >= 0;
                        include = tmp;
                    }

                    if (typeIdArg !== null) {
                        tmp = tmp || parentTypeArg.indexOf(curr.id) >= 0;
                        include = tmp; 
                    }
                    return include;
                });

            return new memory({ data: data }); // place in a memory object incase user wants to reference via index.
        },

        queryByKeyWordsAllMatch: function (keywords) {
            var data = this.typeStore.query(
                function (curr) {
                    var include = false;
                    for (var i = 0; i < keywords.length; i++) {
                        var k = keywords[i];
                        var v = false;
                        if (curr[k.name] === k.value) {
                            v = true;
                            if (i === 0) {
                                include = true;
                            }
                        }
                        include = include && v;
                    }
                    return include;
                });

            return new memory({ data: data }); // place in a memory object incase user wants to reference via index.
        },
        queryByKeywordsOneMatchMatch: function (keywords) {
            var data = this.typeStore.query(
                function (curr) {
                    for (var i = 0; i < keywords.length; i++) {
                        var k = keywords[i];
                        if (curr[k.name] === k.value) {
                            return true;
                        }
                    }
                    return false;
                });

            return new memory({ data: data }); // place in a memory object incase user wants to reference via index.
        },
        // Handles querying for the User Options
        populateSystemOptions: function () {
            var callback = this._receivedUnicode;
            var selfContext = this;
            var optionsSvc = Sage.Services.getService('SystemOptions');
            if (optionsSvc) {
                optionsSvc.get('Unicode',
                    function (v) {
                        callback(v, selfContext);
                    });
            }
        },
        // once options are recieved, set the appropreate attributes.
        _receivedUnicode: function (value, selfContext) {
            selfContext.isUnicode = value ? value.toLowerCase() === "true" : false; // we want to display a selector column
        }

    });
    return FieldStoreModel;
});

