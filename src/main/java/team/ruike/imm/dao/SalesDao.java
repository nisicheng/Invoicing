package team.ruike.imm.dao;

import team.ruike.imm.entity.Sales;

import java.util.List;

/**
 * @author 闫琛昊
 * @version 1.0
 *销售订单
 */
public interface SalesDao {
    /**
     * 指定条件查询销售订单
     * @param sales 销售订单
     * @return
     */
    public List<Sales> selectSales(Sales sales);


    /**
     * 指定条件修改销售订单
     * @param sales 销售订单
     * @return
     */
    public int updateSales(Sales sales);

    /**
     * 新增销售订单
     * @param sales 销售订单
     * @return
     */
    public int insertSales(Sales sales);

    /**
     * 新增销售订单
     * @param sales 销售单
     * @return
     */
    public int insertSalesForPu(Sales sales);
    /**
     * 分页
     * @return
     */
    public List<Sales> PagerSales(Sales sales);


    /**
     * 指定条件查询销售订单-Guoxu-勿动
     * @param sales 销售订单
     * @return
     */
    public List<Sales> selectSalesForOrder(Sales sales);


    /**
     * 指定条件查询销售订单-Guoxu-勿动
     * @param sales 销售单
     * @return
     */
    public List<Sales> selectSalesForThis(Sales sales);


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
