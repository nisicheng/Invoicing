package team.ruike.imm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import team.ruike.imm.entity.SalesInformation;
import team.ruike.imm.service.SalesInformationService;

import java.util.List;

/**
 * Created by HP on 2017/12/12.
 */

@Controller
@RequestMapping(value = "/saleInformation")
public class SalesInformationController {

    @Autowired
    SalesInformationService salesInformationService;

    /**
     * 查询所有的销售订单详情信息
     */
    @RequestMapping(value = "selectAllSaleInformation.do")
    public  String selectAllSaleInformation(SalesInformation salesInformation, Model model){
       List<SalesInformation> salesInformations= salesInformationService.selectSalesInformation(salesInformation);
       model.addAttribute("salesInformations",salesInformations);
        return "page/purchase/purchaseSales";
    }
}
