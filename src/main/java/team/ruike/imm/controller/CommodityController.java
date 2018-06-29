package team.ruike.imm.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import team.ruike.imm.entity.*;
import team.ruike.imm.service.*;
import team.ruike.imm.utility.Page;

import java.util.List;

/**
 *销售汇总表（按商品)
 * By-Guoxu
 */
@Controller
@RequestMapping("commodity")
public class CommodityController {
    @Autowired
    SalesService salesService;

    @Autowired
    ClientService clientService;

    @Autowired
    EmployeeService employeeService;

    @Autowired
    MerchandiseService merchandiseService;

    @Autowired
    ProductTypeService productTypeService;

    @RequestMapping("/loginCommodity.do")
    public String logindetailOrders(Model model, Sales sales, Page page){
        int startPage=page.getStart();
        if(startPage==0){
            startPage=page.getStart();
        }else {
            startPage=(page.getStart()-1)*5;
        }
        PageHelper.offsetPage(startPage,5);

        List<Sales> salesList = salesService.selectSalesForThis(sales);

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
        List<ProductType> productTypeList = productTypeService.selectProductType(null);

        model.addAttribute("clientss",clientList);
        model.addAttribute("employeess",employeeList);
        model.addAttribute("merchandisess",merchandiseList);
        model.addAttribute("productTypess",productTypeList);
        model.addAttribute("len",len);
        model.addAttribute("totalPage",total);
        model.addAttribute("saless",salesList);
        return "page/Sales/sales-summary";
    }
}
