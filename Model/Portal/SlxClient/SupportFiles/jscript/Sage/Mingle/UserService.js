/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define, mingleConfig */
define("Sage/Mingle/UserService", [
        'dojo/_base/declare',
        'dojo/_base/Deferred',
        'dojo/_base/lang',
        'dojo/cookie',
        'dojo/i18n!./nls/UserService',
        'dojo/request/xhr',
        'dojo/string'
    ],
    function(declare, Deferred, lang, cookie, nls, xhr, dojoString) {
        var mingleUserService = declare('Sage.Mingle.UserService',
            null,
            {
                _initialized: false,

                /// <summary>
                /// The ErrorList property is an array of errors assocaited with the Ming.le API call used to retrieve the Ming.le user detail.
                /// </summary>
                /// <returns type="Array" elementType="Object">Returns an array of error FaultError objects that include the error Severity (Number: 1=Validation, 2=Low, 3=High, and 4=Critical), Code (Number), and Message (String).</returns>
                ErrorList: null,

                /// <summary>
                /// The Status property is an integer that indicates the status of the Ming.le API call. A Status value other than 1 indicates an error and that the ErrorList property should be examined.
                /// </summary>
                /// <returns type="Number" integer="true">Returns an integer.</returns>
                Status: null,

                /// <summary>
                /// The UserDetailList property is an array of Ming.le user detail information returned from a call to the Ming.le API to retrieve the user detail.
                /// </summary>
                /// <returns type="Array" elementType="Object">Returns an array of Ming.le user detail information.</returns>
                UserDetailList: null,

                /// <summary>
                /// The _getCurrentUser() private method returns the current Ming.le user detail information. Note: Use the public currentUser() method when requesting the user detail.
                /// </summary>
                /// <returns type="Object">Returns an object that includes the Ming.le UserId, UserName, FirstName, LastName, Email, Title, UpdatedDate, UserGUID, PersonId, and Status</returns>
                _getCurrentUser: function() {
                    if (this.UserDetailList && lang.isArray(this.UserDetailList) && this.UserDetailList.length === 1) {
                        return this.UserDetailList[0];
                    }
                    return null;
                },

                /// <summary>
                /// The _init method initializes the Ming.le user detail information.
                /// </summary>
                /// <returns type="Object">Returns a dojo deferred promise containing a reference to the UserService class when resolved.</returns>
                _init: function() {

                    var self = this;

                    var deferred = new Deferred();
                    if (this._initialized) {
                        console.debug('Mingle.UserService: Already initialized.');
                        deferred.resolve(self);
                        return deferred.promise;
                    }

                    console.debug('Mingle.UserService: Initializing');

                    var authorization = '';
                    var accessToken = this.getApiAccessToken();

                    if (accessToken === '') {
                        console.error('Mingle.UserService: Invalid ION API access token.');
                        deferred.reject('Invalid ION API access token.');
                        return deferred.promise;
                    } else {
                        authorization = 'Bearer ' + accessToken; //DNL
                        console.debug('Mingle.UserService: Authorization: %o', authorization);
                    }                    

                    // NOTE: Do [not] use Sage.Mingle.Request (circular refernece).
                    xhr(dojoString.substitute('${0}/User/Detail', [mingleConfig.ionApiEndpoint]),
                        {
                            method: 'GET',
                            handleAs: 'json',
                            preventCache: true,
                            withCredentials: true,
                            headers: {
                                'Authorization': authorization,
                                'Accept': 'application/json'
                            }
                        })
                        .then(function(data) {
                                console.debug('Mingle.UserService: Received data: %o', data);
                                if (lang.isObject(data) &&
                                    data.hasOwnProperty('UserDetailList')) {
                                    declare.safeMixin(self, data);
                                    deferred.resolve(self);
                                    self._initialized = true;
                                } else {
                                    console.warn('Mingle.UserService: The Ming.le user detail is invalid.');
                                    deferred.reject(data);
                                }
                            },
                            function(response, ioArgs) {
                                console.error('Mingle.UserService: Error: %o', response);
                                deferred.reject(response);
                                var options = {
                                    message: 'There was an error attempting to retrieve the Ming.le user detail.'
                                };
                                Sage.Utility.ErrorHandler.handleHttpError(response, ioArgs, options);
                                return response;
                            }
                        );

                    return deferred.promise;
                },

                /// <summary>
                /// The UserService constructor. The constructor will mixin any passed in arguments.
                /// </summary>
                /// <returns></returns>
                constructor: function (args) {
                    declare.safeMixin(this, args);
                    lang.mixin(this, nls);
                },

                /// <summary>
                /// The currentUser method returns the current Ming.le user detail information as the resolved value of a dojo deferred promise.
                /// </summary>
                /// <returns type="Object">Returns a dojo deferred promise containing a reference to the Ming.le user detail object when resolved.
                /// The Ming.le user detail object includes the Ming.le UserId, UserName, FirstName, LastName, Email, Title, UpdatedDate, UserGUID, PersonId, and Status.
                /// Example:
                /// {
                ///    "Email": "Michael.Cessna@infor.com",
                ///    "FirstName": "Michael",
                ///    "LastName": "Cessna",
                ///    "PersonId": "Michael.Cessna@infor.com", /* Person Id of the user as defined in IFS */
                ///    "Status": 100, /* 100=Active, 101=Inactive, 102=Revoked, 103=Deleted */
                ///    "Title": "Principal Software Engineer",
                ///    "UpdatedDate": "/Date(1443594986513+0000)/", /* Date in UTC at which the Infor Ming.le user profile was last updated */
                ///    "UserGUID": "90267cd9-e3cd-420b-b852-da191f9e137c", /* System generated unique identifier – GUID */
                ///    "UserId": 293, /* System generated unique ID */
                ///    "UserName": "b00d3ad1-35d9-4628-968b-890c967e5df0" /* User principal name in AD or Identity2 in ADFS. This is also the UserSecurity.FederatedIdentity in Infor CRM. */
                /// }
                /// </returns>
                /// <example>Sage.Services.getService('MingleUserService').currentUser().then(function(mingleUser) {console.log(mingleUser.FirstName + ' ' + mingleUser.LastName + ' (UserSecurity.FederatedIdentity: ' + mingleUser.UserName + ')');}, function(error){console.error(error);});</example>
                currentUser: function() {
                    var deferred = new Deferred();
                    if (!this.ready()) {
                        this._init()
                            .then(
                                function(me) {
                                    deferred.resolve(me._getCurrentUser());
                                },
                                function(err) {
                                    deferred.reject(err);
                                });
                    } else {
                        deferred.resolve(this._getCurrentUser());
                    }
                    return deferred.promise;
                },

                /// <summary>
                /// The getApiAccessToken() method is used to get the user's ION API access token for making calls into the Ming.le API.
                /// </summary>
                /// <returns type="String">Returns a String value representing the ION API acess token (e.g. KCeK4ijgZMJ6PG7lUpWZdKUI9jJW).</returns>
                getApiAccessToken: function() {
                    var accessToken = '';
                    var ionApiAuth = cookie('IonApiAuth'); //DNL
                    // The IonApiAuth cookie value has two parts: access_toke|expires_in_ticks
                    if (ionApiAuth !== '' && ionApiAuth.indexOf('|') > -1) {
                        accessToken = ionApiAuth.split('|')[0];
                    }
                    return accessToken;
                },

                /// <summary>
                /// The getFederatedIdentity() method returns the current Ming.le user detail UserName (UserSecurity.FederatedIdentity) as the resolved value of a dojo deferred promise.
                /// </summary>
                /// <returns type="String">Returns a dojo deferred promise containing a reference to the Ming.le user detail UserName (UserSecurity.FederatedIdentity/User principal name in AD or Identity2 in ADFS) when resolved.</returns>
                getFederatedIdentity: function () {
                    var deferred = new Deferred();
                    this.currentUser().then(function(mingleUser) {
                        deferred.resolve(mingleUser.UserName);
                    }, function(err) {
                        deferred.reject(err);
                    });
                    return deferred.promise;
                },

                /// <summary>
                /// The ready() method is used to determine if the UserService class has successfully retrieved the Ming.le user detail information in the call to the currentUser() method.
                /// </summary>
                /// <returns type="Boolean">Returns a Boolean value indicating whether or not the call to the Ming.le API returned user detail information.</returns>
                ready: function() {
                    return this._initialized;
                }
            }
        );

        if (!Sage.Services.hasService('MingleUserService')) {
            Sage.Services.addService('MingleUserService', new mingleUserService());
        }

        return mingleUserService;
    }
);
