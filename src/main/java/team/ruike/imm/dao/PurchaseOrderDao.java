package team.ruike.imm.dao;

import team.ruike.imm.entity.PurchaseOrder;

import java.util.List;

/**
 * Created by HP on 2017/12/15.
 */
public interface PurchaseOrderDao {
    //根据条件查询购货单
    List<PurchaseOrder> selectAll(PurchaseOrder purchaseOrder);
    //新增购货单
    int insertPurchaseOrder(PurchaseOrder purchaseOrder);
}
