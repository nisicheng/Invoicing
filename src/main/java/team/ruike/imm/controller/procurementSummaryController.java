package team.ruike.imm.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.apache.commons.collections.BagUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import team.ruike.imm.entity.Merchandise;
import team.ruike.imm.entity.Procurement;
import team.ruike.imm.entity.ProcurementInformation;
import team.ruike.imm.entity.Supplier;
import team.ruike.imm.service.MerchandiseService;
import team.ruike.imm.service.ProcurementInformationService;
import team.ruike.imm.service.SupplierService;
import team.ruike.imm.utility.Page;

import java.util.List;

/**
 * Created by HP on 2017/12/25.
 */
@Controller
@RequestMapping(value = "procurementSummary")
public class procurementSummaryController {
    @Autowired
    ProcurementInformationService procurementInformationService;
    @Autowired
    SupplierService supplierService;
    @Autowired
    MerchandiseService merchandiseService;
    @RequestMapping(value = "login.do")
    public String login(Model model, ProcurementInformation procurementInformation, Merchandise merchandise, Page page) {
           if(merchandise!=null){
               if(merchandiseService.selectAll(merchandise)!=null){
                Merchandise m= merchandiseService.selectAll(merchandise).get(0);
                procurementInformation.setMerchandiseId(m.getMerchandiseId());
               }
           }
        int startPage=page.getStart();
        if(startPage==0){
            startPage=page.getStart();
        }else {
            startPage=(page.getStart()-1)*10;
        }
        PageHelper.offsetPage(startPage,10);
        List<ProcurementInformation> procurementInformationList = procurementInformationService.selectProcurementByProcurementId(procurementInformation);
        int total = (int) new PageInfo<ProcurementInformation>(procurementInformationList).getTotal();
        int len=0;
        if(total%10!=0){
            len=(total/10)+1;
        }else {
            len=total/10;
        }
        page.caculateLast(total);
        List<Supplier> suppliers= supplierService.selectSuplier(null);
        model.addAttribute("procurementInformationList", procurementInformationList);
        model.addAttribute("suppliers",suppliers);
        model.addAttribute("len",len);
        model.addAttribute("totalPage",total);
        return "page/purchase/procurementSummary";
    }
}
