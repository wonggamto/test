//全局变量
var cur_selector = null;
var arrElementAttr = [];
var arrDel = [];
var arrElementID = [];
var strRuleHtml = "";
var oInitElement = null;
var oInitSave = null;
var oTemplateValue = "";
var oTemplateText = "";
var instance;
var flowDefId;
var FlowDefKey;
var FlowDefName;
var currentMaterTitle;
// this is the paint style for the connecting lines..
var connectorPaintStyle = {
    strokeWidth: 2,
    stroke: "#61B7CF",
    joinstyle: "round",
    outlineStroke: "white",
    outlineWidth: 1
},
// .. and this is the hover style.
    connectorHoverStyle = {
        strokeWidth: 3,
        stroke: "#216477",
        outlineWidth: 0,
        outlineStroke: "white"
    },
    endpointHoverStyle = {
        fill: "#216477",
        stroke: "#216477"
    },
// the definition of source endpoints (the small blue ones)
    endpoint = {
        endpoint: "Dot",
        paintStyle: {
            stroke: "#7AB02C",
            fill: "transparent",
            radius: 2,
            strokeWidth: 1
        },
        isSource: true,
        isTarget: true,
        connector: ["Flowchart", { stub: [30, 30], gap: 1, cornerRadius: 0, alwaysRespectStubs: true }],
        connectorStyle: connectorPaintStyle,
        hoverPaintStyle: endpointHoverStyle,
        connectorHoverStyle: connectorHoverStyle,
        maxConnections: 30,
        dragOptions: {},
        overlays: [
            ["Label", {
                location: [0.5, 1.5],
                label: "Drag",
                cssClass: "aLabel",
                visible: false
            }]
        ]
    },

    init = function (connection) {

    };


function bingDiagram(id) {
 
    $.ajax({
        type: "post",
        url: "/basic/task/flow/design?id="+id,
        //data: { id: id },
        // contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            flowDefId = data.Id;
            FlowDefKey = data.FlowDefKey;
            FlowDefName = data.FlowDefName;
            
            //绑定节点
            for (var i = 0; i < data.nodes.length; i++) {
                var node = data.nodes[i];
                var id = node.id;

                var cur_css = node.nodeType;
                var type = node.nodeType;
                var left = node.leftX;
                var top = node.topX;
                var width = node.width;
                var height = node.height;
                var username = node.userNames;
                var userid = node.userIds;
                var rolename = node.roleNames;
                var roleid = node.roleIds;
                var ordernum= node.orderNum;
                var style = "left:" + left + "px;";
                style = style + "top:" + top + "px;";
                style = style + "width:" + width + "px;";
                style = style + "height:" + height + "px;";
                $("#divCenter").append('<div style="' + style + '" class="node ' + cur_css + '" id="' + id + '" roleid="' + roleid + '" rolename="' + rolename + '" ordernum="'+ordernum+'" userid="' + userid + '" username="' + username + '" dbtype="' + type + '" parentid="divCenter" onclick="oInitElement.GetPropertiesByType(\'' + type + '\',this)" ><label>' + node.nodeDefName + '</label></div>');

                addEndpoints(id, ["RightMiddle", "LeftMiddle", "BottomCenter", "TopCenter"]);

                $("#" + id).draggable({
                    containment: "parent",
                    start: function () {
                        startMove();
                    },
                    drag: function (event, ui) {
                        MoveSelectDiv(event, ui, id);
                        instance.repaintEverything();
                    },
                    stop: function () {
                        instance.repaintEverything();
                    }
                });

                $("#" + id).resizable({
                    resize: function () {
                        instance.repaintEverything();
                    },
                    stop: function () {
                        instance.repaintEverything();
                    }
                });
            }


            for (var j = 0; j < data.nodeLinks.length; j++) {

                var nodelink = data.nodeLinks[j];
                var sourceId = nodelink.sourceId + nodelink.startPostion;
                var targetId = nodelink.targetId + nodelink.endPostion;
                var con = instance.connect({ uuids: [sourceId, targetId] });
                if (nodelink.linkName != null && nodelink.linkName != "") {
                    con.getOverlay("label").setLabel(nodelink.linkName);
                }
                var lableId = con.getOverlay("label").canvas.id;
                $("#" + lableId).attr("condition", nodelink.condition);
            }

        }  
    });
}



