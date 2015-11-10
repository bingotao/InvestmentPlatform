$(function () {
    //function resize() {
    //    var h = document.documentElement.clientHeight;
    //    var w = document.documentElement.clientWidth;
    //    $('.body').height(h - 60);
    //}
    //window.onresize = resize;
    //resize();



    function initTabs(index) {
        var liOnCls = 'top-li-on ';
        var btDivOnCls = 'bottom-div-on';

        var tabLis = $('.top li');
        var btDivOn = $('.bottom>div');
        tabLis.click(function () {
            var $this = $(this);
            var index = tabLis.index($this);
            tabLis.removeClass(liOnCls);
            $this.addClass(liOnCls);
            btDivOn.removeClass(btDivOnCls);
            $(btDivOn[index]).addClass(btDivOnCls);
        });
        $(tabLis[index]).click();
    }
    initTabs(0);

    var r1 = '<tr><td>1</td><td>旺庄街道</td><td>2345</td><td>4125</td><td>23</td><td>102</td><td>150</td><td>312</td><td>2102</td><td>4020</td></tr><tr><td>2</td><td>硕放街道</td><td>1256</td><td>2156</td><td>14</td><td>56</td><td>234</td><td>412</td><td>1020</td><td>2000</td></tr><tr><td>3</td><td>江溪街道</td><td>2145</td><td>4671</td><td>45</td><td>107</td><td>162</td><td>309</td><td>2104</td><td>4021</td></tr><tr><td>4</td><td>新安街道</td><td>890</td><td>1802</td><td>4</td><td>87</td><td>102</td><td>256</td><td>801</td><td>1512</td></tr><tr><td>5</td><td>梅村街道</td><td>3456</td><td>6210</td><td>87</td><td>120</td><td>305</td><td>517</td><td>3210</td><td>6102</td></tr><tr><td>6</td><td>鸿山街道</td><td>1409</td><td>3011</td><td>13</td><td>47</td><td>167</td><td>341</td><td>2713</td><td>2610</td></tr>'
    var r2 = '<tr><td>1</td><td>旺庄街道</td><td>479</td><td>65</td><td>1678</td><td>678</td><td>17996</td><td>98</td><td>32</td><td>49210</td></tr><tr><td>2</td><td>硕放街道</td><td>126</td><td>18</td><td>682</td><td>82</td><td>5680</td><td>22</td><td>4</td><td>20180</td></tr><tr><td>3</td><td>江溪街道</td><td>376</td><td>26</td><td>1456</td><td>456</td><td>12802</td><td>67</td><td>21</td><td>32308</td></tr><tr><td>4</td><td>新安街道</td><td>481</td><td>54</td><td>2013</td><td>513</td><td>20167</td><td>86</td><td>31</td><td>41267</td></tr><tr><td>5</td><td>梅村街道</td><td>212</td><td>12</td><td>1402</td><td>408</td><td>13020</td><td>47</td><td>12</td><td>12461</td></tr><tr><td>6</td><td>鸿山街道</td><td>321</td><td>46</td><td>1799</td><td>622</td><td>1074</td><td>83</td><td>21</td><td>30172</td></tr>';

    $('.query').click(function () {
        $('.tbody2').html(r2);
    });
    $('.query1').click(function () {
        $('.tbody1').html(r1);
    });
});