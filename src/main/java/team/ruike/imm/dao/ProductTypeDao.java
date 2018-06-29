package team.ruike.imm.dao;

import team.ruike.imm.entity.ProductType;

import java.util.List;

/**
 * @author 闫琛昊
 * @version 1.0
 * 种类信息
 */
public interface ProductTypeDao {
    /**
     * 指定条件查询种类信息
     * @param productType 种类信息
     * @return
     */
    public List<ProductType> selectProductType(ProductType productType);

    /**
     * 指定条件修改种类信息
     * @param productType 种类信息
     * @return
     */
    public int updateProductType(ProductType productType);

    /**
     *  新增种类信息
     * @param productType 种类信息
     * @return
     */
    public int insertProductType(ProductType productType);

    /**
     * 分页
     * @return
     */
    public List<ProductType> PagerProductType(ProductType productType);
}