//页面初始化完成之后
$(function () {

    instance = jsPlumb.getInstance({
        // default drag options
        DragOptions: { cursor: 'pointer', zIndex: 2000 },
        // the overlays to decorate each connection with.  note that the label overlay uses a function to generate the label text; in this
        // case it returns the 'labelText' member that we set on each connection in the 'init' method below.
        ConnectionOverlays: [
            ["Arrow", {
                location: 1,
                visible: true,
                width: 11,
                length: 11,
                id: "ARROW",
                events: {
                    click: function (e) {

                    }
                }
            }],
            ["Label", {
                location: 0.5,
                id: "label",
                cssClass: "aLabel",
                events: {

                    tap: function (e) {

                    }
                }
            }]
        ],
        Container: "canvas"
    });

    var basicType = {
        connector: "StateMachine",
        paintStyle: { stroke: "red", strokeWidth: 2 },
        hoverPaintStyle: { stroke: "blue" }

    };
    instance.registerConnectionType("basic", basicType);


    instance.batch(function () {
        instance.bind("connection", function (connInfo, originalEvent) {
            init(connInfo.connection);
        });
        instance.draggable(jsPlumb.getSelector(".flowchart-demo .window"), { grid: [20, 20] });

        instance.bind("click", function (conn, originalEvent) {
            // if (confirm("Delete connection from " + conn.sourceId + " to " + conn.targetId + "?"))
            //   instance.detach(conn);.detach(conn);
            oInitElement.SendPropRequest("connect", conn);
            conn.toggleType("basic");


        });
        instance.bind("dbclick", function (conn, originalEvent) {
            // if (confirm("Delete connection from " + conn.sourceId + " to " + conn.targetId + "?"))
            //   instance.detach(conn);.detach(conn);
            alert(1);


        });

        instance.bind("connectionDrag", function (connection) {
            console.log("connection " + connection.id + " is being dragged. suspendedElement is ", connection.suspendedElement, " of type ", connection.suspendedElementType);
        });

        instance.bind("connectionDragStop", function (connection) {
            console.log("connection " + connection.id + " was dragged");
        });

        instance.bind("connectionMoved", function (params) {
            console.log("connection " + params.connection.id + " was moved");
        });
    });

    //0.初始化闭包对象
    oInitElement = new InitElementAttr();
    oInitSave = new SaveElement();
    var oInitDelete = new DeleteElement();
    //1.初始化新建、保存、删除事件
    $("#btn_save").click(function () {
        oInitSave.Save();
    });

    $("#btn_saveNew").click(function () {
        oInitSave.SaveNew();
    });
    $("#btn_delete").click(function () {
        oInitDelete.Delete();
    });


    //2.初始化页面元素的自适应
    Resize();
    $(window).resize(function () {
        Resize();
    });
    //$(window).bind('beforeunload', function () { return '确定离开当前页面吗？未保存的数据将会丢失！'; });

    $('#divContentLeftMenu').BootSideMenu({ side: "left", autoClose: false });
    $('#divRight').BootSideMenu({ side: "right" });

    //3.初始化拖拽和选择事件
    var oInitDrag = new InitDrag();
    oInitDrag.InitPlant();
    oRegionSelect = new RegionSelect({
        region: '#divCenter div.node',
        selectedClass: 'seled',
        parentId: "divCenter"
    });
    oRegionSelect.select();
    flowDefId=getUrlParam("id");
    $("#FlowDefId").val(flowDefId);
    bingDiagram(flowDefId);
});

//通过正则匹配获取当前页面的url中的参数
function getUrlParam(name){
    var reg = new RegExp("(^|&)"+name+"=([^&]*)(&|$)"); 
    var r =  window.location.search.substr(1).match(reg);
    var strValue = "";
    if (r!=null){
     strValue= unescape(r[2]);
    }
    return strValue;
}

var addEndpoints = function (toId, sourceAnchors) {
    for (var i = 0; i < sourceAnchors.length; i++) {
        var targetUuid = toId + sourceAnchors[i];
        instance.addEndpoint(toId,
            endpoint, {
                anchor: sourceAnchors[i], uuid: targetUuid
            });
    }

};

