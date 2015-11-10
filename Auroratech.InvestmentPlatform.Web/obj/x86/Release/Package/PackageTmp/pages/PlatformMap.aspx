<%@ Page Title="" Language="C#" MasterPageFile="~/masterpage/MasterBase.Master" AutoEventWireup="true" CodeBehind="PlatformMap.aspx.cs" Inherits="Walkinfo.InvestmentPlatform.pages.PlatformMap" %>

<asp:Content ID="Content1" ContentPlaceHolderID="StyleFilePlaceHolder" runat="server">
    <link href="../js/extend/zTree_v3.5/css/zTreeStyle/zTreeStyle.css" rel="stylesheet" />
    <link href="../js/extend/jquery_easyui_1.4.2/themes/default/easyui.css" rel="stylesheet" />

    <link href="../css/mapstyle.css" rel="stylesheet" />
    <link href="../js/walkinfo/mapNav/css/mapNav.css" rel="stylesheet" />
    <link href="css/PlatformMap.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ScriptFilePlaceHolder" runat="server">

    <script src="../config/globalConfig.js"></script>
    <script src="../js/extend/zClip/jquery.zclip.min.js"></script>
    <script src="../js/extend/zTree_v3.5/js/jquery.ztree.all-3.5.min.js"></script>
    <script src="../js/extend/jquery.slimscroll.min.js"></script>

    <script src="../config/appConfig.js"></script>
    <script src="../config/layerConfig.js"></script>
    <script src="../js/walkinfo/base/giscom.js"></script>
    <script src="../js/walkinfo/mapNav/js/mapNav.js"></script>
    <script src="../js/extend/jquery_easyui_1.4.2/jquery.easyui.min.js"></script>
    <script src="../js/extend/jquery_easyui_1.4.2/datagrid-scrollview.js"></script>
    <script src="../js/walkinfo/base/com.js"></script>
    <script src="js/PlatformMap.js"></script>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentHiddenField" runat="server">
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ContentPlace" runat="server">
    <%--<div class="map-tools-btn mytip" data-tip="应用中心">应用</div>--%>
    <div class="my-toolbar">
    </div>
    <div class="map-tools">
        <div class="map-tools-title">应用中心</div>
        <div class="map-tools-close"></div>
        <div class="map-tools-container">
        </div>
    </div>
    <div class="feature-detail">
        <div class="featur-detail-copy">复制</div>
        <div class="feature-detail-close"></div>
        <div class="feature-detail-title"></div>
        <div class="feature-details"></div>
    </div>
    <div class="lslider">
        <div class="region-container">
            <div class="current-region mytip" data-tip="选择区域">&nbsp;</div>
            <div class="region-panel">
                <div class="btn-slideclose"></div>
                <div style="text-align: left; font-size: 16px; text-indent: 30px;"><span data-region='{"type":"XZQ","dm":"320292","mc":"新区"}'>新区</span></div>
                <div class="region-split"></div>
                <table>
                    <tr>
                        <td><span data-region='{"type":"XZJD","dm":"001","mc":"旺庄街道"}'>旺庄街道</span></td>
                        <td><span data-region='{"type":"XZJD","dm":"002","mc":"硕放街道"}'>硕放街道</span></td>
                        <td><span data-region='{"type":"XZJD","dm":"003","mc":"江溪街道"}'>江溪街道</span></td>
                    </tr>
                    <tr>
                        <td><span data-region='{"type":"XZJD","dm":"004","mc":"新安街道"}'>新安街道</span></td>
                        <td><span data-region='{"type":"XZJD","dm":"005","mc":"梅村街道"}'>梅村街道</span></td>
                        <td><span data-region='{"type":"XZJD","dm":"006","mc":"鸿山街道"}'>鸿山街道</span></td>
                    </tr>
                </table>
                <div class="region-split"></div>
                <table class="tb-region">
                    <tr>
                        <td><span data-region='{"type":"GYYQ","dm":"320292KG01","mc":"高新技术产业开发区"}'>高新技术产业开发区</span></td>
                        <td><span data-region='{"type":"GYYQ","dm":"320292KG02","mc":"高新区综合保税区"}'>高新区综合保税区</span></td>
                        <td><span data-region='{"type":"GYYQ","dm":"320292KG03","mc":"硕放工业园区"}'>硕放工业园区</span></td>
                    </tr>
                    <tr>

                        <td><span data-region='{"type":"GYYQ","dm":"320292JX04","mc":"鸿山工业集中区"}'>鸿山工业集中区</span></td>
                        <td><span data-region='{"type":"GYYQ","dm":"320292JX05","mc":"旺庄工业集中区"}'>旺庄工业集中区</span></td>
                        <td><span data-region='{"type":"GYYQ","dm":"320292JX06","mc":"空港产业园"}'>空港产业园</span></td>
                    </tr>

                    <tr>
                        <td><span data-region='{"type":"GYYQ","dm":"320292JX07","mc":"梅村工业集中区"}'>梅村工业集中区</span></td>
                        <td><span data-region='{"type":"GYYQ","dm":"320292JX08","mc":"江溪工业集中区"}'>江溪工业集中区</span></td>
                        <td><span data-region='{"type":"GYYQ","dm":"320292JX09","mc":"太湖国际科技园"}'>太湖国际科技园</span></td>
                    </tr>
                    <tr>
                        <td><span data-region='{"type":"GYYQ","dm":"320292JX10","mc":"新加坡工业园"}'>新加坡工业园</span></td>
                        <td></td>
                        <td></td>

                    </tr>
                </table>
            </div>
        </div>
        <div class="sliderbtn">
            <div>
            </div>
        </div>
        <div class="slider-nav">
            <ul>
                <li data-target="layers">地图</li>
                <li data-target="apps">应用</li>
            </ul>
        </div>
        <div class="slider-panel">
            <div class="layers ztree">
                <div style="position: absolute; top: 0; font-family: 'Microsoft YaHei'; height: 30px; border-bottom: 2px  #0092da solid; color: #0092da; line-height: 30px; position: relative;">
                    <div style="float: left; height: 18px; width: 18px; margin: 5px; background: #0092da;"></div>
                    <div style="float: left; height: 30px; line-height: 30px; font-weight: 700; font-family: 'Microsoft YaHei'; font-size: 15px;">分类数据</div>
                </div>
                <div class="toc-container">
                    <ul id="layerTree" class="toc ztree"></ul>
                </div>
            </div>
            <div class="apps">
                <div class="apps-switch">
                    <div class="apps-switch-pre"></div>
                    <div class="apps-current-app">当前应用</div>
                    <div class="apps-switch-next"></div>
                </div>
                <div class="app-container"></div>
                <div class="app-nav-small">
                </div>
            </div>
        </div>
    </div>
    <div class="map-container">
        <div id="mapMain" class="map">
            <div id="divMapNav"></div>
            <div id="baseMap" class="mytip" data-tip="底图切换"></div>
        </div>
        <div class="tip-container">
            <div class="btn-bottomtip-close"></div>
            <div class="tip-content"></div>
        </div>
        <div class="bottom-results">
            <div class="bottom-results-title"></div>
            <div class="bottom-close"></div>
            <div class="results-container">
            </div>
        </div>
        <div class="bottom-results-up"></div>
    </div>
</asp:Content>
<asp:Content ID="Content5" ContentPlaceHolderID="ScriptContentPlace" runat="server">
</asp:Content>
