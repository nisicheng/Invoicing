//验证添加名称
function checkAddName() {
    var $fname = $("#addname");
    var $divID = $("#Divname");
    $divID.html("");
    if ($fname.val() == "") {
        $divID.html("员工名称不能为空");
        return false;
    }
    return true;
}
//验证添加名称
function checkAddPersonInCharge() {
    var $fname = $("#addpersonInCharge");
    var $divID = $("#DivpersonInCharge");
    $divID.html("");
    if ($fname.val() == "") {
        $divID.html("职位名称不能为空");
        return false;
    }
    return true;
}
//验证添加
function checkAddPost() {
    var $fname = $("#addpost");
    var $divID = $("#Divpost");
    $divID.html("");
    if ($fname.val() == "") {
        $divID.html("身份证号不能为空");
        return false;
    }
    return true;
}
//验证添加
function checkAddAddress() {
    var $fname = $("#addaddress");
    var $divID = $("#Divaddress");
    $divID.html("");
    if ($fname.val() == "") {
        $divID.html("移动电话不能为空");
        return false;
    }
    return true;
}
//验证
function checkAddFactoryAddress() {
    var $fname = $("#addfactoryAddress");
    var $divID = $("#DivfactoryAddress");
    $divID.html("");
    if ($fname.val() == "") {
        $divID.html("电子邮箱不能为空");
        return false;
    }
    return true;
}
//验证
function checkAddMobilePhone() {
    var $fname = $("#addmobilePhone");
    var $divID = $("#DivmobilePhone");
    $divID.html("");
    if ($fname.val() == "") {
        $divID.html("联络地址不能为空");
        return false;
    }
    return true;
}
//验证
function checkUpdateName() {
    var $fname = $("#updatename");
    var $divID = $("#remindername");
    $divID.html("");
    if ($fname.val() == "") {
        $divID.html("员工名称不能为空");
        return false;
    }
    return true;
}
//验证
function checkUpdatePersonInCharge() {
    var $fname = $("#updatepersonInCharge");
    var $divID = $("#reminderpersonInCharge");
    $divID.html("");
    if ($fname.val() == "") {
        $divID.html("职位名称不能为空");
        return false;
    }
    return true;
}
//验证
function checkUpdatePost() {
    var $fname = $("#updatepost");
    var $divID = $("#reminderpost");
    $divID.html("");
    if ($fname.val() == "") {
        $divID.html("身份证号职称不能为空");
        return false;
    }
    return true;
}
//验证
function checkUpdateAddress() {
    var $fname = $("#updateaddress");
    var $divID = $("#reminderaddress");
    $divID.html("");
    if ($fname.val() == "") {
        $divID.html("移动电话不能为空");
        return false;
    }
    return true;
}
//验证
function checkUpdateFactoryAddress() {
    var $fname = $("#updatefactoryAddress");
    var $divID = $("#reminderfactoryAddress");
    $divID.html("");
    if ($fname.val() == "") {
        $divID.html("电子邮箱不能为空");
        return false;
    }
    return true;
}
//验证
function checkUpdateMobilePhone() {
    var $fname = $("#updatemobilePhone");
    var $divID = $("#remindermobilePhone");
    $divID.html("");
    if ($fname.val() == "") {
        $divID.html("联络地址不能为空");
        return false;
    }
    return true;
}
$(function () {
    //修改为离职员工
    $("#btn-disable").click(function () {
        var clientList = new Array();
        $(".clients").each(function (index, date) {
            var checkbox = $(date).find(".employeeId");
            if(checkbox.is(':checked')){
                //选中了
                var id = $(date).find(".employeeId").val();
                var object = new Object();
                object.employeeId = id;
                clientList.push(object);
                var noncooperationClient = JSON.stringify(clientList);
                $.ajax({
                    type: "post",
                    url: "/employee/noncooperationEmployee.do",
                    data: {
                        "noncooperation": noncooperationClient
                    },
                    dataType: "json",
                    success: function (data) {
                        window.location.href="/employee/cooperative.do";
                    },
                    error: function () {
                        alert("系统异常，请稍后重试！");
                    }
                })
            }
        });
    })
    //添加
    $("#insert").click(function () {
        $("#addname").blur(checkAddName);
        $("#addpersonInCharge").blur(checkAddPersonInCharge);
        $("#addpost").blur(checkAddPost);
        $("#addaddress").blur(checkAddAddress);
        $("#addfactoryAddress").blur(checkAddFactoryAddress);
        $("#addmobilePhone").blur(checkAddMobilePhone);
        var flag = true;
        if (!checkAddName()) flag = false;
        if (!checkAddPersonInCharge()) flag = false;
        if (!checkAddPost()) flag = false;
        if (!checkAddAddress()) flag = false;
        if (!checkAddFactoryAddress()) flag = false;
        if (!checkAddMobilePhone()) flag = false;
        if(flag != false){
            $.ajax({
                type: "post",
                url: "/employee/addEmployee.do",
                data: $("#addemployee").serialize(),
                dataType: "json",
                success: function (data) {
                    alert("添加成功")
                    $("#closeAdd").click();
                    var str = "";
                    if(data!=0){
                        window.location.href="/employee/cooperative.do";
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
    //修改
    $("#updates").click(function () {
        $("#updatename").blur(checkUpdateName);
        $("#updatepersonInCharge").blur(checkUpdatePersonInCharge);
        $("#updatepost").blur(checkUpdatePost);
        $("#updateaddress").blur(checkUpdateAddress);
        $("#updatefactoryAddress").blur(checkUpdateFactoryAddress);
        $("#updatemobilePhone").blur(checkUpdateMobilePhone);
        var flag = true;
        if (!checkUpdateName()) flag = false;
        if (!checkUpdatePersonInCharge()) flag = false;
        if (!checkUpdatePost()) flag = false;
        if (!checkUpdateAddress()) flag = false;
        if (!checkUpdateFactoryAddress()) flag = false;
        if (!checkUpdateMobilePhone()) flag = false;
        if(flag != false){
            $.ajax({
                type: "post",
                url: "/employee/updateEmployee.do",
                data:
                    $("#updateemployee").serialize(),
                dataType: "json",
                success: function (data) {
                    alert("修改成功")
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
                    var str = "";
                    if(data!=0){

                        window.location.href="/employee/cooperative.do";
                    }

                },
                error: function () {
                    alert("系统异常，请稍后重试！");
                }
            })
        }
    })
    //查看离职员工
    $("#termination").click(function () {
        window.location.href="/employee/noncooperation.do";
    })
    //查看在职员工
    $("#cooperation").click(function () {
        window.location.href="/employee/cooperative.do";
    })
    //修改员工为在职
    $("#btn-enable").click(function () {
        var clientList = new Array();
        $(".clients").each(function (index, date) {
            var checkbox = $(date).find(".employeeId");
            if(checkbox.is(':checked')){
                //选中了
                var id = $(date).find(".employeeId").val();
                var object = new Object();
                object.employeeId = id;
                clientList.push(object);
                var cooperative = JSON.stringify(clientList);
                $.ajax({
                    type: "post",
                    url: "/employee/cooperativeEmployee.do",
                    data: {
                        "cooperative": cooperative
                    },
                    dataType: "json",
                    success: function (data) {
                        alert("修改成功")
                        window.location.href="/employee/noncooperation.do";
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
    $("#updatepost").val("");
    $("#updateaddress").val("");
    $("#updatefactoryAddress").val("");
    $("#updatemobilePhone").val("");
    $.ajax({
        type: "post",
        url: "/employee/EmployeeId.do?EmployeeId="+val,
        dataType: "json",
        success: function (data) {
            if(data!=0){
                $.each(data, function(i,item){
                    $("#updateid").val(item.employeeId)
                    $("#updatename").val(item.employeeName)
                    $("#updatepersonInCharge").val(item.positionId)
                     $("#updatepost").val(item.employeeIdNumber)
                    $("#updateaddress").val(item.employeeMobilePhone)
                    $("#updatefactoryAddress").val(item.employeeEmail)
                    $("#updatemobilePhone").val(item.employeeAddress)
                });
            }
        },
        error: function () {
            alert("系统异常，请稍后重试！");
        }
    })
}