var getWorkFlowModel= function() {

    var flow = {};
    flowDefId=$("#FlowDefId").val();
    flow.Id = 'flowDefId';
    flow.FlowDefKey = flowDefId;
    //flow.FlowDefName = FlowDefName;

    //1.取得所有的连线
    flow.NodeLinks = [];

    $.each(instance.getAllConnections(), function (idx, connection) {

        flow.NodeLinks.push({
            LinkType: connection.connector.type, //连接类型
            LinkId: connection.id,
            FlowDefId: flowDefId,
            SourceId: connection.sourceId,
            TargetId: connection.targetId,
            StartLeft: connection['endpoints'][0].canvas.offsetLeft,
            StartTop: connection['endpoints'][0].canvas.offsetTop,
            StartPostion: connection['endpoints'][0].anchor.type,
            EndLeft: connection['endpoints'][1].canvas.offsetLeft,
            EndTop: connection['endpoints'][1].canvas.offsetTop,
            EndPostion: connection['endpoints'][1].anchor.type,
            Path: $(connection.connector.path.outerHTML).attr("d"),
            LinkName: connection.getOverlay("label").labelText,
            LinkNameLeft: connection.getOverlay("label").canvas.offsetLeft,
            LinkNameTop: connection.getOverlay("label").canvas.offsetTop,
            Condition: $("#" + connection.getOverlay("label").canvas.id).attr("condition")
        });
    });
    //2.取得所有的节点

    flow.Nodes = [];
    $("#divCenter .node").each(function (idx, elem) {
        var $elem = $(elem);
        flow.Nodes.push({

            Id: $elem.attr('id'),
            FlowDefId: flowDefId,
            NodeDefName: $elem.find("label")[0].innerHTML,
            LeftX: parseInt($elem.css("left"), 10),
            TopX: parseInt($elem.css("top"), 10),
            Width: $elem.width(),
            Height: $elem.height() + 2,//处理高度每次变小的情况
            BlockTag: $elem.attr("tag"),
            NodeType: $elem.attr("dbtype"),
            RoleIds: $elem.attr("roleid"),
            RoleNames: $elem.attr("rolename"),
            UserIds: $elem.attr("userid"),
            UserNames: $elem.attr("username"),
            OrderNum: $elem.attr("ordernum")
        });
    });
    return flow;
}


//保存
var SaveElement = function () {
    var oSave = new Object();

    oSave.Save = function () {
        var flow = getWorkFlowModel(); 
        $.ajax({
            type: "post",
            url: "/basic/task/flow/design/save",
            data: JSON.stringify(flow),
            contentType: "application/json; charset=utf-8",
            beforeSend: function (XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader("Authorization", "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiLlvpDlupTmnpciLCJ1bmlxdWVfbmFtZSI6Inh1eWluZ2xpbiIsImp0aSI6IjZkODlhNzM2LWZiM2QtNDIyNy05ZmNkLWM2MzhjMTQ0Yzk0YyIsImlhdCI6IjIwMTkvNi8xMCAzOjQ0OjQ0IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6IuW-kOW6lOaelyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2dpdmVubmFtZSI6IuWQiemYs-aZuuiDveenkeaKgOaciemZkOWFrOWPuCzliLbpgKDpg6giLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL2dyb3Vwc2lkIjoiNjJiNzVkZGUtOTU4Yy00MDhlLWEzNjktMzdhMmU0MGVmMWJhLGU4MGZiOWEyLTgyZjEtNDgwNi1hMWQyLTRjNDE1YTFkZmE2MiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiJmMjMzYTAxNS0zZDdkLTQ5YTMtOWE2Zi0yMDNlMzY1ZGQ1ZjkiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3VzZXJkYXRhIjoiL2xvZywvc3lzdGVtY29uZmlnLFJlbW92ZUNvbmZpZyxVcGRhdGVDb25maWcsQ3JlYXRlQ29uZmlnLEdldENvbmZpZ0xpc3QsL3N5c3RlbWljbywvd29ya2Zsb3d0ZXN0LC93b3JrZmxvdywvb3JnbGlzdCxHZXRBbGxVbml0TGlzdCxHZXRBbGxVc2VycywvcGVybWlzc2lvbmxpc3QsL3JvbGVzbGlzdCxiMGQwZTRkZC05YTIyLTQ2NjItOTc0MS1lMDNjMmY4NDk1NmQsL21hdGVyaWFscy1jYXRlZ29yeSwvbWF0ZXJpYWxzLWRlZmluZSwvYm9tLW1hbmFnZSw3NTQ1NjExMy03MzNjLTQ0ZmYtYTgxZi1mOWM5ZDk1NzU0YTcsL2RhdGFjb2xsZWN0aW9uLDZhZTM0MzgwLWQ5MjEtNGRhNy1iM2MxLWVjNTEwNGQ4YTNkMSwvd29ya21hbnNoaXAsYTJlN2Y1MGYtYzU4NS00NjI0LWIyODctY2Q2YTY0OTg3ZTcyLDIzMmNjZmI4LTQzYjAtNGZmZi1hNjE0LWMzNTMwZmViMTJiMSIsIm5iZiI6MTU2MDEzODI4NCwiZXhwIjoxNTYwNzQzMDg0LCJpc3MiOiJBdXRoU3lzdGVtIiwiYXVkIjoiQmFzaWNJbmZvIn0.Sx36kp_eopmPMIJagCaJ1SsQHtMjhvqZNIjsQRYDX6E");
            },
            dataType: "json",
            success: function (data) {
                if(data&&data.result){
                    layer.msg('保存成功！', {offset: 't',time:2000});
                }
                else{
                    layer.msg('保存失败！'+'['+data.statusCode+']'+data.error, {offset: 't',time:4000});
                }
            }
        });
    };

    oSave.SaveNew = function () {

        
        var flow = getWorkFlowModel(); 
        $.ajax({
            type: "post",
            url: "/FlowDesign/SaveDiagramNew",
            data: JSON.stringify(flow),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                parent.layer.alert(data.Message);
            }
        });
    };
    return oSave;
};

