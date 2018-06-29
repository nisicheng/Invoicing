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
import team.ruike.imm.entity.Merchandise;
import team.ruike.imm.entity.ProcurementInformation;
import team.ruike.imm.entity.ProductType;
import team.ruike.imm.entity.SalesInformation;
import team.ruike.imm.service.MerchandiseService;
import team.ruike.imm.service.ProcurementInformationService;
import team.ruike.imm.service.ProductTypeService;
import team.ruike.imm.utility.Page;

import javax.servlet.http.HttpSession;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by HP on 2017/12/18.
 */
@Controller
@RequestMapping(value = "replenishMent")
public class ReplenishMentController {
    @Autowired
    ProductTypeService productTypeService;
    @Autowired
    MerchandiseService merchandiseService;
    @Autowired
    ProcurementInformationService procurementInformationService;
    @RequestMapping(value = "login.do")
    //跳转智能补货页面
    public  String loginReplenishMent(Model model, Merchandise merchandise, Page page){
        int startPage=page.getStart();
        if(startPage==0){
            startPage=page.getStart();
        }else {
            startPage=(page.getStart()-1)*5;
        }
        PageHelper.offsetPage(startPage,5);
        List<Merchandise> merchandises=merchandiseService.selectRelenish(merchandise);
        int total = (int) new PageInfo<Merchandise>(merchandises).getTotal();
        int len=0;
        if(total%5!=0){
            len=(total/5)+1;
        }else {
            len=total/5;
        }
        page.caculateLast(total);
       List<ProductType> productTypeLists= productTypeService.selectProductType(null);
       List<ProcurementInformation> procurementInformations=procurementInformationService.selectReplenish();
        model.addAttribute("productTypeLists",productTypeLists);
        model.addAttribute("merchandises",merchandises);
        model.addAttribute("merchandise",merchandise);
        model.addAttribute("len",len);
        model.addAttribute("totalPage",total);
        model.addAttribute("procurementInformations",procurementInformations);
        return "page/purchase/replenishMent";
    }

    @RequestMapping(value = "generateOrders.do")
    @ResponseBody
    public void generateOrders(String salesInformationList, HttpSession session, PrintWriter printWriter){
        ArrayList<SalesInformation> salesInformationArrayList =  JSON.parseObject(salesInformationList, new TypeReference<ArrayList<SalesInformation>>(){});
        session.setAttribute("salesInformationArrayList",salesInformationArrayList);
        String jsonString = JSON.toJSONString("2");
        printWriter.write(jsonString);
        printWriter.flush();
        printWriter.close();
    }
    @RequestMapping("/excel.do")
    public  String excel(ModelMap map){
        List<Merchandise> merchandises=merchandiseService.selectRelenish(null);
        map.put(NormalExcelConstants.CLASS, Merchandise.class);
        map.put(NormalExcelConstants.FILE_NAME, "智能补货");
        Date now = new Date();
        ExportParams ep = new ExportParams("智能补货单","创建时间" + now.toLocaleString(), "智能补货");
        map.put(NormalExcelConstants.PARAMS, ep);
        map.put(NormalExcelConstants.DATA_LIST, merchandises);
        return NormalExcelConstants.JEECG_EXCEL_VIEW;
    }
}
