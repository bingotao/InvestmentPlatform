<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="FrontPageIn.aspx.cs" Inherits="Walkinfo.InvestmentPlatform.pages.FrontPageIn" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
    <link href="css/FrontPageIn.css" rel="stylesheet" />
    <link href="../js/extend/fullpage/jquery.fullPage.css" rel="stylesheet" />

    <script src="../js/extend/jquery_1.11.3.min.js"></script>
    <script src="../js/extend/fullpage/jquery-ui.min.js"></script>
    <script src="../js/extend/fullpage/jquery.fullPage.min.js"></script>
    <script src="../js/extend/highcharts_4.1.6/highcharts.js"></script>
    <script src="js/FrontPageIn.js"></script>
</head>
<body>
    <div id="fullPage">
        <div class="section section1">
            <div class="page1">
                <div class="title">无 锡 新 区 招 商 概 况</div>
                <div class="xqgk">
                    <div class="circle"></div>
                    <div class="subtitle">用 地 概 况</div>
                    <div class="context">
                        总面积：33.00万亩<br />
                        建设用地：22.65万亩<br />
                        农用地：8.172万亩<br />
                        未利用：1.63万亩<br />
                    </div>
                </div>
                <div class="zsqk">
                    <div class="circle"></div>
                    <div class="subtitle">招 商 情 况</div>
                    <div class="context" style="margin-top: 30px;">
                        招商地块：215宗<br />
                        招商面积：13485亩
                    </div>
                </div>
                <div class="yebz">
                    <div class="circle"></div>
                    <div class="subtitle">用 而 不 足</div>
                    <div class="context" style="margin-top: 30px;">
                        地块数量：35宗<br />
                        地块面积：2055亩
                    </div>
                </div>
                <div class="gyyd">
                    <div class="circle"></div>
                    <div class="subtitle">工 业 用 地</div>
                    <div class="context">
                        工业地块：2679宗<br />
                        工业企业：10286家<br />
                        工业税收：307亿元<br />
                        工业营收：6400亿元<br />
                        工业用工：37万人
                    </div>
                </div>
            </div>
        </div>
        <div class="section section2">
            <div class="page2">
                <div class="title">各 乡 镇 招 商 用 地 面 积 情 况</div>
                <div class="subtitle">单位：亩</div>
                <div class="tb-container"></div>
            </div>
        </div>
        <div class="section section3">
            <div class="page3">
                <div class="title">各 片 区 招 商 用 地 面 积 情 况</div>
                <div class="subtitle">（单位：亩）</div>
                <div class="tb-container"></div>
            </div>
        </div>
        <div class="section section4">
            <div class="page4">
                <div class="title">各 乡 镇 用 而 不 足 情 况</div>
                <div class="subtitle">单位：亩</div>
                <div class="tb-container"></div>
            </div>
        </div>
        <div class="section section5">
            <div class="page5 an">
                <img src="css/img/ssqk.png" />
                <img src="css/img/gyqyyysr.png" />
                <img src="css/img/gyqysjsj.png" />
                <img src="css/img/gyqydwmjsjsj.png" />
            </div>
        </div>
    </div>
</body>
</html>
