//验证添加客户名称
function checkAddName() {
    var $fname = $("#addname");
    var $divID = $("#Divname");
    $divID.html("");
    if ($fname.val() == "") {
        $divID.html("客户名称不能为空");
        return false;
    }
    return true;
}
//验证添加负责人名称
function checkAddPersonInCharge() {
    var $fname = $("#addpersonInCharge");
    var $divID = $("#DivpersonInCharge");
    $divID.html("");
    if ($fname.val() == "") {
        $divID.html("负责人名称不能为空");
        return false;
    }
    return true;
}
//验证添加负责人职称
function checkAddPost() {
    var $fname = $("#addpost");
    var $divID = $("#Divpost");
    $divID.html("");
    if ($fname.val() == "") {
        $divID.html("负责人职称不能为空");
        return false;
    }
    return true;
}
//验证添加客户地址
function checkAddAddress() {
    var $fname = $("#addaddress");
    var $divID = $("#Divaddress");
    $divID.html("");
    if ($fname.val() == "") {
        $divID.html("客户地址不能为空");
        return false;
    }
    return true;
}
//验证添加送货地址
function checkAddFactoryAddress() {
    var $fname = $("#addfactoryAddress");
    var $divID = $("#DivfactoryAddress");
    $divID.html("");
    if ($fname.val() == "") {
        $divID.html("送货地址不能为空");
        return false;
    }
    return true;
}
//验证添加移动电话
function checkAddMobilePhone() {
    var $fname = $("#addmobilePhone");
    var $divID = $("#DivmobilePhone");
    $divID.html("");
    if ($fname.val() == "") {
        $divID.html("移动电话不能为空");
        return false;
    }
    return true;
}
//验证添加电话
function checkAddPhone() {
    var $fname = $("#addphone");
    var $divID = $("#Divphone");
    $divID.html("");
    if ($fname.val() == "") {
        $divID.html("电话不能为空");
        return false;
    }
    return true;
}
//验证添加传真
function checkAddFax() {
    var $fname = $("#addfax");
    var $divID = $("#Divfax");
    $divID.html("");
    if ($fname.val() == "") {
        $divID.html("传真不能为空");
        return false;
    }
    return true;
}


//验证修改客户名称
function checkUpdateName() {
    var $fname = $("#updatename");
    var $divID = $("#remindername");
    $divID.html("");
    if ($fname.val() == "") {
        $divID.html("客户名称不能为空");
        return false;
    }
    return true;
}
//验证修改负责人名称
function checkUpdatePersonInCharge() {
    var $fname = $("#updatepersonInCharge");
    var $divID = $("#reminderpersonInCharge");
    $divID.html("");
    if ($fname.val() == "") {
        $divID.html("负责人名称不能为空");
        return false;
    }
    return true;
}
//验证修改负责人职称
function checkUpdatePost() {
    var $fname = $("#updatepost");
    var $divID = $("#reminderpost");
    $divID.html("");
    if ($fname.val() == "") {
        $divID.html("负责人职称不能为空");
        return false;
    }
    return true;
}
//验证修改客户地址
function checkUpdateAddress() {
    var $fname = $("#updateaddress");
    var $divID = $("#reminderaddress");
    $divID.html("");
    if ($fname.val() == "") {
        $divID.html("客户地址不能为空");
        return false;
    }
    return true;
}
//验证修改送货地址
function checkUpdateFactoryAddress() {
    var $fname = $("#updatefactoryAddress");
    var $divID = $("#reminderfactoryAddress");
    $divID.html("");
    if ($fname.val() == "") {
        $divID.html("送货地址不能为空");
        return false;
    }

    return true;
}
//验证修改移动电话
function checkUpdateMobilePhone() {
    var $fname = $("#updatemobilePhone");
    var $divID = $("#remindermobilePhone");
    $divID.html("");
    if ($fname.val() == "") {
        $divID.html("移动电话不能为空");
    }
    return true;
}
//验证修改电话
function checkUpdatePhone() {
    var $fname = $("#updatephone");
    var $divID = $("#reminderphone");
    $divID.html("");
    if ($fname.val() == "") {
        $divID.html("电话不能为空");
        return false;
    }
    return true;
}
//验证修改传真
function checkUpdateFax() {
    var $fname = $("#updatefax");
    var $divID = $("#reminderfax");
    $divID.html("");
    if ($fname.val() == "") {
        $divID.html("传真不能为空");
        return false;
    }
    return true;
}