var uuid = function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0 * 3 | 0 * 8);
        return v.toString(16).toUpperCase();
    });
};

//删除
var DeleteElement = function () {
    var oDeleteElement = new Object();

    //删除操作
    oDeleteElement.Delete = function () {


        var connections = instance.getAllConnections();
        for (var c = 0; c < connections.length; c++) {
            var connection = connections[c];
            var stroke = $(connection.connector.path.outerHTML).attr("stroke");
            if (stroke == "red") {
                instance.detach(connection);
            }
        }
        //不允许级联删除
        var selectarr = getSelectedRegions();
        for (var i = 0; i < selectarr.length; i++) {
            instance.remove(selectarr[i], true);
        }
        instance.repaintEverything();

    };
    return oDeleteElement;
};


function setRoles(dom) {
    top.layer.open({
        title: '角色设置',
        type: 2,
        content: "/Role/SelectRole",
        area: ['1000px', '730px'],
        btn: ['确认', '关闭'],
        btnclass: ['btn btn-primary', 'btn btn-danger'],
        yes: function (index, layero) {
            
            var data = $(layero).find("iframe")[0].contentWindow.getContent();
            if (data == null || data.length == 0) {
                top.layer.alert("请选择数据");
                return;
            }
            var roleid = "";
            var rolename = "";
            for (var i = 0; i < data.length; i++) {
                roleid += data[i].Id + ";";
                rolename += data[i].RoleName + ";";
            }
            if (typeof (cur_selector.attr("roleid")) != "undefined") {
                roleid = roleid + cur_selector.attr("roleid");
            }
            if (typeof (cur_selector.attr("rolename")) != "undefined") {
                rolename = rolename + cur_selector.attr("rolename");
            }
            cur_selector.attr("roleid", roleid.toUpperCase());
            cur_selector.attr("rolename", rolename);
             
            $(dom).prev().val(rolename);
            top.layer.close(index);
        }, cancel: function () {
            return true;
        }
    });
}

function removeRoles(dom) {
    cur_selector.attr("roleid", "");
    cur_selector.attr("rolename", "");
    $(dom).prev().prev().val("");
}

