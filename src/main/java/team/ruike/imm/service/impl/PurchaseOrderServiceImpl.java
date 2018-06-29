package team.ruike.imm.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import team.ruike.imm.dao.PurchaseOrderDao;
import team.ruike.imm.entity.PurchaseOrder;
import team.ruike.imm.utility.RandomUtil;
import team.ruike.imm.service.PurchaseOrderService;

import java.util.List;

/**
 * Created by HP on 2017/12/15.
 */
@Service("purchaseOrderService")
public class PurchaseOrderServiceImpl implements PurchaseOrderService {
    @Autowired
    PurchaseOrderDao purchaseOrderDao;
    //保存购货单
    public int savePurchaseOrder(PurchaseOrder purchaseOrder) {
        return purchaseOrderDao.insertPurchaseOrder(purchaseOrder);
    }
    public String purchaseId() {
        String aa = "GH";
        List<PurchaseOrder> list = purchaseOrderDao.selectAll(null);
        aa += RandomUtil.getRandomFileName();
        String size = String.valueOf(list.size() + 1);
        if (size.length() == 1) {
            size = "00" + size;
        } else if (size.length() == 2) {
            size = "0" + size;
        }
        aa += size;
        return aa;
    }
}
