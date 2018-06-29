package team.ruike.imm.service;

import team.ruike.imm.entity.PurchaseOrderInformation;

import java.util.List;

/**
 * Created by HP on 2017/12/15.
 */
public interface PurchaseOrderInformationService {
    int batchInsertPurchaseOrder(List<PurchaseOrderInformation> purchaseOrderInformations);
}
