var WikeGrid = {
    Load: function (config) {
        
        var jqGrid = !config.id ? $("#table_list") : $("#" + config.id);
        var defaultConfig = {
            caption: config.title,
            url: config.url,
            mtype: "GET",
            styleUI: 'Bootstrap',
            datatype: "json",
            colNames: config.colNames,
            colModel: config.colModel,
            viewrecords: true,
            multiselect: true,
            rownumbers: true,
            height: !config.height ? null : config.height,
            sortorder: config.sortorder ? config.sortorder:"desc",
            rowNum: 15,
            rowList: [15, 50, 100],
            rownumWidth: 35,
            emptyrecords: "没有相关数据",
            loadComplete: function(xhr) {
                if (xhr && xhr.code === 401) {
                    alert(xhr.message);
                }
                $(window).resize();
            },
            loadError: function(xhr, status, error) {
                console.log(xhr);
                console.log(status);
                console.log(error);
            },
            pager: !config.pagerId ? "#pager_list" : "#" + config.pagerId,
            subGrid: config.subGrid ? true : false,
            subGridRowExpanded: config.subGridRowExpanded ? config.subGridRowExpanded : null,
            gridComplete: config.gridComplete ? config.gridComplete : function() {}
        };
        $.extend(defaultConfig, config);
        jqGrid.jqGrid(defaultConfig);
        jqGrid.jqGrid('navGrid', '#pager_list', { edit: false, add: false, del: false, search: false, refresh: true });
        var resizejqGrid = function () {
            //var width = $(window).width();
            var width = $(".jqGrid_wrapper").width();
            //有些系统ie下面得到的jqGrid_wapper的宽度不正常
            if (width < 400) {
                width = $(window).width();
            }
          
            jqGrid.setGridWidth(width <= 400 ? 400 : width);

         
            if (!config.height) {
                var toolheight = $("#searchToolBar").height();
                var footerheight = $("#footer").height();
                var bodyheight = $(window).height();
                var jgheight = 0;
                if (footerheight != null) {
                    jgheight = bodyheight - toolheight - footerheight - 160;
                } else {
                    jgheight = bodyheight - toolheight - 160;
                }
                jqGrid.setGridHeight(jgheight <= 300 ? 300 : jgheight);
            }
           
        }
        // Add responsive to jqGrid
        $(window).bind('resize', resizejqGrid);
        // 主要目的是调用resizeGridWidth方法，设置jqgrid的宽度
        $(window).resize();
        $(".ui-jqgrid-titlebar-close").remove();
    },

    //获取jqgrid的编辑内容
    GetData: function () {
        var id = $('#table_list').jqGrid('getGridParam', 'selrow');
        if (id)
            return $('#table_list').jqGrid("getRowData", id);
        else
            return null;
    },
    //获取jqgrid要删除的内容
    GetDataTableDeleteData: function () {
        return WikeGrid.GetAllSelected("table_list");
    },
    //得到选中的数据 
    GetSelectedData: function() {
        return WikeGrid.GetAllSelected("table_list");
    },
    //获取所有选择项
    GetAllSelected: function (id) {
        var res = {
            Len: 0,
            Data: []
        };
        var grid = $("#" + id);
        var rowKey = grid.getGridParam("selrow");

        if (rowKey) {
            var selectedIDs = grid.getGridParam("selarrrow");
            for (var i = 0; i < selectedIDs.length; i++) {
                res.Data.push(selectedIDs[i]);
            }
        }
        res.Len = res.Data.length;
        return res;
    },
    GetSelectedArrayData: function() {
    
        var grid = $("#table_list");
     
        var selr = grid.jqGrid('getGridParam', 'selarrrow');//选中多行

        var array = [];
        for (var v = 0; v < selr.length; v++) {
            var rowData = grid.jqGrid('getRowData', selr[v]);
            array.push(rowData);
        }
        return array;
    }


};

