package team.ruike.imm.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.TypeReference;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.jeecgframework.poi.excel.entity.ExportParams;
import org.jeecgframework.poi.excel.entity.vo.NormalExcelConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import team.ruike.imm.entity.*;
import team.ruike.imm.service.*;
import team.ruike.imm.utility.Page;

import javax.servlet.http.HttpSession;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by HP on 2017/11/29.
 */

@Controller
@RequestMapping(value = "/purchases")
public class PurchaseController {
    @Autowired
    SupplierService supplierService;
    @Autowired
    ProcurementService procurementService;
    @Autowired
    MerchandiseService merchandiseService;
    @Autowired
    ProcurementInformationService procurementInformationService;
    @Autowired
    SalesInformationService salesInformationService;
    //加载购货订单数据，返回购货订单页面
    @RequestMapping("/loginPurchaseOrder.do")
    public String loginPurchaseOrder(Model model) {
        List<Supplier> list = supplierService.selectSuplier(null);
        List<Merchandise> merchandises=merchandiseService.selectAll(null);
        String id=procurementService.purchaseId("GHDD");
        model.addAttribute("purId",id);
        model.addAttribute("merchandises",merchandises);
        model.addAttribute("supps", list);
        return "page/purchase/purchaseOrder";
    }
    @RequestMapping(value = "saveSupplierorProcureMent")
    public  String saveSupplierorProcureMent(Procurement procurement){
        return "page/purchase/purchaseOrder";
    }
    //显示一个商品信息
    @RequestMapping(value = "ajaxMerchand.do",produces="text/html;charset=UTF-8")
    @ResponseBody
    public Object ajaxMerchand(Merchandise merchandise){
        Merchandise merchandises=merchandiseService.selectOne(merchandise);
        return JSON.toJSONString(merchandises);
    }
    //批量添加购货订单
    @RequestMapping(value = "saveProcurementInformationList.do",produces="text/html;charset=UTF-8")
    @ResponseBody
    public void saveProcurementInformationList(String procurementInformationList, String procurementList, PrintWriter printWriter){
        ArrayList<Procurement> pr =  JSON.parseObject(procurementList, new TypeReference<ArrayList<Procurement>>(){});
        Procurement p=pr.get(0);
        int i=procurementService.insertProcurement(p);
        ArrayList<ProcurementInformation> procurementInformations =  JSON.parseObject(procurementInformationList, new TypeReference<ArrayList<ProcurementInformation>>(){});
        procurementInformationService.insertAll(procurementInformations);
        String jsonString = JSON.toJSONString(i);
        printWriter.write(jsonString);
        printWriter.flush();
        printWriter.close();
    }
    //显示已销订购
    @RequestMapping(value = "showPurchaseSales.do")
    public  String showPurchaseSales(Model model,SalesInformation salesInformation, Page page){
        int startPage=page.getStart();
        if(startPage==0){
            startPage=page.getStart();
        }else {
            startPage=(page.getStart()-1)*5;
        }
        PageHelper.offsetPage(startPage,5);
        List<SalesInformation> salesInformations= salesInformationService.selectSalesInformation(salesInformation);
        int total = (int) new PageInfo<SalesInformation>(salesInformations).getTotal();
        int len=0;
        if(total%5!=0){
            len=(total/5)+1;
        }else {
            len=total/5;
        }
        page.caculateLast(total);
        model.addAttribute("salesInformations",salesInformations);
        model.addAttribute("len",len);
        model.addAttribute("totalPage",total);
        return "page/purchase/purchaseSales";
    }
    //接收已销订单传值
    @RequestMapping(value = "generateOrders.do")
    @ResponseBody
    public void generateOrders(String salesInformationList, HttpSession session,PrintWriter printWriter){
        ArrayList<SalesInformation> salesInformationArrayList =  JSON.parseObject(salesInformationList, new TypeReference<ArrayList<SalesInformation>>(){});
        session.setAttribute("salesInformationArrayList",salesInformationArrayList);
        String jsonString = JSON.toJSONString("1");
        printWriter.write(jsonString);
        printWriter.flush();
        printWriter.close();
    }
    //已销订购导出
    @RequestMapping(value = "/excel.do")
    public String excel(ModelMap map){
        List<SalesInformation> salesInformations= salesInformationService.selectSalesInformation(null);
        map.put(NormalExcelConstants.CLASS, SalesInformation.class);
        map.put(NormalExcelConstants.FILE_NAME, "已销订购看板");
        Date now = new Date();
        ExportParams ep = new ExportParams("已销订购","创建时间" + now.toLocaleString(), "已销订购");
        map.put(NormalExcelConstants.PARAMS, ep);
        map.put(NormalExcelConstants.DATA_LIST, salesInformations);
        return NormalExcelConstants.JEECG_EXCEL_VIEW;
    }
    //购货单导出
    @RequestMapping(value = "purchasesExcel.do")
    public String purchasesExcel(String purchase){
        System.out.println(purchase);
        System.out.println("111111111111111111111111111");
        System.out.println("111111111111111111111111111");  System.out.println("111111111111111111111111111");
        System.out.println("111111111111111111111111111");


        return "";
    }
}