function setMater(dom) {
    var proCode=cur_selector.attr("id");
    top.layer.open({
        title: currentMaterTitle+'工序-物料中心',
        type: 2,
        content: "/#/workflow/mater/choose/"+proCode,
        area: ['1060px', '630px'],
        btn: ['关闭'],
        btnclass: ['btn btn-danger'],
        yes: function (index, layero) {
            top.layer.close(index);
            return true;
            // var data = $(layero).find("iframe")[0].contentWindow.getContent();
            // if (data == null || data.length == 0) {
            //     top.layer.alert("请选择数据");
            //     return;
            // }
            // var userid = "";
            // var username = "";
            // for (var i = 0; i < data.length; i++) {
            //     userid += data[i].Id + ";";
            //     username += data[i].TrueName + ";";
            // }
            // if (typeof (cur_selector.attr("userid")) != "undefined") {
            //     userid = userid + cur_selector.attr("userid");
            // }
            // if (typeof (cur_selector.attr("username")) != "undefined") {
            //     username = username + cur_selector.attr("username");
            // }
            // cur_selector.attr("userid", userid.toUpperCase());
            // cur_selector.attr("username", username);
            // $(dom).prev().val(username);
           
        }, cancel: function () {
            return true;
        }
    });
}
function setMaterQuality(dom) {
    var proCode=cur_selector.attr("id");
    top.layer.open({
        title: currentMaterTitle+'工序-品质质量中心',
        type: 2,
        content: "/#/workflow/quality/choose/"+proCode,
        area: ['1060px', '630px'],
        btn: ['关闭'],
        btnclass: ['btn btn-danger'],
        yes: function (index, layero) {
            top.layer.close(index);
            return true;
        }, cancel: function () {
            return true;
        }
    });
}
function setFileManage(dom) {
    var proCode=cur_selector.attr("id");
    top.layer.open({
        title: currentMaterTitle+'工序-文件中心',
        type: 2,
        content: "/#/workflow/files/choose/"+proCode,
        area: ['1060px', '630px'],
        btn: ['关闭'],
        btnclass: ['btn btn-danger'],
        yes: function (index, layero) {
            top.layer.close(index);
            return true;
        }, cancel: function () {
            return true;
        }
    });
}
function removeUsers(dom) {
    cur_selector.attr("userid", "");
    cur_selector.attr("username", "");
    $(dom).prev().prev().val("");
}

