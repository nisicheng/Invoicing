package team.ruike.imm.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "/productType")
public class ProductTypeController {

    @RequestMapping(value = "/all.do")
    public String all(){
        return "page/material/category-list-9";
    }
}
