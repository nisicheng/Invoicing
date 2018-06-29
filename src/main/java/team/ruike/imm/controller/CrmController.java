package team.ruike.imm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import team.ruike.imm.entity.Crm;
import team.ruike.imm.service.CrmService;

import javax.servlet.http.HttpSession;
import java.util.List;

@ RequestMapping("crm")
@Controller
public class CrmController {
    @Autowired
    CrmService crmService;

    @RequestMapping(value = "/crm.do")
    public String select(Crm crm,int i, HttpSession session, Model model){
        List<Crm> crms=crmService.selecrCrm(crm);
        System.out.println(i);
        model.addAttribute("id",crms.get(0).getCrmState());
        return "page/test2";
    }
    @RequestMapping(value = "/log.do")
    public  String log(){
        return "login";
    }
}
