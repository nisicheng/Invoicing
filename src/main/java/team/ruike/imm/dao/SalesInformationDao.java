package team.ruike.imm.dao;

import team.ruike.imm.entity.ProcurementInformation;
import team.ruike.imm.entity.SalesInformation;

import java.util.List;

/**
 * @author 闫琛昊
 * @version 1.0
 *销售订单详情
 */
public interface SalesInformationDao {
    /**
     * 指定条件查询销售订单详情
     * @param salesInformation 销售订单详情
     * @return
     */
     List<SalesInformation> selectSalesInformation(SalesInformation salesInformation);

    /**
     * 指定条件修改销售订单详情
     * @param salesInformation 销售订单详情
     * @return
     */
     int updateSalesInformation(SalesInformation salesInformation);

    /**
     * 新增销售订单详情
     * @param salesInformation 销售订单详情
     * @return
     */
     int insertSalesInformation(SalesInformation salesInformation);

    /**
     * 分页
     * @return
     */
     List<SalesInformation> PagerSalesInformation(SalesInformation salesInformation);


    public  void insertAll(List<SalesInformation> salesInformations);
}
