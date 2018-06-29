package team.ruike.imm.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.TypeReference;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import team.ruike.imm.entity.*;
import team.ruike.imm.service.*;
import org.jeecgframework.poi.excel.entity.ExportParams;
import org.jeecgframework.poi.excel.entity.params.ExcelExportEntity;
import org.jeecgframework.poi.excel.entity.vo.MapExcelConstants;
import org.jeecgframework.poi.excel.entity.vo.NormalExcelConstants;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.PrintWriter;
import java.util.*;

import org.springframework.ui.ModelMap;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by HP on 2017/12/14.
 */
@Controller
@RequestMapping(value = "/purchaseOrder")
public class PurchaseOrderController {
    @Autowired
    MerchandiseService merchandiseService;
    @Autowired
    SupplierService supplierService;

    @Autowired
    ProcurementService procurementService;
    @Autowired
    ProcurementInformationService procurementInformationService;
    //加载购货单页面
    @RequestMapping(value = "loginPurchase.do")
    public String loginPurchase(Model model){

        List<Supplier> list = supplierService.selectSuplier(null);
        List<Merchandise> merchandises=merchandiseService.selectAll(null);
        String id=procurementService.purchaseId("GH");
        model.addAttribute("purId",id);
        model.addAttribute("merchandises",merchandises);
        model.addAttribute("supps", list);
        return "page/purchase/purchase";
    }
    @RequestMapping(value = "savePurchaseOrder.do")
    @ResponseBody
    public  void  savePurchaseOrder(String purchaseorderList,String purchaseList,PrintWriter printWriter,HttpSession session){
        ArrayList<Procurement> pr =  JSON.parseObject(purchaseorderList, new TypeReference<ArrayList<Procurement>>(){});
        Procurement p=pr.get(0);
        int i=procurementService.insertProcurement(p);
        ArrayList<ProcurementInformation> procurementInformations =  JSON.parseObject(purchaseList, new TypeReference<ArrayList<ProcurementInformation>>(){});
        procurementInformationService.insertAll(procurementInformations);
        session.setAttribute("salesInformationArrayList",null);
        String jsonString = JSON.toJSONString("1");
        printWriter.write(jsonString);
        printWriter.flush();
        printWriter.close();
    }
    //暂未实现
    @RequestMapping(value = "MapExportExcel.do")
    public String MapExportExcel(String procurement){
        ArrayList<Procurement> pr =  JSON.parseObject(procurement, new TypeReference<ArrayList<Procurement>>(){});
        System.out.println(pr);
        return "";
    }
}
