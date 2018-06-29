package team.ruike.imm.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

//仓库报表
@Controller
@RequestMapping("warehouseReport")
public class WarehouseReportController {
    /**
     * 商品库存余额
     */
    @RequestMapping("/goods-balance.do")
    public String loginGoodsBalance(Model model){
        return "page/warehouse/goods-balance";
    }

    /**
     * 商品收发明细表
     */
    @RequestMapping("/goods-flow-detail.do")
    public String loginGoodsFlowDetail(Model model){
        return "page/warehouse/goods-flow-detail";
    }

    /**
     * 商品收发汇总表
     */
    @RequestMapping("/goods-flow-summary.do")
    public String loginGoodsFlowsummary(Model model){
        return "page/warehouse/goods-flow-summary";
    }

}
