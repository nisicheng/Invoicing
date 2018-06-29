package team.ruike.imm.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import team.ruike.imm.entity.Merchandise;
import team.ruike.imm.entity.ProcurementInformation;
import team.ruike.imm.service.ProcurementInformationService;
import team.ruike.imm.utility.Page;

import java.util.List;

/**
 * Created by HP on 2017/12/26.
 */
@Controller
@RequestMapping(value = "purchasePayment")
public class purchasePaymentController {
    @Autowired
    ProcurementInformationService procurementInformationService;
    //跳转采购付款一览表
    @RequestMapping(value = "login.do")
    public String purchasePaymentLogin(ProcurementInformation procurementInformation, Model model, Page page){
        int startPage=page.getStart();
        if(startPage==0){
            startPage=page.getStart();
        }else {
            startPage=(page.getStart()-1)*10;
        }
        PageHelper.offsetPage(startPage,10);
       List<ProcurementInformation> procurementInformations= procurementInformationService.selectAllProcureMent(procurementInformation);
        int total = (int) new PageInfo<ProcurementInformation>(procurementInformations).getTotal();
        int len=0;
        if(total%10!=0){
            len=(total/10)+1;
        }else {
            len=total/10;
        }
        page.caculateLast(total);
       model.addAttribute("procurementInformations",procurementInformations);
        model.addAttribute("len",len);
        model.addAttribute("totalPage",total);
        return "page/purchase/purchasePayment";
    }
}
