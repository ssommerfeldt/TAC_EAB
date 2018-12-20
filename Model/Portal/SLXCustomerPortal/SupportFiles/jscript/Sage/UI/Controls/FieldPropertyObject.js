/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/UI/Controls/FieldPropertyObject", [
    'dojo/string',
    'dojo/_base/declare',
    'dojo/store/Memory',
    'dojo/i18n!./nls/PropertyStore',
    'dojo/_base/lang'
],
function (
    dString,
    declare,
    memory,
    nlsResource,
    lang
) {
    var base =
        {
            ClrDataType: '',
            SqlType: '',
            ThisObj: '',

            //categrories
            number: false,
            calculated: false,
            idType: false,
            bitType: false,
            complex: false,
            isBoolean: false,
            dateTime: false,

            initializeBaseData: function () {
                switch (this.id) {
                    //BASE
                    case 'a6bf2690-3477-4a18-9849-56abf8693934': //single
                        this.ClrDataType = "System.Single";
                        this.SqlType = "Single";
                        this.ThisObj = "Single";
                        this.number = true;
                        break;
                    case '6b0b3d51-0728-4b67-9473-52836a81da53': //short
                        this.ClrDataType = "System.Int16";
                        this.SqlType = "Int16";
                        this.ThisObj = "Short Integer";
                        this.number = true;
                        break;
                    case '47f90249-e4c8-4564-9ae6-e1fa9904f8b8': //integer
                        this.ClrDataType = "System.Int32";
                        this.SqlType = "Int32";
                        this.ThisObj = "Integer";
                        this.number = true;
                        break;
                    case '95ca9d52-6f0b-4a96-bd40-43583f41faf8': //yesNo
                        this.ClrDataType = "System.Boolean";
                        this.SqlType = "AnsiStringFixesLength";
                        this.ThisObj = "Yes/No";
                        this.isBoolean = true;
                        break;
                    case '3edc7c52-e711-431d-b150-969d88ebabf4': //boolean
                        this.ClrDataType = "System.Boolean";
                        this.SqlType = "Boolean";
                        this.ThisObj = "Boolean";
                        this.isBoolean = true;
                        break;
                    case '1f08f2eb-87c8-443b-a7c2-a51f590923f5': //dateTime
                        this.ClrDataType = "System.DateTime";
                        this.SqlType = "DateTime";
                        this.ThisObj = "DateTime";
                        this.dateTime = true;
                        break;
                    case '189a1a4e-396c-4146-95c0-93b5d9e7d160': //char
                        this.ClrDataType = "System.Char";
                        this.SqlType = "AnsiString(Length=1)";
                        this.ThisObj = "Char";
                        break;
                    case '68e04249-f7e2-4b63-90be-55fbb1f4aa77': //byte
                        this.ClrDataType = "System.Byte";
                        this.SqlType = "Byte";
                        this.ThisObj = "Byte";
                        this.bitType = true;
                        break;

                        //Length&ENCRYPTED
                    case 'ccc0f01d-7ba5-408e-8526-a3f942354b3a': //text
                        this.ClrDataType = "System.String";
                        this.SqlType = "AnsiString";
                        this.ThisObj = "Text";
                        break;
                    case 'f4ca6023-9f5f-4e41-8571-50ba94e8f233': //memo
                        this.ClrDataType = "System.String";
                        this.SqlType = "AnsiString";
                        this.ThisObj = "Memo";
                        break;
                    case '31e8638d-4232-4c61-8827-d94132a33887': //email
                        this.ClrDataType = "System.String";
                        this.SqlType = "AnsiString";
                        this.ThisObj = "Email";
                        break;
                    case '07370ef3-ad24-409f-86a8-ff2db5ee6d69': //binary
                        this.ClrDataType = "System.Byte[]";
                        this.SqlType = "Binary";
                        this.ThisObj = "Binary";
                        this.bitType = true;
                        break;
                    case '76c537a8-8b08-4b35-84cf-fa95c6c133b0': //unicodetext
                        this.ClrDataType = "System.String";
                        this.SqlType = "String";
                        this.ThisObj = "Unicode Text";
                        break;
                    case 'b2ed309e-ea89-4eef-8051-6244987953a4': //unicodeMemo
                        this.ClrDataType = "System.String";
                        this.SqlType = "String";
                        this.ThisObj = "Unicode Memo";
                        break;
                    case 'f750817f-73ad-4bf3-b2de-bd0f5cc47dfd': //calculatedString
                        this.ClrDataType = "System.String";
                        this.SqlType = "AnsiString";
                        this.ThisObj = "Calculated String field";
                        this.calculated = true;
                        break;
                    case '5685161e-5f0a-4a36-83fe-89e8e462e9e7': //url
                        this.ClrDataType = "System.String";
                        this.SqlType = "AnsiString";
                        this.ThisObj = "URL";
                        break;
                    case '85f2bba5-1fb7-4ecf-941a-d98d4739c305': //phone
                        this.ClrDataType = "System.String";
                        this.SqlType = "AnsiString";
                        this.ThisObj = "Phone Number";
                        break;
                    case '2596d57d-89d6-4b72-9036-b18c64c5324c': //decimal
                        this.ClrDataType = "System.Decimal";
                        this.SqlType = "Decimal";
                        this.ThisObj = "Decimal";
                        this.number = true;
                        break;
                    case 'f37c635c-9fbf-40d8-98d5-750a54a3cca1': //double
                        this.ClrDataType = "System.Double";
                        this.SqlType = "Double";
                        this.ThisObj = "Double";
                        this.number = true;
                        break;
                    case '44bc190a-99f3-4fa9-98a3-d5b2336d6e7c': //calculatedNumber
                        this.ClrDataType = "System.Double";
                        this.SqlType = "Double";
                        this.ThisObj = "Calculated Numeric Field";
                        this.number = true;
                        this.calculated = true;
                        break;
                    case '30053f5a-8d40-4db1-b185-1e4128eb26cc': //standardId
                        this.ClrDataType = "System.String";
                        this.SqlType = "AnsiStringFixedLength";
                        this.ThisObj = "Standard Id";
                        this.idType = true;
                        break;
                    case '17541523-fc31-4269-ac97-df63290d0e31': //owner
                        this.ClrDataType = "System.String";
                        this.SqlType = "AnsiStringFixedLength";
                        this.ThisObj = "owner";
                        break;
                    case '92432b4d-8206-4a96-ba7b-e4cbd374f148': //trueFalse
                        this.ClrDataType = "System.Boolean";
                        this.SqlType = "AnsiStringFixedLength";
                        this.ThisObj = "True/False";
                        this.isBoolean = true;
                        break;
                    case 'b71918bf-fac1-4b62-9ed5-0b0294bc9900': //pickList
                        this.ClrDataType = "System.String";
                        this.SqlType = "AnsiString";
                        this.ThisObj = "PickList";
                        this.complex = true;
                        break;
                    case 'a3b52518-801b-44be-96bf-fdca3de84f7f': //lookup
                        this.ClrDataType = "System.String";
                        this.SqlType = "AnsiString";
                        this.ThisObj = "Lookup";
                        this.complex = true;
                        break;
                    case '517d5e69-9efa-4d0a-8e7a-1c7691f921ba': //dependencyLookup
                        this.ClrDataType = "System.String";
                        this.SqlType = "AnsiString";
                        this.ThisObj = "Dependency Lookup";
                        this.complex = true;
                        break;
                    case '8edd8fce-2be5-4d3d-bedd-ea667e78a8af': //enum
                        this.ClrDataType = "System.Enum";
                        this.SqlType = "AnsiString(Length=255)";
                        this.ThisObj = "Enum";
                        this.complex = true;
                        break;
                    case '3ca925e1-4b76-4621-a39c-a0d4cb7327d5': //guid
                        this.ClrDataType = "System.Guid";
                        this.SqlType = "Guid";
                        this.ThisObj = "Guid";
                        this.idType = true;
                        break;
                }
            }
        };
    var Length =
        {
            Length: 0,

            initializeLengthData: function () {
                switch (this.id) {
                    //BASE
                    case 'a6bf2690-3477-4a18-9849-56abf8693934': //single
                        this.Length = 64;
                        this.SqlType = dString.substitute("${0}(Length=${1})", [this.SqlType, this.Length]);
                        break;
                    case '95ca9d52-6f0b-4a96-bd40-43583f41faf8': //yesNo
                        this.Length = 1;
                        this.SqlType = dString.substitute("${0}(Length=${1})", [this.SqlType, this.Length]);
                        break;

                        //Length&ENCRYPTED
                    case 'ccc0f01d-7ba5-408e-8526-a3f942354b3a': //text
                        this.Length = 255;
                        this.SqlType = dString.substitute("${0}(Length=${1})", [this.SqlType, this.Length]);
                        break;
                    case 'f4ca6023-9f5f-4e41-8571-50ba94e8f233': //memotext
                        this.Length = 2147483647;
                        this.SqlType = dString.substitute("${0}(Length=${1})", [this.SqlType, this.Length]);
                        break;
                    case '31e8638d-4232-4c61-8827-d94132a33887': //email
                        this.Length = 128;
                        this.SqlType = dString.substitute("${0}(Length=${1})", [this.SqlType, this.Length]);
                        break;
                    case '07370ef3-ad24-409f-86a8-ff2db5ee6d69': //binary
                        this.Length = 8000;
                        this.SqlType = dString.substitute("${0}(Length=${1})", [this.SqlType, this.Length]);
                        break;
                    case '76c537a8-8b08-4b35-84cf-fa95c6c133b0': //unicodetext
                        this.Length = 255;
                        this.SqlType = dString.substitute("${0}(Length=${1})", [this.SqlType, this.Length]);
                        break;
                    case 'b2ed309e-ea89-4eef-8051-6244987953a4': //unicodeMemo
                        this.Length = 2147483647;
                        this.SqlType = dString.substitute("${0}(Length=${1})", [this.SqlType, this.Length]);
                        break;
                    case 'f750817f-73ad-4bf3-b2de-bd0f5cc47dfd': //calculatedString
                        this.Length = 255;
                        this.SqlType = dString.substitute("${0}(Length=${1})", [this.SqlType, this.Length]);
                        break;
                    case '5685161e-5f0a-4a36-83fe-89e8e462e9e7': //url
                        this.Length = 150;//2147483647;
                        this.SqlType = dString.substitute("${0}(Length=${1})", [this.SqlType, this.Length]);
                        break;
                    case '85f2bba5-1fb7-4ecf-941a-d98d4739c305': //phone
                        this.Length = 255;
                        this.SqlType = dString.substitute("${0}(Length=${1})", [this.SqlType, this.Length]);
                        break;
                    case '30053f5a-8d40-4db1-b185-1e4128eb26cc': //standardId
                        this.Length = 12;
                        this.SqlType = dString.substitute("${0}(Length=${1})", [this.SqlType, this.Length]);
                        break;
                    case '17541523-fc31-4269-ac97-df63290d0e31': //owner
                        this.Length = 12;
                        this.SqlType = dString.substitute("${0}(Length=${1})", [this.SqlType, this.Length]);
                        break;
                    case '92432b4d-8206-4a96-ba7b-e4cbd374f148': //trueFalse
                        this.Length = 1;
                        this.SqlType = dString.substitute("${0}(Length=${1})", [this.SqlType, this.Length]);
                        break;
                    case 'b71918bf-fac1-4b62-9ed5-0b0294bc9900': //pickList
                        this.Length = 64;
                        this.SqlType = dString.substitute("${0}(Length=${1})", [this.SqlType, this.Length]);
                        break;
                    case 'a3b52518-801b-44be-96bf-fdca3de84f7f': //lookup
                        this.Length = 64;
                        this.SqlType = dString.substitute("${0}(Length=${1})", [this.SqlType, this.Length]);
                        break;
                    case '517d5e69-9efa-4d0a-8e7a-1c7691f921ba': //dependencyLookup
                        this.Length = 64;
                        this.SqlType = dString.substitute("${0}(Length=${1})", [this.SqlType, this.Length]);
                        break;

                }
            }
        };
    var encrypted =
                {
                    IsEncrypted: false

                };
    var PrecisionScale =
        {
            Precision: 17,
            Scale: 4,

            initializePrecisionScaleData: function () {
                this.SqlType = dString.substitute("${0}(Precision=${1},Scale=${2})", [this.SqlType, this.Precision, this.Scale]);
            }
        };
    var IsPercentage =
        {
            IsPercentage: false
        };
    var Storage =
        {
            Display: '',
            Storage: '',
            StorageOptions: [],
            DisplayOptions: [],

            initializeStorageData: function () {
                this.Display = '';
                this.Storage = '';
                this.StorageOptions = [];
                this.DisplayOptions = [];
                switch (this.id) {

                    case 'b71918bf-fac1-4b62-9ed5-0b0294bc9900': //pickList

                        this.StorageOptions = [{ id: 'Id', name: nlsResource['id'] }, { id: 'Number', name: nlsResource['number'] }];
                        this.DisplayOptions = [{ id: 'Id', name: nlsResource['id'] }, { id: 'Number', name: nlsResource['number'] }, { id: 'Text', name: nlsResource['text'] }, { id: 'Code', name: nlsResource['code'] }];

                        this.Display = "Text"; // <--used by picklist only.
                        if (this.unicode) {
                            this.Storage = 'TextUnicode';
                            this.StorageOptions.push({ id: 'TextUnicode', name: nlsResource['text'] });
                            this.StorageOptions.push({ id: 'CodeUnicode', name: nlsResource['code'] });
                        }
                        else {
                            this.Storage = 'Text';
                            this.StorageOptions.push({ id: 'Text', name: nlsResource['text'] });
                            this.StorageOptions.push({ id: 'Code', name: nlsResource['code'] });
                        }
                        break;
                    case '8edd8fce-2be5-4d3d-bedd-ea667e78a8af': //enum

                        this.StorageOptions = [{ id: 'Value', name: nlsResource['value'] }];
                        if (this.unicode) {
                            this.Storage = 'NameUnicode';
                            this.StorageOptions.push({ id: 'NameUnicode', name: nlsResource['name'] });
                            this.StorageOptions.push({ id: 'CodeUnicode', name: nlsResource['code'] });
                        }
                        else {
                            this.Storage = 'Name';
                            this.StorageOptions.push({ id: 'Name', name: nlsResource['name'] });
                            this.StorageOptions.push({ id: 'Code', name: nlsResource['code'] });
                        }
                        break;
                    case '3ca925e1-4b76-4621-a39c-a0d4cb7327d5': //guid

                        //this.StorageOptions = [{ id: 'Native', name: nlsResource['native'] }]; //<-- this is not supported by Sage.Saleslogix
                        if (this.unicode) {
                            this.Storage = 'StringUnicode';
                            this.StorageOptions.push({ id: 'StringUnicode', name: nlsResource['string'] });
                        }
                        else {
                            this.Storage = 'String';
                            this.StorageOptions.push({ id: 'String', name: nlsResource['string'] });
                        }
                        break;
                }
            }
        };
    var _Enum =
        {
            //Storage WILL BE INCLUDED
            Items: [],
            MultiSelect: false,
            OverriddenName: ''
        };
    var dLookup =
        {
            //Length WILL BE INCLUDED
            LookupEntityName: '',
            LookupGroup: 1.0,
            ParentProperty: ''

        };
    var lookup =
        {
            //include Length
            EnableHyperLinking: false,
            LookupEntityName: '',
            LookupPreFilters: [],
            LookupProperties: [],
            ReturnPrimaryKey: true

        };
    var picklist =
        {
            //Include Storage and Length
            PickListId: '',
            PickListName: '',
            AllowMultiples: false,
            AlphaSort: false,
            MustExistInList: true,
            NoneEditable: false,
            PickListFilter: '',
            ValueStoredAsText: true
        };
    var calculated =
        {
            DisplayName: "", //defaults as the displayName of the field
            Description: "",
            Template: "",
            type: -1, //-1 - Not set, type invalid; 0 - Calculated String Field; 1 - Calculated Number Field.
            oldTemplate: ""
        };
    var property = declare('Sage.UI.Controls.FieldPropertyObject', null, {
        id: '',
        name: '',
        aggregate: [],
        show: [],
        unicode: false,
        supported: true,
        numbers: ['Int16', 'Int32', 'Double', 'Float', 'Decimal', 'Single', 'DateTime', 'Date', 'Time'],

        hidden: [],

        constructor: function (id, name, isUnicode, isSupported) {
            var NumericAggs = ['sum', 'count', 'avg', 'min', 'max'];
            var OtherAggs = ['count', 'min', 'max'];

            if (isSupported !== null && typeof (isSupported) !== "undefined") {
                this.supported = isSupported;
            }

            if (isUnicode !== null && typeof (isUnicode) !== "undefined") {
                this.unicode = isUnicode;
            }
            this.id = id;
            this.name = name;

            lang.mixin(this, base);
            this.initializeBaseData();

            // blank SqlTypes should probably show all of the aggregrate options
            if (this.numbers.indexOf(this.SqlType) >= 0 || this.SqlType === "" || typeof (this.SqlType) === 'undefined') {
                this.aggregate = NumericAggs;
            } else {
                this.aggregate = OtherAggs;
            }

            switch (this.id) {
                //BASE
                case 'a6bf2690-3477-4a18-9849-56abf8693934': //single
                case '6b0b3d51-0728-4b67-9473-52836a81da53': //short
                case '47f90249-e4c8-4564-9ae6-e1fa9904f8b8': //integer
                case '95ca9d52-6f0b-4a96-bd40-43583f41faf8': //yesNo
                case '3edc7c52-e711-431d-b150-969d88ebabf4': //boolean
                case '1f08f2eb-87c8-443b-a7c2-a51f590923f5': //dateTime
                case '189a1a4e-396c-4146-95c0-93b5d9e7d160': //char
                case '68e04249-f7e2-4b63-90be-55fbb1f4aa77': //byte
                case '30053f5a-8d40-4db1-b185-1e4128eb26cc': //standardId ->contains Length, but it is not editable
                case '17541523-fc31-4269-ac97-df63290d0e31': //owner->contains Length, but it is not editable
                case '92432b4d-8206-4a96-ba7b-e4cbd374f148': //trueFalse->contains Length, but it is not editable
                    break;
                    //Length&ENCRYPTED
                case 'ccc0f01d-7ba5-408e-8526-a3f942354b3a': //text
                case 'f4ca6023-9f5f-4e41-8571-50ba94e8f233': //memo
                case '31e8638d-4232-4c61-8827-d94132a33887': //email
                case '76c537a8-8b08-4b35-84cf-fa95c6c133b0': //unicodetext
                case 'b2ed309e-ea89-4eef-8051-6244987953a4': //unicodeMemo
                case '5685161e-5f0a-4a36-83fe-89e8e462e9e7': //url
                case '85f2bba5-1fb7-4ecf-941a-d98d4739c305': //phone
                case '07370ef3-ad24-409f-86a8-ff2db5ee6d69': //binary -> contains Length and encrypted fields, but only encrypted is editable.
                    lang.mixin(this, Length);
                    this.initializeLengthData();
                    lang.mixin(this, encrypted);
                    this.show = ["Length", "IsEncrypted"];
                    break;
                case '2596d57d-89d6-4b72-9036-b18c64c5324c': //decimal
                    lang.mixin(this, PrecisionScale);
                    this.initializePrecisionScaleData();
                    this.show = ["Precision", "Scale"];
                    break;
                case 'f37c635c-9fbf-40d8-98d5-750a54a3cca1': //double
                    lang.mixin(this, IsPercentage);
                    this.show = ["IsPercentage"];
                    break;
                case 'b71918bf-fac1-4b62-9ed5-0b0294bc9900': //pickList
                    lang.mixin(this, Length);
                    this.initializeLengthData();
                    lang.mixin(this, Storage);
                    this.initializeStorageData();
                    lang.mixin(this, picklist);
                    this.show = ["Length", "Display", "Storage", "PickListName", "AllowMultiples", "AlphaSort", "MustExistInList", "NoneEditable", "ValueStoredAsText"];
                    break;
                case 'a3b52518-801b-44be-96bf-fdca3de84f7f': //lookup
                    lang.mixin(this, Length);
                    this.initializeLengthData();
                    lang.mixin(this, Storage);
                    this.initializeStorageData();
                    lang.mixin(this, lookup);
                    this.show = ["Length", "LookupEntityName", "EnableHyperLinking", "ReturnPrimaryKey", "LookupProperties", "LookupPreFilters"];
                    break;
                case '517d5e69-9efa-4d0a-8e7a-1c7691f921ba': //dependencyLookup
                    lang.mixin(this, Length);
                    this.initializeLengthData();
                    lang.mixin(this, dLookup);
                    this.show = ["Length", "LookupEntityName", "LookupGroup", "ParentProperty"];
                    break;
                case '8edd8fce-2be5-4d3d-bedd-ea667e78a8af': //enum
                    lang.mixin(this, Storage);
                    this.initializeStorageData();
                    lang.mixin(this, _Enum);
                    this.show = ["Storage", "MultiSelect", "Items", "OverriddenName"];
                    break;
                case '3ca925e1-4b76-4621-a39c-a0d4cb7327d5': //guid
                    lang.mixin(this, Storage);
                    this.initializeStorageData();
                    this.show = ["Storage"];
                    break;

                case 'f750817f-73ad-4bf3-b2de-bd0f5cc47dfd': //calculatedString
                    lang.mixin(this, calculated);
                    this.type = 0;
                    this.show = ["Description", "Template"];
                    this.hidden = ["oldTemplate"];
                    break;

                case '44bc190a-99f3-4fa9-98a3-d5b2336d6e7c': //calculatedNumber
                    lang.mixin(this, calculated);
                    this.type = 1;
                    this.show = ["Description", "Template"];
                    this.hidden = ["oldTemplate"];
                    break;
            }
        }
    });
    return property;
});

