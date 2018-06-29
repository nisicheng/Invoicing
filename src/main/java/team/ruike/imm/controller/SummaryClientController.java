package team.ruike.imm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import team.ruike.imm.entity.Client;
import team.ruike.imm.entity.Employee;
import team.ruike.imm.entity.Merchandise;
import team.ruike.imm.entity.Sales;
import team.ruike.imm.service.ClientService;
import team.ruike.imm.service.EmployeeService;
import team.ruike.imm.service.MerchandiseService;
import team.ruike.imm.service.SalesService;

import java.util.List;

/**
 *销售汇总表（按客户）
 * By-Guoxu
 */
@Controller
@RequestMapping("summaryClient")
public class SummaryClientController {
    @Autowired
    SalesService salesService;

    @Autowired
    ClientService clientService;

    @Autowired
    EmployeeService employeeService;

    @Autowired
    MerchandiseService merchandiseService;

    @RequestMapping("/loginSummaryClient.do")
    public String logindetailOrders(Model model){
        List<Client> clientList = clientService.selecrClient(null);
        List<Employee> employeeList = employeeService.selectEmployee(null);
        List<Merchandise> merchandiseList = merchandiseService.selectMerchandise(null);
        List<Sales> salesList = salesService.selectSales(null);
        model.addAttribute("clientss",clientList);
        model.addAttribute("employeess",employeeList);
        model.addAttribute("merchandisess",merchandiseList);
        model.addAttribute("saless",salesList);
        return "page/Sales/sales-summary-customer-new";
    }
}
