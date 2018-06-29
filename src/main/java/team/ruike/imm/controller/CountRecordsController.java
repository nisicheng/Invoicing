package team.ruike.imm.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

//盘点记录
@Controller
@RequestMapping("CountRecords")
public class CountRecordsController {
    @RequestMapping("/CountRecordsForSome.do")
    public String loginsalesOrders(Model model){
        return "page/warehouse/inventory-list";
    }
}
