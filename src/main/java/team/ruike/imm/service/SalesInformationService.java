package team.ruike.imm.service;

import team.ruike.imm.entity.ProcurementInformation;
import team.ruike.imm.entity.SalesInformation;

import java.util.List;

/**
 * 闫琛昊
 */
public interface SalesInformationService {
    /**
     * 按指定条件查询销售订单详情
     * @param salesInformation
     * @return
     */
    public List<SalesInformation> selectSalesInformation (SalesInformation salesInformation);
    void  insertAll(List<SalesInformation> salesInformations);

    /**
     *  按指定条件修改销售订单详情
     * @param salesInformation
     * @return
     */
    public int updateSalesInformation(SalesInformation salesInformation);

    /**
     *  新增销售订单详情
     * @param salesInformation
     * @return
     */
    public int insertSalesInformation(SalesInformation salesInformation);
}
