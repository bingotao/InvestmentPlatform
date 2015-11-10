<%@ Page Title="" Language="C#" MasterPageFile="~/masterpage/MasterBase.Master" AutoEventWireup="true" CodeBehind="Statistic.aspx.cs" Inherits="Walkinfo.InvestmentPlatform.pages.Statistic" %>

<asp:Content ID="Content1" ContentPlaceHolderID="StyleFilePlaceHolder" runat="server">
    <link href="css/Statistic.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ScriptFilePlaceHolder" runat="server">
    <script src="js/Statistic.js"></script>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentHiddenField" runat="server">
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ContentPlace" runat="server">
    <div class="main">
        <div class="top">
            <ul>
                <li>招商地块查询</li>
                <li>工业企业查询</li>
            </ul>
        </div>
        <div class="bottom">
            <div>
                <div class="zsdk condition">
                    <input id="qy_xz" type="radio" name="qy" checked />
                    <label for="qy_xz">
                        乡镇</label>
                    <input id="qy_pq" type="radio" name="qy" style="margin-left: 30px;" />
                    <label for="qy_pq">
                        板块</label>
                    <span class="query1">查 询</span>
                </div>
                <div class="results">
                    <table>
                        <tr>
                            <th rowspan="3">序号</th>
                            <th rowspan="3">区域</th>
                            <th rowspan="3">合计数量</th>
                            <th rowspan="3">合计面积</th>
                            <th colspan="6">招商地块（单位：亩）</th>
                        </tr>
                        <tr>
                            <th colspan="2">批而未供</th>
                            <th colspan="2">用而不足</th>
                            <th colspan="2">回收国有</th>
                        </tr>
                        <tr>
                            <th>数量</th>
                            <th>面积</th>
                            <th>数量</th>
                            <th>面积</th>
                            <th>数量</th>
                            <th>面积</th>
                        </tr>
                        <tbody class="tbody1"></tbody>

                    </table>
                </div>
            </div>
            <div>
                <div class="gyqy condition">
                    <div>
                        <label>占地面积：</label>
                        <input type="text" />
                        <label>—</label>
                        <input type="text" />
                        <label>亩</label>
                    </div>
                    <div>
                        <label>营业收入：</label>
                        <input type="text" />
                        <label>—</label>
                        <input type="text" />
                        <label>万元</label>
                    </div>
                    <div>
                        <label>上缴税金：</label>
                        <input type="text" />
                        <label>—</label>
                        <input type="text" />
                        <label>万元</label>
                    </div>
                    <div>
                        <input id="qy_xz2" type="radio" name="qy2" checked />
                        <label for="qy_xz2">
                            乡镇</label>
                        <input id="qy_pq2" type="radio" name="qy2" style="margin-left: 30px;" />
                        <label for="qy_pq2">
                            板块</label>
                        <div class="query">查 询</div>
                    </div>
                </div>
                <div class="results">
                    <table>
                        <tr>
                            <th rowspan="2">序号</th>
                            <th rowspan="2">区域</th>
                            <th colspan="2">工业企业数</th>
                            <th rowspan="2">占地面积（亩）</th>
                            <th rowspan="2">建筑面积（亩）</th>
                            <th rowspan="2">营业收入（万元）</th>
                            <th colspan="2">上缴税金（万元）</th>
                            <th rowspan="2">从业人员</th>
                        </tr>
                        <tr>
                            <th>总数</th>
                            <th>规上企业数</th>
                            <th>税收总额</th>
                            <th>一般预算口径税收</th>
                        </tr>
                        <tbody class="tbody2"></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content5" ContentPlaceHolderID="ScriptContentPlace" runat="server">
</asp:Content>
