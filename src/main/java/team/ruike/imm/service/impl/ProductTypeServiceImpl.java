package team.ruike.imm.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import team.ruike.imm.dao.ProductTypeDao;
import team.ruike.imm.entity.ProductType;
import team.ruike.imm.service.ProductTypeService;

import java.util.List;

@Service("ProductTypeService")
public class ProductTypeServiceImpl implements ProductTypeService {
    @Autowired
    ProductTypeDao productTypeDao;

    public ProductTypeDao getProductTypeDao() {
        return productTypeDao;
    }

    public void setProductTypeDao(ProductTypeDao productTypeDao) {
        this.productTypeDao = productTypeDao;
    }

    public List<ProductType> selectProductType(ProductType productType) { return productTypeDao.selectProductType(productType); }

    public int updateProductType(ProductType productType) {
        return productTypeDao.updateProductType(productType);
    }

    public int insertProductType(ProductType productType) {
        return productTypeDao.insertProductType(productType);
    }
}
