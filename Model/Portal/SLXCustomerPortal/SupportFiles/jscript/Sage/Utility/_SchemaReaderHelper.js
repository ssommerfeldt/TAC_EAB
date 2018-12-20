/*globals Sage, dojo, dojox, dijit, Simplate, window, Sys, define */
define("Sage/Utility/_SchemaReaderHelper", [
    'dojo/_base/declare',
    'dojo/store/Memory',
    'dojo/string',
    'dojo/_base/array',
    'dojo/_base/lang'
],
function (
    declare,
    Memory,
    dString,
    arrayUtil,
    lang
) {
    var widget = declare('Sage.Utility._SchemaReaderHelper', null, {

        xsct: "xs:complexType",
        xsst: "xs:simpleType",
        xse: "xs:element",
        xsn: "xs:enumeration",
        xsr: "xs:restriction",
        xsa: "xs:all",
        xsy: "xs:anyAttribute",
        xss: "xs:sequence",
        xsc: "xs:choice",

        ddEnum: "${0}--enum",
        ddType: "${0}--type",
        ddList: "${0}--list",
        ddChoice: "${0}--choice",

        fieldNameSearch: "name",
        fieldTypeSearch: "type",
        fieldRelationshipSearch: "relationship",
        fieldIsCollectionSearch: "isCollection",

        nodeList: null,
        __populationQueue: null,
        constructor: function () {
            this.nodeList = new Memory();
            this.__populationQueue = [];
        },
        __getHeaderNodeByNameReturnAllElements: function (endPointData, nodeType, NodeName) {
            var header = this.__getHeaderNodeByNameReturnObject(endPointData, nodeType, NodeName);

            if (header !== null) {
                return this.__determineCorrectPathToTake(header);
            }
            else {
                return null;
            }
        },
        __getHeaderNodeByNameReturnObject: function (endPointData, nodeType, NodeName) {
            var header = endPointData[nodeType].filter(function (d) { return d['name'] === NodeName; });

            if (typeof (header) !== "undefined" && header !== null && header.length > 0) {
                return header[0];
            }
            else {
                return null;
            }
        },

        __addToNodeList: function (node, subKeep, collectionKeep) {
            var selfAware = this;
            if (dojo.isArray(node)) {
                arrayUtil.forEach(node, function (curr) {
                    selfAware.__addOrUpdateSingleNodeToNodeList(curr, subKeep, collectionKeep, null);
                });
            } else {
                selfAware.__addOrUpdateSingleNodeToNodeList(node, subKeep, collectionKeep, null);
            }
        },
        __addOrUpdateSingleNodeToNodeList: function (sdataList, collection, sub, index) {
            var isNew = index === null;
            var data = this.__populateNodeListItem(sdataList, collection, sub, isNew);
            if (!isNew) {
                this.__populationQueue[index] = data;
            }


        },
        __truthy: function (value) {
            var retValue = null;
            if (typeof (value) === "string") {
                value = value.toLowerCase();
                if (value === "true" || value === "1" || value === "t" || value === "yes" || value === "y") {
                    retValue = true;
                }
                if (value === "false" || value === "0" || value === "f" || value === "no" || value === "n") {
                    retValue = false;
                }
            }
            else {
                if (value === true || value === 1) {
                    retValue = true;
                }
                if (value === false || value === 0) {
                    retValue = false;
                }
            }
            return retValue;
        },
        __createNodeItem: function (node) {
            var isManadtory = typeof (node["sme:isMandatory"]) === "undefined" ? false : node["sme:isMandatory"],
                maxLength = typeof (node["sme:maxLength"]) === "undefined" ? null : node["sme:maxLength"],
                name = (node["name"]) === "undefined" ? "" : node["name"],
                label = typeof (node["sme:label"]) === "undefined" ? ((node["label"]) === "undefined" ? "" : node["label"]) : node["sme:label"],
                type = (typeof (node["type"]) === "undefined" ? "xs:string" : node["type"]),
                relationship = typeof (node["sme:relationship"]) === "undefined" ? null : node["sme:relationship"],
                isCollection = typeof (node["sme:isCollection"]) === "undefined" ? false : node["sme:isCollection"],
                sub = typeof (node["sub"]) === "undefined" ? null : node["sub"],
                collection = typeof (node["collection"]) === "undefined" ? null : node["collection"],
                value = typeof (node["value"]) === "undefined" ? null : node["value"];

            isCollection = this.__truthy(isCollection);

            var data = {
                name: name,
                label: label,
                type: type,
                maxLength: maxLength,
                manadtory: isManadtory,
                relationship: relationship,
                isCollection: isCollection,
                collection: collection,
                sub: sub,
                value: null,
                nameValue: value
            };
            if (node.superParentNodeName !== null && typeof (node.superParentNodeName) !== "undefined") {
                data.superParentNodeName = node.superParentNodeName;
            }
            if (node.pathFromParent !== null && typeof (node.pathFromParent) !== "undefined") {
                data.pathFromParent = node.pathFromParent;
            }
            this.__addToQueue(data);
            return data;
        },
        __inQueue: function (searchField, searchValue) {
            var matches = this.__populationQueue.filter(
                function (d) {
                    return d[searchField] === searchValue;
                }
            );
            if (matches === null) {
                return false;
            }
            return matches.length > 0;
        },
        __addToQueue: function (node) {
            var doesDataExist = typeof (node) !== "undefined" && node !== null && typeof (node[this.fieldNameSearch]) !== "undefined" && node[this.fieldNameSearch] !== null;
            if (doesDataExist && !this.__inQueue(this.fieldNameSearch, node[this.fieldNameSearch])) {
                this.__populationQueue.push(node);
                return true;
            }
            return false;
        },
        __populateNodeListItem: function (node, subKeep, collectionKeep, isNew) {

            var selfAware = this, item = {};
            if (subKeep !== null && typeof (subKeep) !== "undefined") {
                node.sub = [];
                if (dojo.isArray(subKeep)) {
                    arrayUtil.forEach(subKeep, function (curr) {
                        item = selfAware.__createNodeItem(curr);
                        node.sub.push(item);
                    });
                }
                else {
                    item = this.__createNodeItem(subKeep);
                    node.sub.push(item);
                }
            }

            item = {};

            if (collectionKeep !== null && typeof (collectionKeep) !== "undefined") {
                node.collection = [];
                if (dojo.isArray(collectionKeep)) {
                    arrayUtil.forEach(collectionKeep, function (curr) {
                        item = selfAware.__createNodeItem(curr);
                        node.collection.push(item);
                    });
                }
                else {
                    item = this.__createNodeItem(collectionKeep);
                    node.collection.push(item);
                }
            }
            if (isNew) {
                node = this.__createNodeItem(node);
            }
            return node;
        },
        /**
            populates a queue with the nodes visited with current object's header name headerName
            @param: sdata - the object that contains the sdata schema feed in object form.
        **/
        _findAndAdd: function (sdata, headerName) {
            /*console.log(JSON.stringify(sdata)); //uncomment to generate 'mocked' data for testing*/
            var base = dString.substitute(this.ddList, [headerName]);
            var header = this.__getHeaderNodeByNameReturnAllElements(sdata, this.xsct, base);
            var indexNL = 0;
            this.__populationQueue = [];

            if (header !== null) {
                this.__addToNodeList(header);

                for (indexNL = 0; indexNL < this.__populationQueue.length; indexNL++) {
                    var queueItem = this.__populationQueue[indexNL];
                    var relats = queueItem.relationship || null;
                    var coll = queueItem.isCollection || false;

                    base = queueItem.type;

                    header = this.__getHeaderNodeByNameReturnAllElements(sdata, this.xsct, base);
                    if (header !== null) {
                        this.__complexTypeHandler(queueItem, header, indexNL);
                    }

                    header = this.__getHeaderNodeByNameReturnAllElements(sdata, this.xsst, base);
                    if (header !== null) {
                        this.__complexTypeHandler(queueItem, header, indexNL);
                    }
                }
            }
        },
        __complexTypeHandler: function (queueItem, header, indexNL) {
            var type = queueItem.type;
            var nodeNameKey = type.substring((type.lastIndexOf('--') + 2)).toLowerCase();
            switch (nodeNameKey) {
                case "list":
                    this.__addOrUpdateSingleNodeToNodeList(queueItem, header, queueItem.collection, indexNL);
                    break;
                case "enum":
                    this.__addOrUpdateSingleNodeToNodeList(queueItem, queueItem.sub, header, indexNL);
                    break;
                case "choice":
                    this.__addOrUpdateSingleNodeToNodeList(queueItem, queueItem.sub, header, indexNL);
                    break;
                case "type":
                    this.__addOrUpdateSingleNodeToNodeList(queueItem, header, queueItem.collection, indexNL);
                    break;
            }
        },
        /**
            takes the queue and produces a list of nodes with children. The root, or first element containing all the nodes. 
        **/
        _gatherNodesFromQueue: function (headerName) {

            var tags = ["--type", "--list", "--choice"]; // no --enum they are not stored in sub, but in collection.
            var list = new Memory({ idProperty: 'name' });
            var selfAware = this;
            var data = this.__populationQueue.filter(
                function (c) {
                    return typeof (c.pathFromParent) !== "undefined" && c.superParentNodeName === dString.substitute(selfAware.ddList, [headerName]);
                });
            if (data.length > 0) {
                list.add(data[0]);
            }
            for (var plrn_i = 0; plrn_i < list.data.length; plrn_i++) {
                var plrn_item = list.data[plrn_i];

                if (plrn_item.sub) {
                    var subsWithMore = plrn_item.sub.filter(
                        function (d) {
                            for (var tag_i = 0; tag_i < tags.length; tag_i++) {
                                var tag_item = tags[tag_i];

                                var len = tag_item.length;
                                var index = d.type.indexOf(tag_item);

                                if (index + len == d.type.length) {
                                    return true;
                                }
                            }
                            return false;
                        });
                    for (var sub_i = 0; sub_i < subsWithMore.length; sub_i++) {
                        if (list.index[subsWithMore[sub_i].name]) {
                            list.add(subsWithMore[sub_i]);
                        }
                    }
                }
            }

            return list;
        },
        _buildObjectFromNodeList: function (header) {
            var queue = []; // {path:'propertyName.propertyName.arrayIndex.propertyName',subList, currentItem}
            var treeObj = {};
            var list_i, queue_i = 0;
            var obj = {};

            obj[header.name] = {};
            queue.push({ path: header.name, sub: header.sub, item: obj });

            do {
                var queue_item = queue[queue_i];

                obj = treeObj;

                var path = queue_item.path.split('.');
                for (var i = 0; i < path.length; i++) {
                    var currVariable = path[i];

                    if (currVariable in obj) {
                        obj = obj[path[i]];
                    }
                    else {
                        obj[path[i]] = {};
                    }
                }
                obj[path[path.length - 1]] = queue_item.item[path[path.length - 1]];

                if (dojo.isArray(queue_item.sub)) {
                    for (list_i = 0; list_i < queue_item.sub.length; list_i++) {
                        var sub_item = queue_item.sub[list_i];
                        var sub_object = {};
                        sub_object[sub_item.name] = {};
                        queue.push({ path: dString.substitute("${0}.${1}", [queue_item.path, sub_item.name]), sub: sub_item.sub, item: sub_object });
                    }
                }

                queue_i++;
            } while (queue_i < queue.length);
            return treeObj;
        },
        __determineCorrectPathToTake: function (node) {
            //possible paths:
            //              ['xs:all']['xs:element']
            //              ['xs:sequence']['xs:element']
            //              ['xs:restriction']['xs:enumeration']
            //              ['xs:choice']['xs:element']
            var nodeNameKey = node["name"].substring((node["name"].lastIndexOf('--') + 2)).toLowerCase();
            var ItemsOnPath = {};
            var strPath = "";
            var testField = {};

            switch (nodeNameKey) {
                case "list":
                    ItemsOnPath = node[this.xss];
                    strPath = this.xss;
                    break;
                case "enum":
                    ItemsOnPath = node[this.xsr];
                    strPath = this.xsr;
                    break;
                case "choice":
                    ItemsOnPath = node[this.xsc];
                    strPath = this.xsc;
                    break;
                case "type":
                    ItemsOnPath = node[this.xsa];
                    if (ItemsOnPath !== null && typeof (ItemsOnPath) !== "undefined") {
                        strPath = this.xsa;
                    } else {
                        ItemsOnPath = node[this.xsy];
                        if (ItemsOnPath !== null && typeof (ItemsOnPath) !== "undefined") {
                            strPath = this.xsy;
                        }
                    }
                    break;
            }


            if (ItemsOnPath) {
                switch (nodeNameKey) {
                    case "list":
                    case "choice":
                    case "type":
                        testField = ItemsOnPath[this.xse];
                        if (testField !== null && typeof (testField) !== "undefined") {
                            strPath = dString.substitute("${0}///${1}", [strPath, this.xse]);
                            ItemsOnPath = ItemsOnPath[this.xse];
                        }
                        break;
                    case "enum":
                        testField = ItemsOnPath[this.xsn];
                        if (testField !== null && typeof (testField) !== "undefined") {
                            strPath = dString.substitute("${0}///${1}", [strPath, this.xsn]);
                            ItemsOnPath = ItemsOnPath[this.xsn];
                        }
                        break;
                }

                ItemsOnPath.superParentNodeName = node["name"];
                ItemsOnPath.pathFromParent = strPath;
                return ItemsOnPath;
            }

            return null;
        }

    });
    return widget;
});