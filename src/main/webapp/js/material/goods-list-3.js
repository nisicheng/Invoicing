//验证添加商品编码
function checkAddPersonInCharge() {
    var $fname = $("#addmerchandiseCode");
    var $divID = $("#DivmerchandiseCode");
    $divID.html("");
    if ($fname.val() == "") {
        $divID.html("商品编码不能为空");
        return false;
    }
    $divID.html("");
    return true;
}
//验证添加商品名称
function checkAddName() {
    var $fname = $("#addmerchandiseName");
    var $divID = $("#DivmerchandiseName");
    $divID.html("");
    if ($fname.val() == "") {
        $divID.html("商品名称不能为空");
        return false;
    }
    $divID.html("");
    return true;
}
//验证添加商品规格
function checkAddPost() {
    var $fname = $("#addmerchandiseSpecification");
    var $divID = $("#DivmerchandiseSpecification");
    $divID.html("");
    if ($fname.val() == "") {
        $divID.html("商品规格不能为空");
        return false;
    }
    return true;
}
//验证添加商品产地
function checkAddAddress() {
    var $fname = $("#addmerchandisePlaceOfOrigin");
    var $divID = $("#DivmerchandisePlaceOfOrigin");
    $divID.html("");
    if ($fname.val() == "") {
        $divID.html("产地地址不能为空");
        return false;
    }
    return true;
}
//验证添加安全存量
function checkAddFactoryAddress() {
    var $fname = $("#addmerchandiseSafetyStock");
    var $divID = $("#DivmerchandiseSafetyStock");
    $divID.html("");
    if ($fname.val() == "") {
        $divID.html("安全存量不能为空");
        return false;
    }
    return true;
}
//验证添加当前数量
function checkAddMobilePhone() {
    var $fname = $("#addmerchandiseActualQuntity");
    var $divID = $("#DivmerchandiseActualQuntity");
    $divID.html("");
    if ($fname.val() == "") {
        $divID.html("当前数量不能为空");
        return false;
    }
    return true;
}
//验证添加无税供价
function checkAddPhone() {
    var $fname = $("#addmerchandiseSalsePrice");
    var $divID = $("#DivmerchandiseSalsePrice");
    $divID.html("");
    if ($fname.val() == "") {
        $divID.html("无税供价不能为空");
        return false;
    }
    return true;
}

//验证修改商品名称
function checkUpdateName() {
    var $fname = $("#updatemerchandiseName");
    var $divID = $("#remindermerchandiseName");
    $divID.html("");
    if ($fname.val() == "") {
        $divID.html("商品名称不能为空");
        return false;
    }
    $divID.html("");
    return true;
}
//验证修改商品编码
function checkUpdatePersonInCharge() {
    var $fname = $("#updatemerchandiseCode");
    var $divID = $("#remindermerchandiseCode");
    $divID.html("");
    if ($fname.val() == "") {
        $divID.html("商品编码不能为空");
        return false;
    }
    return true;
}
//验证修改商品规格
function checkUpdatePost() {
    var $fname = $("#updatemerchandiseSpecification");
    var $divID = $("#remindermerchandiseSpecification");
    $divID.html("");
    if ($fname.val() == "") {
        $divID.html("商品规格不能为空");
        return false;
    }
    return true;
}
//验证修改商品产地
function checkUpdateAddress() {
    var $fname = $("#updatemerchandisePlaceOfOrigin");
    var $divID = $("#remindermerchandisePlaceOfOrigin");
    $divID.html("");
    if ($fname.val() == "") {
        $divID.html("商品产地不能为空");
        return false;
    }
    return true;
}
//验证修改安全存量
function checkUpdateFactoryAddress() {
    var $fname = $("#updatemerchandiseSafetyStock");
    var $divID = $("#remindermerchandiseSafetyStock");
    $divID.html("");
    if ($fname.val() == "") {
        $divID.html("安全存量不能为空");
        return false;
    }
    return true;
}
//验证修改当前数量
function checkUpdateMobilePhone() {
    var $fname = $("#updatemerchandiseActualQuntity");
    var $divID = $("#remindermerchandiseActualQuntity");
    $divID.html("");
    if ($fname.val() == "") {
        $divID.html("当前数量不能为空");
        return false;
    }
    return true;
}
//验证修改无税供价
function checkUpdatePhone() {
    var $fname = $("#updatemerchandiseSalsePrice");
    var $divID = $("#remindermerchandiseSalsePrice");
    $divID.html("");
    if ($fname.val() == "") {
        $divID.html("无税供价不能为空");
        return false;
    }
    return true;
}