$(function () {
    //修改为不合作客户
    $("#btn-disable").click(function () {
        var clientList = new Array();
        $(".clients").each(function (index, date) {
            var checkbox = $(date).find(".clientId");
            if(checkbox.is(':checked')){
                //选中了
                var id = $(date).find(".clientId").val();
                var object = new Object();
                object.clientId = id;
                clientList.push(object);
                var noncooperationClient = JSON.stringify(clientList);
                $.ajax({
                    type: "post",
                    url: "/client/noncooperationClient.do",
                    data: {
                        "noncooperationClient": noncooperationClient
                    },
                    dataType: "json",
                    success: function (data) {
                        alert("禁用成功")
                        window.location.href="/client/noncooperation.do";
                    },
                    error: function () {
                        alert("系统异常，请稍后重试！");
                    }
                })
            }
        });
    })
    //添加客户信息
    $("#insert").click(function () {
        $("#addname").blur(checkAddName);
        $("#addpersonInCharge").blur(checkAddPersonInCharge);
        $("#addpost").blur(checkAddPost);
        $("#addaddress").blur(checkAddAddress);
        $("#addfactoryAddress").blur(checkAddFactoryAddress);
        $("#addmobilePhone").blur(checkAddMobilePhone);
        $("#addphone").blur(checkAddPhone);
        $("#addfax").blur(checkAddFax);
            var flag = true;
            if (!checkAddName()) flag = false;
            if (!checkAddPersonInCharge()) flag = false;
        if (!checkAddPost()) flag = false;
        if (!checkAddAddress()) flag = false;
        if (!checkAddFactoryAddress()) flag = false;
        if (!checkAddMobilePhone()) flag = false;
        if (!checkAddPhone()) flag = false;
        if (!checkAddFax()) flag = false;
            if(flag != false){
                var clients = new Array();
                var object =new Object();
                object.clientName= $("#addname").val();
                object.clientPersonInCharge= $("#addpersonInCharge").val();
                object.clientPost= $("#addpost").val();
                object.clientPhone= $("#addphone").val();
                object.clientMobilePhone= $("#addmobilePhone").val();
                object.clientFax= $("#addfax").val();
                object.clientAddress= $("#addaddress").val();
                object.clientFactoryAddress= $("#addfactoryAddress").val();
                object.clientState= $("#addstate").val();
                clients.push(object);
                var clientList = JSON.stringify(clients);
                $.ajax({
                    type: "post",
                    url: "/client/addClient.do",
                    data: {
                        "clientList": clientList
                    },
                    dataType: "json",
                    success: function (data) {
                        alert("添加成功")
                        $("#closeAdd").click();
                        var str = "";
                        if(data!=0){
                            window.location.href="/client/cooperative.do";
                        }
                        $("#addname").val("");
                        $("#addpersonInCharge").val("");
                        $("#addpost").val("");
                        $("#addphone").val("");
                        $("#addmobilePhone").val("");
                        $("#addfax").val("");
                        $("#addaddress").val("");
                        $("#addfactoryAddress").val("");
                        $("#addstate").val("");
                    },
                    error: function () {
                        alert("系统异常，请稍后重试！");
                    }
                })
            }
        })
    //修改客户信息
    $("#updates").click(function () {
        $("#updatename").blur(checkUpdateName);
        $("#updatepersonInCharge").blur(checkUpdatePersonInCharge);
        $("#updatepost").blur(checkUpdatePost);
        $("#updateaddress").blur(checkUpdateAddress);
        $("#updatefactoryAddress").blur(checkUpdateFactoryAddress);
        $("#updatemobilePhone").blur(checkUpdateMobilePhone);
        $("#updatephone").blur(checkUpdatePhone);
        $("#updatefax").blur(checkUpdateFax);
        var flag = true;
        if (!checkUpdateName()) flag = false;
        if (!checkUpdatePersonInCharge()) flag = false;
        if (!checkUpdatePost()) flag = false;
        if (!checkUpdateAddress()) flag = false;
        if (!checkUpdateFactoryAddress()) flag = false;
        if (!checkUpdateMobilePhone()) flag = false;
        if (!checkUpdatePhone()) flag = false;
        if (!checkUpdateFax()) flag = false;
        if(flag != false){
            var clients = new Array();
            var object =new Object();
            object.clientId= $("#updateid").val();
            object.clientName= $("#updatename").val();
            object.clientPersonInCharge= $("#updatepersonInCharge").val();
            object.clientPost= $("#updatepost").val();
            object.clientAddress= $("#updateaddress").val();
            object.clientFactoryAddress= $("#updatefactoryAddress").val();
            object.clientMobilePhone= $("#updatemobilePhone").val();
            object.clientPhone= $("#updatephone").val();
            object.clientFax= $("#updatefax").val();
            clients.push(object);
            var clientList = JSON.stringify(clients);
            $("#updatename").val("");
            $("#updatepersonInCharge").val("");
            $("#updatepost").val("");
            $("#updatephone").val("");
            $("#updatemobilePhone").val("");
            $("#updatefax").val("");
            $("#updateaddress").val("");
            $("#updatefactoryAddress").val("");
            $("#updatestate").val("");
            $("#closeUpdate").click();
        $.ajax({
            type: "post",
            url: "/client/updatesClient.do",
            data: {
                "clientList": clientList
            },
            dataType: "json",
            success: function (data) {
                alert("修改成功");
                var str = "";
                if(data!=0){

                    window.location.href="/client/cooperative.do";
                }
            },
            error: function () {
                alert("系统异常，请稍后重试！");
            }
        })
        }
    })
    //查看终止合作的客户
    $("#termination").click(function () {
        window.location.href="/client/noncooperation.do";
    })
    //查看在合作客户
    $("#cooperation").click(function () {
        window.location.href="/client/cooperative.do";
    })
    //修改客户为合作
    $("#btn-enable").click(function () {
        var clientList = new Array();
        $(".clients").each(function (index, date) {
            var checkbox = $(date).find(".clientId");
            if(checkbox.is(':checked')){
                //选中了
                var id = $(date).find(".clientId").val();
                var object = new Object();
                object.clientId = id;
                clientList.push(object);
                var cooperativeClients = JSON.stringify(clientList);
                $.ajax({
                    type: "post",
                    url: "/client/cooperativeClient.do",
                    data: {
                        "cooperativeClients": cooperativeClients
                    },
                    dataType: "json",
                    success: function (data) {
                        alert("启用成功")
                        window.location.href="/client/cooperative.do";
                    },
                    error: function () {
                        alert("系统异常，请稍后重试！");
                    }
                })
            }
        });
    })
})
//获取要修改的信息
function gainclient(val){
    $("#updatename").val("");
    $("#updatepersonInCharge").val("");
    $("#updatepersonInCharge").val("");
    $("#updatepost").val("");
    $("#updateaddress").val("");
    $("#updatefactoryAddress").val("");
    $("#updatemobilePhone").val("");
    $("#updatephone").val("");
    $("#updatefax").val("");
    $.ajax({
        type: "post",
        url: "/client/clientId.do?clientId="+val,
        dataType: "json",
        success: function (data) {
            if(data!=0){
                $.each(data, function(i,item){
                    $("#updateid").val(item.clientId)
                    $("#updatename").val(item.clientName)
                    $("#updatepersonInCharge").val(item.clientPersonInCharge)
                    $("#updatepost").val(item.clientPost)
                    $("#updateaddress").val(item.clientAddress)
                    $("#updatefactoryAddress").val(item.clientFactoryAddress)
                    $("#updatemobilePhone").val(item.clientMobilePhone)
                    $("#updatephone").val(item.clientPhone)
                    $("#updatefax").val(item.clientFax)
                });
            }

        },
        error: function () {
            alert("系统异常，请稍后重试！");
        }
    })
}