<%@ Control Language="C#" AutoEventWireup="true" CodeFile="RoleTasklet.ascx.cs" Inherits="RoleTaskletControl" %>

<asp:HiddenField ID="hfSelections" runat="server" Value="" ClientIDMode="Predictable" />
<asp:UpdatePanel UpdateMode="Conditional" runat="server" ID="SAG">
    <ContentTemplate>
        <div data-dojo-type="Sage.TaskPane.RoleTasklet" id="roleTasklet"></div>      
        <script type="text/javascript">
            var roleTaskletActions;
            require(['Sage/TaskPane/RoleTasklet', 'dojo/ready'],
                function (RoleTasklet, ready) {
                    ready(function () {
                        if (!roleTaskletActions) {
                            roleTaskletActions = new RoleTasklet({
                                id: "roleTaskletActions",
                                clientId: "<%= ClientID %>"
                            });
                        }
                    });
                }
            );
        </script>
    </ContentTemplate>
</asp:UpdatePanel>