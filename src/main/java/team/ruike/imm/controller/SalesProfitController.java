package team.ruike.imm.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
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
import team.ruike.imm.utility.Page;

import java.util.List;

/**
 *销售利润表
 * By-Guoxu
 */
@Controller
@RequestMapping("salesProfit")
public class SalesProfitController {
    @Autowired
    SalesService salesService;

    @Autowired
    ClientService clientService;

    @Autowired
    EmployeeService employeeService;

    @Autowired
    MerchandiseService merchandiseService;

    @RequestMapping("/loginSalesProfit.do")
    public String logindetailOrders(Model model, Sales sales, Page page){

        int startPage=page.getStart();
        if(startPage==0){
            startPage=page.getStart();
        }else {
            startPage=(page.getStart()-1)*5;
        }
        PageHelper.offsetPage(startPage,5);


        List<Sales> salesList = salesService.selectSalesForProfit(sales);

        int total = (int) new PageInfo<Sales>(salesList).getTotal();
        int len=0;
        if(total%5!=0){
            len=(total/5)+1;
        }else {
            len=total/5;
        }
        page.caculateLast(total);


        List<Client> clientList = clientService.selecrClient(null);
        List<Employee> employeeList = employeeService.selectEmployee(null);
        List<Merchandise> merchandiseList = merchandiseService.selectMerchandise(null);
        model.addAttribute("clientss",clientList);
        model.addAttribute("employeess",employeeList);
        model.addAttribute("merchandisess",merchandiseList);
        model.addAttribute("len",len);
        model.addAttribute("totalPage",total);
        model.addAttribute("saless",salesList);
        return "page/Sales/sale-profit-detail";
    }
}