//初始化右边属性框
var InitElementAttr = function () {
    var oElement = new Object();

    //0.拖拽界面元素的单击事件
    oElement.GetPropertiesByType = function (type, sthis) {
        var evt = window.event || arguments[0];
        cur_selector = $(sthis);
        oElement.SendPropRequest(type, cur_selector);
        evt.cancelBubble = true;
    };


    oElement.SendPropRequest = function (type, seletor) {
        var strHtml;
        if (type == "connect") {

            $("#divRightContent").html("");
            strHtml = "<div style='float:right;padding-top:0px;width:300px;height:auto;'>" +
                "<table class='table table-bordered' style='margin-top:15px;' cellpadding='5' border='1'>" +
                "<tr><td><label>名称</label></td><td><input type='text' id='attr_connectname' style='width:100px'/></td></tr>" +
                "<tr><td><label>条件</label></td><td><input type='text' id='attr_condition' style='width:100px'/></td></tr>";
            strHtml += "</table></div>";
            $("#divRightContent").html(strHtml);

            oElement.InitLinkAttr(type, seletor);



        } else {
            $("#divRightContent").html("");
            strHtml = "<div style='float:right;padding-top:0px;width:300px;height:auto;'>" +
                "<table class='table table-bordered' style='margin-top:15px;' cellpadding='5' border='1'>" +
                "<tr><td><label>名称</label></td><td><input type='text' style='width:100px' id='attr_facname'/></td></tr>" +
                "<tr><td><label>宽度</label></td><td><input type='text' style='width:100px' id='attr_width'/>px</td></tr>" +
                "<tr><td><label>高度</label></td><td><input type='text' style='width:100px' id='attr_height'/>px</td></tr>" +
                "<tr><td><label>上边距</label></td><td><input type='text' style='width:100px' id='attr_top'/>px</td></tr>" +
                "<tr><td><label>左边距</label></td><td><input type='text' style='width:100px' id='attr_left'/>px</td></tr>";
            if ($(seletor).attr("dbtype") == "task") {
                strHtml +=  "<tr><td ><label>排序值</label></td><td><input type='text' style='width:100px' value='0' id='attr_ordernum'/></td></tr>"+
                "<tr><td colspan='2' style='text-align:center'><input type='button' value='确 定' /></td></tr>"+
                "<tr><td><label>绑定物料</label></td><td><a href='#' onclick='setMater(this);'>物料中心</a></td></tr>"+
                "<tr><td><label>绑定质量</label></td><td><a href='#' onclick='setMaterQuality(this);'>品质质量中心</a></td></tr>"+
                "<tr><td><label>上传文件</label></td><td><a href='#' onclick='setFileManage(this);'>文件中心</a></td></tr>";
               
                        // "<tr><td><label>角色</label></td><td><input type='text'style='width:100px' readonly='readonly' id='attr_role'/><input type='button' value='设置' onclick='setRoles(this);'/><input type='button' value='删除' onclick='removeRoles(this);'/></td></tr>" +
                        // "<tr><td><label>用户</label></td><td><input type='text' style='width:100px' readonly='readonly' id='attr_user'/><input type='button' value='设置' onclick='setUsers(this);'/><input type='button' value='删除' onclick='removeUsers(this);'/></td></tr>";
              
            }
            strHtml += "</table></div>";
            $("#divRightContent").html(strHtml);
            //$("#attr_rule").html(strRuleHtml);
            oElement.InitNodeAttr(type, seletor);
        }
    };

    oElement.InitLinkAttr = function (type, connection) {

        var name = connection.getOverlay("label").labelText;

        var labelId = connection.getOverlay("label").canvas.id;

        var condition = $("#" + labelId).attr("condition");
        $("#divRight").find("#attr_connectname").val(name);
        $("#divRight").find("#attr_condition").val(condition);



        $("#divRight").find("#attr_connectname").blur(function () {

            connection.getOverlay("label").setLabel($(this).val());
            instance.repaintEverything();
        }).keydown(function (event) {
            if (event.keyCode == "13") {
                connection.getOverlay("label").setLabel($(this).val());
                instance.repaintEverything();
            }
        });
        $("#divRight").find("#attr_condition").blur(function () {
            $("#" + labelId).attr("condition", $(this).val());

            instance.repaintEverything();
        }).keydown(function (event) {
            if (event.keyCode == "13") {
                $("#" + labelId).attr("condition", $(this).val());
                instance.repaintEverything();
            }
        });
    }


    //3.初始化属性框和拖拽区元素的对应事件
    oElement.InitNodeAttr = function (type, seletor) {
        //1.设置宽度和高度
        //console.log('selector',seletor);
        var strheight = parseInt($(seletor).height());
        var strwidht = parseInt($(seletor).width());
        var strtop = parseInt($(seletor).position().top);
        var strleft = parseInt($(seletor).position().left);
        var rolename = $(seletor).attr("rolename");
        var username = $(seletor).attr("username");
        var ordernum = $(seletor).attr("ordernum");
        $("#divRight").find("#attr_height").val(strheight);
        $("#divRight").find("#attr_width").val(strwidht);
        $("#divRight").find("#attr_top").val(strtop);
        $("#divRight").find("#attr_left").val(strleft);
        if (typeof (rolename) != "undefined" ) {
            $("#divRight").find("#attr_role").val(rolename);
        }
        if (typeof (username) != "undefined") {
            $("#divRight").find("#attr_user").val(username);
        }
        if (typeof (ordernum) != "undefined") {
            $("#divRight").find("#attr_ordernum").val(ordernum);
        }

        
      
        //2.注册属性值的blur事件
        $("#divRight").find("#attr_height").blur(function () {
            $(seletor).css("height", $(this).val() + "px");
            instance.repaintEverything();
        }).keydown(function (event) {
            if (event.keyCode == "13") {
                $(seletor).css("height", $(this).val() + "px");
                instance.repaintEverything();
            }
        });
        $("#divRight").find("#attr_width").blur(function () {
            $(seletor).css("width", $(this).val() + "px");
            instance.repaintEverything();
        }).keydown(function (event) {
            if (event.keyCode == "13") {
                $(seletor).css("width", $(this).val() + "px");
                instance.repaintEverything();
            }
        });

        $("#divRight").find("#attr_top").blur(function () {
            $(seletor).css("top", $(this).val() + "px");
            instance.repaintEverything();
        }).keydown(function (event) {
            if (event.keyCode == "13") {
                $(seletor).css("top", $(this).val() + "px");
                instance.repaintEverything();
            }
        });

        $("#divRight").find("#attr_left").blur(function () {
            $(seletor).css("left", $(this).val() + "px");
            instance.repaintEverything();
        }).keydown(function (event) {
            if (event.keyCode == "13") {
                $(seletor).css("left", $(this).val() + "px");
                instance.repaintEverything();
            }
        });
         
        $("#divRight").find("#attr_ordernum").blur(function () {
           $(seletor).attr("ordernum", $(this).val());
           instance.repaintEverything();
        }).keydown(function (event) {
           if (event.keyCode == "13") {
               $(seletor).attr("ordernum", $(this).val());
               instance.repaintEverything();
           }
        });


        //$("#divRight").find("#attr_role").blur(function () {
        //    $(seletor).attr("rolename", $(this).val() );
        //    instance.repaintEverything();
        //}).keydown(function (event) {
        //    if (event.keyCode == "13") {
        //        $(seletor).attr("rolename", $(this).val());
        //        instance.repaintEverything();
        //    }
        //});

        //$("#divRight").find("#attr_user").blur(function () {
        //    $(seletor).attr("username", $(this).val());
        //    instance.repaintEverything();
        //}).keydown(function (event) {
        //    if (event.keyCode == "13") {
        //        $(seletor).attr("username", $(this).val());
        //        instance.repaintEverything();
        //    }
        //});


        var olabel = $(seletor).find("label");
        if (olabel.length > 0) {
            $("#divRight").find("#attr_facname").val(olabel[0].innerHTML);
            currentMaterTitle=olabel[0].innerHTML;
            $("#divRight").find("#attr_facname").blur(function () {
                olabel[0].innerHTML = $(this).val();
          
            });
        }
        if(typeof olabel[0].innerHTML!='undefined'){
             $("#currentSelectTitle").html(" 当前选择的是："+olabel[0].innerHTML);
        }
    }

    return oElement;
};

