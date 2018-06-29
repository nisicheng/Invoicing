package team.ruike.imm.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.TypeReference;
import javafx.scene.control.Alert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import team.ruike.imm.entity.*;
import team.ruike.imm.service.*;

import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

/**
 * By-GuoXu
 */
@Controller
@RequestMapping("salesForInvPu")
public class InvPuController {

    @Autowired
    SalesService salesService;

    @Autowired
    ClientService clientService;

    @Autowired
    EmployeeService employeeService;

    @Autowired
    MerchandiseService merchandiseService;

    @Autowired
    SalesInformationService salesInformationService;

    /**
     * 跳转到销货单
     * @param model
     * @return
     */
    @RequestMapping("/loginsalesOrdersForInvPu.do")
    public String loginsalesOrdersForAbout(Model model){
        List<Client> clientList = clientService.selecrClient(null);
        List<Employee> employeeList = employeeService.selectEmployee(null);
        List<Merchandise> merchandises=merchandiseService.selectAll(null);
        String id=salesService.salesId();
        model.addAttribute("salesId",id);
        model.addAttribute("clientss",clientList);
        model.addAttribute("employeess",employeeList);
        model.addAttribute("merchandises",merchandises);
        return "page/Sales/invPu";
    }

    //显示一个商品信息
    @RequestMapping(value = "ajaxMerchand.do",produces="text/html;charset=UTF-8")
    @ResponseBody
    public Object ajaxMerchand(Merchandise merchandise){
        Merchandise merchandises=merchandiseService.selectOne(merchandise);
        return JSON.toJSONString(merchandises);
    }

    @RequestMapping("saveSaveInformationListForPu.do")
    public void saveSaveInformationList(String saveInformationListForPu, String saveListForPu, PrintWriter printWriter){
        ArrayList<Sales> sa = JSON.parseObject(saveListForPu, new TypeReference<ArrayList<Sales>>(){});
        Sales s=sa.get(0);
        Integer i = salesService.insertSalesForPu(s);
        ArrayList<SalesInformation> salesInformations =  JSON.parseObject(saveInformationListForPu, new TypeReference<ArrayList<SalesInformation>>(){});
        salesInformationService.insertAll(salesInformations);
        if(i>0){
            String str=JSON.toJSONString(1);
            printWriter.write(str);
        }else{
            String str=JSON.toJSONString(0);
            printWriter.write(str);
        }
        printWriter.flush();
        printWriter.close();
    }



}
