package team.ruike.imm.service;

import team.ruike.imm.entity.ProductType;

import java.util.List;

/**
 * 闫琛昊
 */
public interface ProductTypeService {
    /**
     * 按指定条件查询种类信息
     * @param productType
     * @return
     */
     List<ProductType> selectProductType(ProductType productType);

    /**
     * 按指定条件修改种类信息
     * @param productType
     * @return
     */
     int updateProductType(ProductType productType);

    /**
     * 新增种类信息
     * @param productType
     * @return
     */
     int insertProductType(ProductType productType);
}
