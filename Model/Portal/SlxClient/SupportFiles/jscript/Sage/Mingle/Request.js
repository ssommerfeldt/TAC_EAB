/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define, mingleConfig */
define("Sage/Mingle/Request", [
        'dojo/_base/declare',
        'dojo/_base/Deferred',
        'dojo/_base/lang',
        'dojo/_base/json',
        'dojo/cookie',
        'dojo/request/xhr',
        'dojo/string',
        'dojo/i18n!./nls/UserService',
        'Sage/Mingle/UserService'
    ],
    function(declare, Deferred, lang, json, cookie, xhr, dojoString, nls, userService) {
        var mingleRequest = declare('Sage.Mingle.Request',
            null,
            {
                _request: function(options) {

                    var deferred = new Deferred();

                    if (!Sage.Services.hasService('MingleUserService')) {
                        Sage.Services.addService('MingleUserService', new userService());
                    }

                    var service = Sage.Services.getService('MingleUserService');
                    service
                        .currentUser()
                        .then(function(mingleUser) {

                            console.debug('Mingle.Request: mingleUser: %o', mingleUser);

                            var authorization = '';
                            var accessToken = service.getApiAccessToken();

                            if (accessToken === '') {
                                console.error('Mingle.Request: Invalid ION API access token.');
                                deferred.reject('Invalid ION API access token.');
                                return deferred.promise;
                            } else {
                                authorization = 'Bearer ' + accessToken; //DNL
                                console.debug('Mingle.Request: Authorization: %o', authorization);
                            }

                            /*  NOTE: When ION API calls are made through the CRM API proxy (e.g. calling SData from a Ming.le widget) the following headers will be inlcuded in the proxy's request:                                
                                'X-Infor-Identity2': 'b00d3ad1-35d9-4628-968b-890c967e5df0' // The UserSecurity.FederatedIdentity in Infor CRM.
                                'X-Infor-TenantId': 'ACME_AX2' // The Ming.le TenantId
                            */
                            var headers = {
                                'Authorization': authorization,
                                'Accept': 'application/json'
                            };

                            var post = options.post === true;

                            var xhrOptions = {
                                method: post ? 'POST' : 'GET',
                                handleAs: 'json',
                                preventCache: true,
                                withCredentials: true,
                                headers: headers
                            };

                            if (post) {
                                xhrOptions.headers['Content-Type'] = 'application/json';
                                xhrOptions.data = json.toJson(options.data);
                            }

                            var substitutions;
                            if (options.substitutions) {
                                substitutions = lang.clone(mingleUser);
                                declare.safeMixin(substitutions, options.substitutions);
                            } else {
                                substitutions = mingleUser;
                            }

                            // /SocialService.Svc/User/${obj.UserGUID}/Feeds

                            xhr(dojoString
                                    .substitute(options.url, { obj: substitutions }),
                                    xhrOptions)
                                .then(function(data) {
                                        console.debug('Mingle.Request: Response=%o', data);
                                        var error;
                                        if (lang.isObject(data)) {
                                            // DEBUG
                                            // NOTE: The mingleConfig object is defined in core.master.
                                            if (mingleConfig.isDebug) {
                                                // Allow testing of the CRM API endpoint in debug mode, which requires the ION API access token (handled by Mingle.Request).
                                                if (data.hasOwnProperty('$resources')) {
                                                    console.debug('Returning SData response: %o', data);
                                                    deferred.resolve(data);
                                                    return;
                                                }
                                            }
                                            // Except for a few Ming.le responses that involve downloading files as streams all other Ming.le API’s have these two properties: ErrorList and Status (a Status of 1 indicates success).
                                            var statusSuccess = 1;
                                            //TODO: Need to handle responses downloading files as streams if we add that support.
                                            if (data.hasOwnProperty('Status') && data.Status === statusSuccess) {
                                                deferred.resolve(data);
                                            } else {
                                                if (data.hasOwnProperty('ErrorList') &&
                                                    lang.isArray(data.ErrorList) &&
                                                    data.ErrorList.length > 0) {
                                                    //TODO: Enumerate all errors in the array.
                                                    error = dojoString
                                                        .substitute('The Ming.le request failed: ${err.Message} (Code=${err.Code}; Severity=${err.Severity}).', { err: data.ErrorList[0] });
                                                } else {
                                                    error =
                                                        'There was an unknown error associated with the Ming.le response.';
                                                }
                                                console.error(error);
                                                deferred.reject(error);
                                            }
                                        } else {
                                            error = 'The Ming.le response is invalid.';
                                            console.error('Mingle.Request: %o', error);
                                            deferred.reject(error);
                                        }
                                    },
                                    function (errorCtor, ioArgs) {
                                        console.error('Mingle.Request: Response=%o; IOArgs=%o', errorCtor, ioArgs || null);
                                        var errorObj = null;
                                        if (lang.isObject(errorCtor) && lang.isObject(errorCtor.response) && lang.isString(errorCtor.response.text)) {
                                            errorObj = json.fromJson(errorCtor.response.text);
                                        }
                                        if (errorObj && errorObj.hasOwnProperty('error' && errorObj.error.hasOwnProperty('message'))) {
                                            deferred.reject(errorObj.error.message);
                                        } else {
                                            deferred.reject(errorCtor);
                                        }
                                        if (mingleConfig.isDebug) {
                                            var errOptions = {
                                                message:
                                                    'There was an unexpected error.'
                                            };
                                            Sage.Utility.ErrorHandler.handleHttpError(errorCtor, ioArgs, errOptions);
                                        }
                                        return errorCtor;
                                    }
                                );

                            return deferred.promise;
                        });

                    return deferred.promise;
                },

                /// <summary>
                /// The Request constructor. The constructor will mixin any passed in arguments.
                /// </summary>
                /// <returns></returns>
                constructor: function(args) {
                    declare.safeMixin(this, args);
                    lang.mixin(this, nls);
                },

                _makeRequest: function(options, config) {
                    if (lang.isObject(config)) {
                        declare.safeMixin(options, config);
                    }
                    return this._request(options);
                },

                get: function(url, config) {
                    return this._makeRequest({ url: url, post: false, data: null }, config);
                },

                post: function(url, data, config) {
                    return this._makeRequest({ url: url, post: true, data: data }, config);
                }
            }
        );

        return mingleRequest;
    }
);