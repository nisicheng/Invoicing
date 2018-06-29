package team.ruike.imm.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.TypeReference;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import team.ruike.imm.entity.*;
import team.ruike.imm.service.*;

import javax.servlet.http.HttpSession;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("stoagemove")
public class StorageMoveController {
    @Autowired
    StorageMoveService storageMoveService;
    @Autowired
    EmployeeService employeeService;
    @Autowired
    UserService userService;
    /**
     * 查询出库信息
     */
    @RequestMapping(value = "/sstoagemove.do")
    public String select(StorageMove storageMove,Employee employee,User user, HttpSession session){
        List<StorageMove> storageMoveList = storageMoveService.selectStorageMove(storageMove);
        List<Employee> employeeList = employeeService.selectEmployee(employee);
        List<User> userList = userService.userList(user);
        session.setAttribute("stor", storageMoveList);
        session.setAttribute("emp",employeeList);
        session.setAttribute("u",userList);
        return "page/warehouse/storage_move";
    }
    /**
     * 查询被选中即将删除的的出库表的信息
     */
    @RequestMapping(value = "/storageMoveId.do")
    public void updatestorageMoveId(StorageMove storageMove,PrintWriter printWriter){
        List<StorageMove> storageMoveList = storageMoveService.selectStorageMove(storageMove);

        if(storageMoveList.size()>0){
            StorageMove m = storageMoveList.get(0);
            String json= JSON.toJSONString(m);
            printWriter.write(json);
            printWriter.flush();
            printWriter.close();
        }else{
            String json=JSON.toJSONString(0);
            printWriter.write(json);
            printWriter.flush();
            printWriter.close();
        }
    }
    /* 删除入库订单
 */
    @RequestMapping(value = "/deletestorageMove.do")
    @ResponseBody
    public void  deletestorageMove(StorageMove storageMove,PrintWriter printWriter){

        storageMove.setSmState(1);
        storageMoveService.updateStorageMove(storageMove);
        String jsonString = JSON.toJSONString("1");
        printWriter.write(jsonString);
        printWriter.flush();
        printWriter.close();
    }
}
