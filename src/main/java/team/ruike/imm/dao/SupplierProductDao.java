package team.ruike.imm.dao;

import team.ruike.imm.entity.SupplierProduct;

import java.util.List;

/**
 * @author 闫琛昊
 * @version 1.0
 *供应商产品
 */
public interface SupplierProductDao {
    /**
     * 指定条件查询供应商产品
     * @param supplierProduct 供应商产品
     * @return
     */
    public List<SupplierProduct> selectSupplierProduct(SupplierProduct supplierProduct);

    /**
     * 指定条件修改供应商产品
     * @param supplierProduct 供应商产品
     * @return
     */
    public int updateSupplierProduct(SupplierProduct supplierProduct);

    /**
     * 新增供应商产品
     * @param supplierProduct 供应商产品
     * @return
     */
    public int insertSupplierProduct(SupplierProduct supplierProduct);
    /**
     * 分页
     * @return
     */
    public List<SupplierProduct> PagerSupplierProduct(SupplierProduct supplierProduct);
}
