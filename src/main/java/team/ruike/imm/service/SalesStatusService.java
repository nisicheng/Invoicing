package team.ruike.imm.service;

import team.ruike.imm.entity.Sales;
import team.ruike.imm.entity.SalesStatus;

import java.util.List;

/**
 * 闫琛昊
 */
public interface SalesStatusService {
    /**
     * 按指定条件查询销售状态
     * @param salesStatus
     * @return
     */
    public List<SalesStatus> selectSalesStatus(SalesStatus salesStatus);

    /**
     * 按指定条件修改销售状态
     * @param salesStatus
     * @return
     */
    public int updateSalesStatus(SalesStatus salesStatus);

    /**
     * 新增销售状态
     * @param salesStatus
     * @return
     */
    public int insertSalesStatus(SalesStatus salesStatus);
}
