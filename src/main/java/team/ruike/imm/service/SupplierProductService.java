package team.ruike.imm.service;

import team.ruike.imm.entity.SupplierProduct;

import java.util.List;

/**
 * 闫琛昊
 */
public interface SupplierProductService {
    /**
     * 按指定条件查询供应商产品信息
     * @param supplierProduct
     * @return
     */
    public List<SupplierProduct> selectSupplierProduct(SupplierProduct supplierProduct);

    /**
     * 按指定条件修改供应商产品信息
     * @param supplierProduct
     * @return
     */
    public int updateSupplierProduct(SupplierProduct supplierProduct);

    /**
     * 新增供应商产品信息
     * @param supplierProduct
     * @return
     */
    public int insertSupplierProduct(SupplierProduct supplierProduct);
}
