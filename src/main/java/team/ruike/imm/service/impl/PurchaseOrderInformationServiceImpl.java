package team.ruike.imm.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import team.ruike.imm.dao.PurchaseOrderInformationDao;
import team.ruike.imm.entity.PurchaseOrderInformation;
import team.ruike.imm.service.PurchaseOrderInformationService;

import java.util.List;

/**
 * Created by HP on 2017/12/15.
 */
@Service("purchaseOrderInformationService")
public class PurchaseOrderInformationServiceImpl implements PurchaseOrderInformationService {
    @Autowired
    PurchaseOrderInformationDao purchaseOrderInformationDao;
    public int batchInsertPurchaseOrder(List<PurchaseOrderInformation> purchaseOrderInformations) {
        return purchaseOrderInformationDao.batchInsertPurchaseOrder(purchaseOrderInformations);
    }
}
