package team.ruike.imm.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import team.ruike.imm.dao.SupplierProductDao;
import team.ruike.imm.entity.SupplierProduct;
import team.ruike.imm.service.SupplierProductService;

import java.util.List;

@Service("SupplierProductService")
public class SupplierProductServiceImpl implements SupplierProductService{
    @Autowired
    SupplierProductDao supplierProductDao;

    public SupplierProductDao getSupplierProductDao() {
        return supplierProductDao;
    }

    public void setSupplierProductDao(SupplierProductDao supplierProductDao) {
        this.supplierProductDao = supplierProductDao;
    }

    public List<SupplierProduct> selectSupplierProduct(SupplierProduct supplierProduct){
        return supplierProductDao.selectSupplierProduct(supplierProduct);
    }
    public int updateSupplierProduct(SupplierProduct supplierProduct){
        return supplierProductDao.updateSupplierProduct(supplierProduct);
    }
    public int insertSupplierProduct(SupplierProduct supplierProduct){
        return supplierProductDao.insertSupplierProduct(supplierProduct);
    }
}
