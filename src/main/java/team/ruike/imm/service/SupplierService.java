package team.ruike.imm.service;

import team.ruike.imm.entity.Supplier;
import team.ruike.imm.utility.Pages;

import java.util.List;

/**
 * 闫琛昊
 */
public interface SupplierService {
    /**
     * 按条件查询指定供应商信息
     * @param supplier
     * @return
     */
    public List<Supplier> selectSuplier(Supplier supplier);
    /**
     * 分页
     * @param
     * @return
     */
    public List<Supplier> pagerSuplier(Supplier supplier);
    /**
     * 入参分页类
     * @param
     * @return
     */
    public Pages<Supplier> getPager(Supplier supplier, Integer currentPage);

    /**
     * 按条件修改指定供应商信息
     * @param supplier
     * @return
     */
    public int updateSupplier(Supplier supplier);

    /**
     * 新增供应商信息
     * @param supplier
     * @return
     */
    public int insertSuplier(Supplier supplier);

    public int noncooperation(List<Supplier> supplier);
    public int cooperative(List<Supplier> supplier);
}