$(function () {
    //添加商品信息
    $("#insert").click(function () {
        $("#addmerchandiseName").blur(checkAddName);
        $("#addmerchandiseCode").blur(checkAddPersonInCharge);
        $("#addmerchandiseSpecification").blur(checkAddPost);
        $("#addmerchandisePlaceOfOrigin").blur(checkAddAddress);
        $("#addmerchandiseSafetyStock").blur(checkAddFactoryAddress);
        $("#addmerchandiseActualQuntity").blur(checkAddMobilePhone);
        $("#addmerchandiseSalsePrice").blur(checkAddPhone);

        var flag = true;
        if (!checkAddName()) flag = false;
        if (!checkAddPersonInCharge()) flag = false;
        if (!checkAddPost()) flag = false;
        if (!checkAddAddress()) flag = false;
        if (!checkAddFactoryAddress()) flag = false;
        if (!checkAddMobilePhone()) flag = false;
        if (!checkAddPhone()) flag = false;
        if(flag != false){
            $.ajax({
                type: "post",
                url: "/merchandise/addMerchandise.do",
                data: $("#addMerchandise").serialize() ,
                dataType: "json",
                success: function (data) {
                    alert("添加成功")
                    $("#closeAdd").click();
                    var str = "";
                    if(data!=0){
                        window.location.href="/merchandise/cooperative.do";
                    }
                    $("#addmerchandiseName").val("");
                    $("#addmerchandiseCode").val("");
                    $("#addmerchandiseSpecification").val("");
                    $("#addmerchandisePlaceOfOrigin").val("");
                    $("#addmerchandiseSafetyStock").val("");
                    $("#addmerchandiseActualQuntity").val("");
                    $("#addmerchandiseSalsePrice").val("");
                },

                error: function () {
                    alert("系统异常，请稍后重试！");
                }
            })
        }
    })
    //修改商品信息
    $("#updates").click(function () {
        $("#updatemerchandiseName").blur(checkUpdateName);
        $("#updatemerchandiseCode").blur(checkUpdatePersonInCharge);
        $("#updatemerchandiseSpecification").blur(checkUpdatePost);
        $("#updatemerchandisePlaceOfOrigin").blur(checkUpdateAddress);
        $("#updatemerchandiseSafetyStock").blur(checkUpdateFactoryAddress);
        $("#updatemerchandiseActualQuntity").blur(checkUpdateMobilePhone);
        $("#updatemerchandiseSalsePrice").blur(checkUpdatePhone);
        var flag = true;
        if (!checkUpdateName()) flag = false;
        if (!checkUpdatePersonInCharge()) flag = false;
        if (!checkUpdatePost()) flag = false;
        if (!checkUpdateAddress()) flag = false;
        if (!checkUpdateFactoryAddress()) flag = false;
        if (!checkUpdateMobilePhone()) flag = false;
        if (!checkUpdatePhone()) flag = false;
        if(flag != false){
            $.ajax({
                type: "post",
                url: "/merchandise/updatesMerchandise.do",
                data:
                    $("#updateMerchandise").serialize() ,
                dataType: "json",
                success: function (data) {
                    alert("修改成功")
                    $("#closeUpdate").click();
                    var str = "";
                    if(data!=0){
                        $("#updatemerchandiseName").val("");
                        $("#updatemerchandiseCode").val("");
                        $("#updatemerchandiseSpecification").val("");
                        $("#updatemerchandisePlaceOfOrigin").val("");
                        $("#updatemerchandiseSafetyStock").val("");
                        $("#updatemerchandiseActualQuntity").val("");
                        $("#updatemerchandiseSalsePrice").val("");
                        window.location.href="/merchandise/cooperative.do";
                    }

                },
                error: function () {
                    alert("系统异常，请稍后重试！");
                }
            })
        }
    })
    //查看下架的商品
    $("#termination").click(function () {
        window.location.href="/merchandise/noncooperation.do";
    })
    //查看在售的商品
    $("#cooperation").click(function () {
        window.location.href="/merchandise/cooperative.do";
    })
    //修改为下架商品
    $("#btn-disable").click(function () {
        var clientList = new Array();
        $(".clients").each(function (index, date) {
            var checkbox = $(date).find(".merchandiseId");
            if(checkbox.is(':checked')){
                //选中了
                var id = $(date).find(".merchandiseId").val();
                var object = new Object();
                object.merchandiseId = id;
                clientList.push(object);
                var noncooperationClient = JSON.stringify(clientList);
                $.ajax({
                    type: "post",
                    url: "/merchandise/noncooperationClient.do",
                    data: {
                        "noncooperationClient": noncooperationClient
                    },
                    dataType: "json",
                    success: function (data) {
                        alert("下架成功")
                        window.location.href="/merchandise/cooperative.do";
                    },
                    error: function () {
                        alert("系统异常，请稍后重试！");
                    }
                })
            }
        });
    })
    //修改为上架商品
    $("#btn-enable").click(function () {
        var clientList = new Array();
        $(".clients").each(function (index, date) {
            var checkbox = $(date).find(".merchandiseId");
            if(checkbox.is(':checked')){
                //选中了
                var id = $(date).find(".merchandiseId").val();
                var object = new Object();
                object.merchandiseId = id;
                clientList.push(object);
                var cooperativeClients = JSON.stringify(clientList);
                $.ajax({
                    type: "post",
                    url: "/merchandise/cooperativeClient.do",
                    data: {
                        "cooperativeClients": cooperativeClients
                    },
                    dataType: "json",
                    success: function (data) {
                        alert("上架成功")
                        window.location.href="/merchandise/noncooperation.do";
                    },
                    error: function () {
                        alert("系统异常，请稍后重试！");
                    }
                })
            }
        });
    })
})
//获取要修改的商品信息
function gainclient(val){
    $("#updatename").val("");
    $("#updatepersonInCharge").val("");
    $("#updatepost").val("");
    $("#updateaddress").val("");
    $("#updatefactoryAddress").val("");
    $("#updatemobilePhone").val("");
    $("#updatephone").val("");
    $("#updatefax").val("");
    $.ajax({
        type: "post",
        url: "/merchandise/merchandisesId.do?merchandiseId="+val,
        dataType: "json",
        success: function (data) {
            if(data!=0){
                $.each(data, function(i,item){
                    $("#updatemerchandiseId").val(item.merchandiseId)
                    $("#updatemerchandiseCode").val(item.merchandiseCode)
                    $("#updatemerchandiseName").val(item.merchandiseName)
                    $("#updatemerchandiseSpecification").val(item.merchandiseSpecification)
                    $("#updateproductType").val(item.productTypeId)
                    $("#updateunitsId").val(item.unitsId)
                    $("#updatesalesStatus").val(item.salesStatusId)
                    $("#updatemerchandisePlaceOfOrigin").val(item.merchandisePlaceOfOrigin)
                    $("#updatemerchandiseSafetyStock").val(item.merchandiseSafetyStock)
                    $("#updatemerchandiseActualQuntity").val(item.merchandiseActualQuntity)
                    $("#updatemerchandiseSalsePrice").val(item.merchandiseSalsePrice)
                });
            }

        },
        error: function () {
            alert("系统异常，请稍后重试！");
        }
    })
}