
//本系统里面的搜索折叠功能


$(function () {
    //搜索栏查询收起点击事件
    $("#span_collapse").click(function () {
        if ($(this).text() == "收起") {
            $(this).html('查询<label class="glyphicon glyphicon-menu-down"></label>');
            $("#div_more_search").collapse('hide');
        }
        else {
            $(this).html('收起<label class="glyphicon glyphicon-menu-up"></label>');
            $("#div_more_search").collapse('show')
        }
    });
})