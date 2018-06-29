package team.ruike.imm.service;

import team.ruike.imm.entity.Sales;

import java.util.List;

public interface SalesService {
    /**
     * 按指定条件查询销售订单
     * @param sales
     * @return
     */
    List<Sales> selectSales(Sales sales);

    /**
     * 按指定条件修改销售订单
     * @param sales
     * @return
     */
    public int updateSales(Sales sales);

    /**
     * 新增销售订单
     * @param sales
     * @return
     */
    public int insertSales(Sales sales);

    public int insertSalesForPu(Sales sales);

    String salesId();

    /**
     * 指定条件查询销售订单-Guoxu-勿动
     * @param sales 销售订单
     * @return
     */
    public List<Sales> selectSalesForOrder(Sales sales);


    /**
     * 按指定条件查询销售单-郭旭-勿动
     * @param sales
     * @return
     */
    List<Sales> selectSalesForThis(Sales sales);

    /**
     * 指定条件查询销售排行表-Guoxu-勿动
     * @param sales 销售订单
     * @return
     */
    public List<Sales> selectSalesForThisToAll(Sales sales);


    /**
     * 指定条件查询销售利润表-Guoxu-勿动
     * @param sales 销售订单
     * @return
     */
    public List<Sales> selectSalesForProfit(Sales sales);


    /**
     * 首页每月销售总数目
     * @param sales
     * @return
     */
    public List<Sales> selectForMonth(Sales sales);


    /**
     * 统计有多少没有发货的单子和今日销售量
     * @param sales
     * @return
     */
    int selectSalses(Sales sales);
}
