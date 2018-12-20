// Client Script for GlobalJoinManager.ascx
var jsDeleteGlobalJoinPrompt = GlobalJoinManagerResources.jsDeleteGlobalJoinPrompt;
var localizeLeft = GlobalJoinManagerResources.localizeLeft;
var localizeInner = GlobalJoinManagerResources.localizeInner;
var localizeRight = GlobalJoinManagerResources.localizeRight;
var localizeClear = GlobalJoinManagerResources.localizeClear;
var localizeJoinDelete = GlobalJoinManagerResources.localizeJoinDelete;
var localizeReplace = GlobalJoinManagerResources.localizeReplace;
var localizeDeleteStopCascade = GlobalJoinManagerResources.localizeDeleteStopCascade;
var localizeIgnoreDontCascade = GlobalJoinManagerResources.localizeIgnoreDontCascade;
var localizeAlways = GlobalJoinManagerResources.localizeAlways;
var localizeAllow = GlobalJoinManagerResources.localizeAllow;
var localizeNever = GlobalJoinManagerResources.localizeNever;

var joinObjForEdit; // Global Object 

var dgJoins;
dgJoins = new SLXDataGrid("grdJoins");

dojo.connect(dgJoins, 'onrowselect', dgJoins, GlobalJoinManager_rowSelected);
dojo.connect(dgJoins, 'onrowdeselect', dgJoins, GlobalJoinManager_rowDeSelected);

function GlobalJoinManager_closeWin() {
      
    window.opener.document.getElementById("groupXML").value = window.opener.QueryBuilderMain.makeGroupXML();
    window.close();
}

function GlobalJoinManager_addItem() {
    var vURL = 'JoinEditor.aspx';
    window.open(vURL, "joinEditor","dialog=yes,centerscreen=yes,width=650,height=485,status=no,toolbar=no,scrollbars=no,modal=yes,title='Join Editor'");

}

var selectedIndex = 0;

function GlobalJoinManager_editItem() {
    if (selectedIndex != 0) {
        var vURL = 'JoinEditor.aspx';
        joinObjForEdit = new joinInfo();
        var row = document.getElementById("grdJoins").rows[selectedIndex];
        joinObjForEdit.joinid = row.id;
        joinObjForEdit.secondary = (row.cells[2].innerHTML == ' ') ? 'F' : 'T';			
        joinObjForEdit.totable = row.cells[3].innerHTML;
        joinObjForEdit.tofield = row.cells[4].innerHTML;
        joinObjForEdit.fromtable = row.cells[5].innerHTML;
        joinObjForEdit.fromfield = row.cells[6].innerHTML;
        switch (row.cells[7].innerHTML) {
            case localizeLeft:
                joinObjForEdit.jointype = '>';
                break;
            case localizeInner:
                joinObjForEdit.jointype = "=";
                break;
            case localizeRight:
                joinObjForEdit.jointype = "<";
                break;
        }
        switch (row.cells[8].innerHTML) {
            case localizeClear:
                joinObjForEdit.cascadetype = 'C';
                break;
            case localizeJoinDelete:
                joinObjForEdit.cascadetype = "D";
                break;
            case localizeReplace:
                joinObjForEdit.cascadetype = "R";
                break;
            case localizeDeleteStopCascade:
                joinObjForEdit.cascadetype = "S";
                break;
            case localizeIgnoreDontCascade:
                joinObjForEdit.cascadetype = "X";
                break;
        }
        switch (row.cells[9].innerHTML) {
            case localizeAlways:
                joinObjForEdit.usebydefault = "T";
                break;
            case localizeAllow:
                joinObjForEdit.usebydefault = "F";
                break;
            case localizeNever:
                joinObjForEdit.usebydefault = "N";
                break;
        }
        
        window.open(vURL, "joinEditor","dialog=yes,centerscreen=yes,width=650,height=485,status=no,toolbar=no,scrollbars=yes,modal=yes,title='Join Editor'");

    }
}

function GlobalJoinManager_deleteItem() {
    if (selectedIndex != 0) {
        if (confirm(jsDeleteGlobalJoinPrompt)) {
            var vURL = "SLXGroupBuilder.aspx?method=DeleteJoin&joinid=" + document.getElementById("grdJoins").rows[selectedIndex].id;
            dojo.xhrGet({
                url: vURL,
                sync: true,
                load: function (data) {
                    if (data != "") {
                        window.location = "GlobalJoinManager.aspx";
                    }
                },
                error: function (err) {
                }
            });
        }
    }
}

function GlobalJoinManager_rowSelected(index) {
    selectedIndex = index;
}

function GlobalJoinManager_rowDeSelected(index) {
    selectedIndex = 0;
}

function GlobalJoinManager_sortTable() {
    var vURL = "GlobalJoinManager.aspx?savetype=sort&sortindex=" + event.colIndex;
    vURL += "&sortdir=" + event.sortdir;
    document.forms[0].action = vURL;
    document.forms[0].saveType.value = "sort";
    document.forms[0].submit();
}