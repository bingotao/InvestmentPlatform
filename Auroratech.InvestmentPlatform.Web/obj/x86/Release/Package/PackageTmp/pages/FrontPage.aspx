<%@ Page Title="" Language="C#" MasterPageFile="~/masterpage/MasterBase.Master" AutoEventWireup="true" CodeBehind="FrontPage.aspx.cs" Inherits="Walkinfo.InvestmentPlatform.pages.FrontPage" %>

<asp:Content ID="Content1" ContentPlaceHolderID="StyleFilePlaceHolder" runat="server">
    <style>
        html, body {
            height: 100%;
            overflow: hidden;
        }

        iframe {
            height: 100%;
            width: 100%;
            margin: 0;
            padding: 0;
            border: 0;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ScriptFilePlaceHolder" runat="server">
    <script>
        $(function () {
            var h = document.documentElement.clientHeight;
            $('.body').height(document.documentElement.clientHeight - 60);
        });
    </script>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentHiddenField" runat="server">
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ContentPlace" runat="server">
    <iframe src="FrontPageIn.aspx"></iframe>
</asp:Content>
<asp:Content ID="Content5" ContentPlaceHolderID="ScriptContentPlace" runat="server">
</asp:Content>
