package team.ruike.imm.service;

import team.ruike.imm.entity.PurchaseOrder;

/**
 * Created by HP on 2017/12/15.
 */
public interface PurchaseOrderService {
    //保存购货单
    int savePurchaseOrder(PurchaseOrder purchaseOrder);
    String purchaseId();
}
