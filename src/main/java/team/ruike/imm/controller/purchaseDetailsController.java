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
import team.ruike.imm.entity.Procurement;
import team.ruike.imm.entity.ProcurementInformation;
import team.ruike.imm.entity.PurchaseOrderInformation;
import team.ruike.imm.entity.SalesInformation;
import team.ruike.imm.service.ProcurementInformationService;
import team.ruike.imm.service.ProcurementService;
import team.ruike.imm.service.PurchaseOrderInformationService;
import team.ruike.imm.utility.Page;

import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by HP on 2017/12/21.
 */
@Controller
@RequestMapping(value = "purchaseDetails")
public class purchaseDetailsController {
    @Autowired
    ProcurementInformationService procurementInformationService;
    @Autowired
    ProcurementService procurementService;
    //跳转采购明细页面
    @RequestMapping(value = "login.do")
    public String login(Model model,ProcurementInformation procurementInformation, Page page){
        int startPage=page.getStart();
        if(startPage==0){
            startPage=page.getStart();
        }else {
            startPage=(page.getStart()-1)*7;
        }
        PageHelper.offsetPage(startPage,7);
        List<ProcurementInformation> procurementInformations=procurementInformationService.selectAllProcureMent(procurementInformation);
        int total = (int) new PageInfo<ProcurementInformation>(procurementInformations).getTotal();
        int len=0;
        if(total%7!=0){
            len=(total/7)+1;
        }else {
            len=total/7;
        }
        page.caculateLast(total);
        model.addAttribute("procurementInformations",procurementInformations);
        model.addAttribute("len",len);
        model.addAttribute("totalPage",total);
        return "page/purchase/purchaseDetails";
    }
    //批量修改
    @RequestMapping(value = "generateProcurement.do")
    public void  generateProcurement(String procureList,String prochreInfoList,PrintWriter printWriter){
        ArrayList<Procurement> procurements =  JSON.parseObject(procureList, new TypeReference<ArrayList<Procurement>>(){});
        ArrayList<ProcurementInformation> procurementInfos =  JSON.parseObject(prochreInfoList, new TypeReference<ArrayList<ProcurementInformation>>(){});
        int i=procurementService.generateUpdateProcurement(procurements);
        i+=procurementInformationService.generateUpdateProcurementInfo(procurementInfos);
        String jsonString = JSON.toJSONString(i);
        printWriter.write(jsonString);
        printWriter.flush();
        printWriter.close();
    }
	
	
	//到出excel
    @RequestMapping(value = "/excel.do")
    public String excel(ModelMap map){
        List<ProcurementInformation> procurementInformations=procurementInformationService.selectAllProcureMent(null);
        map.put(NormalExcelConstants.CLASS, ProcurementInformation.class);
        map.put(NormalExcelConstants.FILE_NAME, "商品采购明细");
        Date now = new Date();
        ExportParams ep = new ExportParams("商品采购明细","创建时间" + now.toLocaleString(), "已销订购");
        map.put(NormalExcelConstants.PARAMS, ep);
        map.put(NormalExcelConstants.DATA_LIST, procurementInformations);
        return NormalExcelConstants.JEECG_EXCEL_VIEW;
    }

}
