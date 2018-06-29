package team.ruike.imm.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

//调拨单
@Controller
@RequestMapping("requisition")
public class RequisitionController {

    @RequestMapping("/RequisitionForSome.do")
    public String loginsalesOrders(Model model){
        return "page/warehouse/invTf-1";
    }
}
