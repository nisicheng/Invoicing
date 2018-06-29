package team.ruike.imm.dao;

import team.ruike.imm.entity.Employee;
import team.ruike.imm.entity.Supplier;

import java.util.List;

/**
 * @author 闫琛昊
 * @version 1.0
 *供应商信息
 */
public interface SupplierDao {


    int count(Supplier supplier);
    /**
     * 指定条件查询供应商信息
     * @param supplier 供应商信息
     * @return
     */
     List<Supplier> selectSuplier(Supplier supplier);

    /**
     * 指定条件修改供应商信息
     * @param supplier 供应商信息
     * @return
     */
     int updateSupplier(Supplier supplier);

    /**
     * 新增供应商信息
     * @param supplier 供应商信息
     * @return
     */
     int insertSuplier(Supplier supplier);

    /**
     * 分页
     * @return
     */
     List<Supplier> pages(Supplier supplier);
     int noncooperation(List<Supplier> supplier);
     int cooperative(List<Supplier> supplier);
}
