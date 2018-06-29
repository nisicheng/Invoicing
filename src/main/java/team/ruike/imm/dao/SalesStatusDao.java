package team.ruike.imm.dao;

import team.ruike.imm.entity.SalesStatus;

import java.util.List;

/**
 * @author 闫琛昊
 * @version 1.0
 *销售状态
 */
public interface SalesStatusDao {
    /**
     * 指定条件查询销售状态
     * @param salesStatus
     * @return
     */
    public List<SalesStatus> selectSalesStatus(SalesStatus salesStatus);

    /**
     * 指定条件修改销售状态
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

    /**
     * 分页
     * @return
     */
    public List<SalesStatus> PagerSalesStatus(SalesStatus salesStatus);
}
