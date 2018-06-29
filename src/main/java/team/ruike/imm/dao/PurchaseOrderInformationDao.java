package team.ruike.imm.dao;

import team.ruike.imm.entity.PurchaseOrderInformation;

import java.util.List;

/**
 * Created by HP on 2017/12/15.
 */
public interface PurchaseOrderInformationDao {
    //根据条件查询购货单
   // List<PurchaseOrderInformation> selectAll(PurchaseOrderInformation purchaseOrderInformation);
    //批量添加购货单
    int batchInsertPurchaseOrder(List<PurchaseOrderInformation> purchaseOrderInformations);

}
