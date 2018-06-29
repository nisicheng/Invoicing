package team.ruike.imm.service;

import team.ruike.imm.entity.Procurement;

import java.util.List;

/**
 * 闫琛昊
 */
public interface ProcurementService {
    /**
     * 按条件查询采购订单
     * @param procurement
     * @return
     */
    public List<Procurement> selectProcurement(Procurement procurement);
    /**
     * 按条件修改采购订单
     * @param procurement
     * @return
     */
    public int updateProcurement(Procurement procurement);

    /**
     * 新增采购订单
     * @param procurement
     * @return
     */
    public int insertProcurement(Procurement procurement);
    String purchaseId(String param);
    int generateUpdateProcurement(List<Procurement> procurements);
    List<Procurement> procurementSize();
}
