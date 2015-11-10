$(function () {
    $("#fullPage").fullpage({
        verticalCentered: false,
        anchors: ['page1', 'page2', 'page3', 'page4', 'page5'],
        'css3': true,
        navigation: true,
        navigationTooltips: ['招商概况', '乡镇招商用地面积', '板块招商用地面积', '用而不足', '工业用地']
    });
    $(".page1,.page2,.page3,.page4,.page5").addClass("an");
    createChart2();
    function createChart2() {
        var series = [{
            name: '',
            data: [2000, 1000, 1500, 800, 1200, 1500]
        }];
        var xLabels = ['旺庄街道', '硕放街道', '江溪街道', '新安街道', '梅村街道', '鸿山街道'];
        var cLabel = '#5a7d4d';
        var cColumn = ['#5a7d4d'];
        $('.page2 .tb-container').highcharts({
            colors: cColumn,
            chart: {
                type: 'column',
                backgroundColor: 'none'//背景色
            },
            tooltip: { enabled: false },
            credits: { enabled: false },
            title: { text: '' },
            legend: {
                enabled: false
            },
            subtitle: {
                enabled: false
            },
            plotOptions: {
                series: {
                    dataLabels: {
                        enabled: true,
                        style: {
                            color: cLabel,
                            fontWeight: 'bold',
                            fontFamily: 'Times New Roman',
                            fontSize: '16px'
                        }
                    }
                }
            },
            xAxis: {
                categories: xLabels,//X轴分组
                gridLineColor: cLabel,//X轴颜色
                lineColor: cLabel,//X轴颜色
                tickWidth: 0,
                labels: {
                    style: {
                        color: cLabel,//X轴文字颜色
                        fontWeight: 'bold',
                        fontSize: '18px'
                    }
                }
            },
            yAxis: {
                min: 0,
                title: {
                    enabled: false
                },
                gridLineColor: cLabel,//Y轴颜色
                labels: {
                    style: {
                        color: cLabel,//Y轴颜色
                        fontWeight: 'bold',
                        fontFamily: 'Times New Roman',
                        fontSize: '16px'
                    }
                }
            },
            series: series
        });
    }


    createChart3();
    function createChart3() {


        $('.page3 .tb-container').highcharts({
            chart: {
                type: 'pie',
                backgroundColor: 'none'//背景色
            },
            tooltip: { enabled: false },
            credits: { enabled: false },
            title: { text: '' },
            legend: {
                enabled: true,
                verticalAlign: 'middle',
                align: 'right',
                layout: 'vertical'
            },
            subtitle: {
                enabled: false
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    showInLegend: true,
                    dataLabels: {
                        useHTML: true,
                        enabled: true,
                        color: '#444',
                        style: { "fontSize": "15px" },
                        connectorColor: '#000000',
                        format: '<b>{point.name}</b>:<br/>{point.y:.0f}亩  {point.percentage:.0f} %'
                    }
                }
            },
            xAxis: {
                tickWidth: 0,
                labels: {
                    style: {
                        fontWeight: 'bold',
                        fontSize: '18px'
                    }
                }
            },
            yAxis: {
                min: 0,
                title: {
                    enabled: false
                },
                labels: {
                    style: {
                        fontWeight: 'bold',
                        fontFamily: 'Times New Roman',
                        fontSize: '16px'
                    }
                }
            },
            series: [{
                name: '', data: [
                ['板块1', 2000],
                ['板块2', 1000],
                ['板块3', 1500],
                ['板块4', 800],
                ['板块5', 1200],
                ['板块6', 1500]]
            }]
        });
    }

    createChart4();
    function createChart4() {
        var series = [{
            name: '',
            data: [2000, 1000, 1500, 800, 1200, 1500]
        }];
        var xLabels = ['旺庄街道', '硕放街道', '江溪街道', '新安街道', '梅村街道', '鸿山街道'];
        var cLabel = '#5b6995';
        var cColumn = ['#5b6995'];
        $('.page4 .tb-container').highcharts({
            colors: cColumn,
            chart: {
                type: 'column',
                backgroundColor: 'none'//背景色
            },
            tooltip: { enabled: false },
            credits: { enabled: false },
            title: { text: '' },
            legend: {
                enabled: false
            },
            subtitle: {
                enabled: false
            },
            plotOptions: {
                series: {
                    dataLabels: {
                        enabled: true,
                        style: {
                            color: cLabel,
                            fontWeight: 'bold',
                            fontFamily: 'Times New Roman',
                            fontSize: '16px'
                        }
                    }
                }
            },
            xAxis: {
                categories: xLabels,//X轴分组
                gridLineColor: cLabel,//X轴颜色
                lineColor: cLabel,//X轴颜色
                tickWidth: 0,
                labels: {
                    style: {
                        color: cLabel,//X轴文字颜色
                        fontWeight: 'bold',
                        fontSize: '18px'
                    }
                }
            },
            yAxis: {
                min: 0,
                title: {
                    enabled: false
                },
                gridLineColor: cLabel,//Y轴颜色
                labels: {
                    style: {
                        color: cLabel,//Y轴颜色
                        fontWeight: 'bold',
                        fontFamily: 'Times New Roman',
                        fontSize: '16px'
                    }
                }
            },
            series: series
        });
    }

});