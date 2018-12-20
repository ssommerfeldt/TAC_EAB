/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/Format", ['Sage/Utility', 'dojo/string'],
function (utility, dString) {

    Sage.Format = {
        // summary:
        // this class contains common Saleslogix based formatters for formatting data in grids and elsewhere.
        phone: function (val, index) {
            if (!val) return '';
            if (val.length !== 10) return utility.htmlEncode(val);

            return dString.substitute('(${0}) ${1}-${2}',
            [val.substring(0, 3), val.substring(3, 6),
            val.substring(6)]);
        },
        email: function (val, index) {
            if (!val) return '';
            var dispstr = val;
            if (this.icon && this.icon !== '') {
                dispstr = (this.icon === true || this.icon === 'true')
                    ? '<img src="images/icons/Send_Write_email_16x16.png" />'
                    : '<img src="' + this.icon + '" />';
            }
            return dojo.string.substitute('<a href="mailto:${0}">${1}</a>', [val, dispstr]);
        },
        stringFromArray: function (formatString, arr) {
            switch (arr.length) {
                case 1:
                    return String.format(formatString, arr[0]);
                case 2:
                    return String.format(formatString, arr[0], arr[1]);
                case 3:
                    return String.format(formatString, arr[0], arr[1], arr[2]);
                case 4:
                    return String.format(formatString, arr[0], arr[1], arr[2], arr[3]);
                case 5:
                    return String.format(formatString, arr[0], arr[1], arr[2], arr[3], arr[4]);
                case 6:
                    return String.format(formatString, arr[0], arr[1], arr[2], arr[3], arr[4], arr[5]);
                case 7:
                    return String.format(formatString, arr[0], arr[1], arr[2], arr[3], arr[4], arr[5], arr[6]);
                case 8:
                    return String.format(formatString, arr[0], arr[1], arr[2], arr[3], arr[4], arr[5], arr[6], arr[7]);
                case 9:
                    return String.format(formatString, arr[0], arr[1], arr[2], arr[3], arr[4], arr[5], arr[6], arr[7], arr[8]);
                case 10:
                    return String.format(formatString, arr[0], arr[1], arr[2], arr[3], arr[4], arr[5], arr[6], arr[7], arr[8], arr[9]);
                default:
                    return formatString;

            }
        },

        abbreviationFormatter: function (maxLength) {
            // summary:
            //  Return formatter function to be used to restrict length of a display
            return function (value, data) {
                if (value === null) {
                    return '';
                }
                if (typeof (value) != "string" || value.length <= maxLength) {
                    return value;
                }
                value = value.substring(0, maxLength);
                var ispace = value.lastIndexOf(" ");
                if (ispace > 0 && ispace > value.length * 0.75) {
                    // pick the last space in the string, but only if it's at least 3/4 of it
                    value = value.substring(0, ispace);
                }
                return value + "...";
            };
        },
        Address: {
            formatAddress: function (address, format) {
				// summary: 
				// Takes and array of address fields and formats them based on format.
				// @param address: Array of addres fields.
				// @param format: The country format should be the formatted.   
				var lineBreak = '\r\n';
				var formatString = '';
				var addressLines = this.GetAddressLines(address);
				var city = this.GetCity(address);
				var state = this.GetState(address);
				var zipCode = this.GetZipCode(address);
				var county = this.GetCounty(address);	
				var country = this.GetCountry(address);				
				
				//Replace %A i.e address lines
				formatString = format.replace(/%A/g, addressLines);
				//Replace %D i.e County or District					
				formatString = formatString.replace(/%D/g, county); 
				//Replace %C i.e City
				formatString = formatString.replace(/%C/g, city); 
				//Replace %Z i.e Zip code
				formatString = formatString.replace(/%Z/g, zipCode); 
				//Replace %S i.e State
				formatString = formatString.replace(/%S/g, state);
				if(format.indexOf('%A') === -1)
				{
					if(format === '')
						formatString += addressLines === ''? '': addressLines;
					else
						formatString += addressLines === ''? '': lineBreak + addressLines;
				}
				if(format.indexOf('%C') === -1)
					formatString += city === ''? '': lineBreak + city;				
				if(format.indexOf('%S') === -1)
					formatString += state === ''? '': lineBreak + state; 
				if(format.indexOf('%Z') === -1)
					formatString += zipCode === ''? '': lineBreak + zipCode;				
				//Replace %n i.e line break
				formatString = this.RemoveUnnecessaryChars(formatString);
				// Now add country lastly to address string	
				formatString = formatString + country;
				//Now replace ^ with emptyto handle it for test type	
				formatString = formatString.replace(/\^/g, '');
				if (addressLines === '' && city === '' && county === '' &&
                    state === '' &&	zipCode === '' && country === '')
                {
                    formatString = '';
                }
				return formatString;
			},
			RemoveUnnecessaryChars: function(formatString){
				var format = '';
				var lineBreak = '\r\n';
				var addressArray = formatString.split('%n');
				for(var i = 0; i < addressArray.length; i++)
				{
					var addressFormat = addressArray[i]; 
					addressFormat = addressFormat.replace(/^\,|\,$/g, '');	
					addressFormat = addressFormat.replace(/^\ |\ $/g, '');	
					addressFormat = addressFormat.replace(/^\ - |\ - $/g, '');
					addressFormat = addressFormat.replace(/^\-|\-$/g, '');
					addressFormat = addressFormat.replace(/\/$/g, '');
					if(addressFormat !== '')
						format += addressFormat + lineBreak;
				}
				return format;
			},
			GetAddressLines: function(address){								
				var lineBreak = '\r\n';
				var addr1 = this.GetValueByObjectName(address,'addr1');
				var addr2 = this.GetValueByObjectName(address,'addr2');
				var addr3 = this.GetValueByObjectName(address,'addr3');
				var addr4 = this.GetValueByObjectName(address,'addr4');
				var addr5 = this.GetValueByObjectName(address,'addr5');
				var addr6 = this.GetValueByObjectName(address,'addr6');
				
				var addressLines = addr1 !== '' ? addr1 : '';
                addressLines += addr2 !== '' ? lineBreak + addr2 : '';
                addressLines += addr3 !== '' ? lineBreak + addr3 : '';
                addressLines += addr4 !== '' ? lineBreak + addr4 : '';
                addressLines += addr5 !== '' ? lineBreak + addr5 : '';
                addressLines += addr6 !== '' ? lineBreak + addr6 : '';
				return addressLines;
			},
			GetCounty: function(address){ 
				return this.GetValueByObjectName(address,'county');
			},
			GetCity: function(address){ 
				return this.GetValueByObjectName(address,'city');
			},
			GetZipCode: function(address){ 
				return this.GetValueByObjectName(address,'postalCode');
			},
			GetState: function(address){ 
				return this.GetValueByObjectName(address,'state');
			},
			GetCountry: function(address)
			{
				return this.GetValueByObjectName(address,'country');
			},
			GetValueByObjectName: function(address, name)
			{
				var value = '';
				var valueObj = address.filter(function( obj ) {
					return obj.name === name;
				});
				if(valueObj.length > 0){
					if(valueObj[0].value !== '')
						value = valueObj[0].value;
				}
				return value;
			}
        }
    };
    return Sage.Format;
});