var i = 0;

//初始化页面拖拽
var InitDrag = function () {
    var oDrag = new Object();

    //0.初始化工厂的拖拽
    oDrag.InitPlant = function () {

        //5.3 模型的拖拽事件
        $("#divContentLeftMenu .node").draggable({
            helper: "clone",
            scope: "plant"
        });

        //5.4 中间拖拽区的drop事件
        $("#divCenter").droppable({
            scope: "plant",
            drop: function (event, ui) {
                //0.3 创建工厂模型到拖拽区
                oDrag.CreateModel(ui, $(this));
            }
        });
    };

    //1.创建模型（参数依次为：drop事件的ui、当前容器、id、当前样式）
    oDrag.CreateModel = function (ui, selector) {
        //1.1 添加html模型
        //$(selector).append('<div class="node node1" onclick="oInitElement.GetPropertiesByType(\'Factory\',this)" id="' + id + '" >' + $(ui.helper).html() + '</div>');
        var modelid = $(ui.draggable).attr("id");
        i++;
        var id = uuid();

        var cur_css = modelid;
        var type = $(ui.helper).attr("dbtype");
        $(selector).append('<div class="node ' + cur_css + '" id="' + id + '" dbtype="' + type + '" parentid="' + $(selector).attr("id") + '" onclick="oInitElement.GetPropertiesByType(\'' + type + '\',this)" >' + $(ui.helper).html() + '</div>');
        var left = parseInt(ui.offset.left - $(selector).offset().left);
        var top = parseInt(ui.offset.top - $(selector).offset().top);
        $("#" + id).css("left", left).css("top", top);
        //instance.setContainer($("#divCenter"));
        //1.2 添加连接点

        addEndpoints(id, ["RightMiddle", "LeftMiddle", "BottomCenter", "TopCenter"]);



        instance.draggable(id);

        //1.3 注册实体可draggable和resizable
        $("#" + id).draggable({
            containment: "parent",
            start: function () {
                startMove();
            },
            drag: function (event, ui) {
                MoveSelectDiv(event, ui, id);
                instance.repaintEverything();
            },
            stop: function () {
                instance.repaintEverything();
            }
        });

        $("#" + id).resizable({
            resize: function () {
                instance.repaintEverything();
            },
            stop: function () {
                instance.repaintEverything();
                //oInitElement.SendPropRequest("DTO_TM_PLANT", $(this));
            }
        });
        oInitElement.GetPropertiesByType(type, $("#" + id));


        return id;
    };

    return oDrag;
};

var oRegionSelect;

function Resize() {
    $("#divContent").height($(window).height() - $("#divHead").height() - $("#divBottom").height() - 20);
    $("#divCenter").height($("#divContent").height()).width($("#divContent").width());

    var iHeightN = $("#divSidebar").height();
    var iHeightRigth = $("#divRight").height();
    var iHeight = $("#divContent").height();
    if (iHeightN < iHeightRigth) iHeightN = iHeightRigth;
    if (iHeightN < iHeight) iHeightN = iHeightRigth;
    else $("#divContent2").height(iHeightN);

    $("#divCenter").height(iHeightN);

}