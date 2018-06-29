package team.ruike.imm.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import team.ruike.imm.dao.SupplierDao;
import team.ruike.imm.entity.Supplier;
import team.ruike.imm.service.SupplierService;
import team.ruike.imm.utility.Pages;

import java.util.List;

/**
 * Created by HP on 2017/11/29.
 */
@Service("supplierService")
public class SuplierServiceImpl implements SupplierService {
    @Autowired
    private SupplierDao supplierDao;


    public List<Supplier> selectSuplier(Supplier supplier) {
        List<Supplier> list=supplierDao.selectSuplier(supplier);
        return list;
    }

    public int updateSupplier(Supplier supplier) {
        return supplierDao.updateSupplier(supplier);
    }

    public int insertSuplier(Supplier supplier) {
        return supplierDao.insertSuplier(supplier);
    }

    public int noncooperation(List<Supplier> supplier) {
        return supplierDao.noncooperation(supplier);
    };


    public int cooperative(List<Supplier> supplier){
        return supplierDao.cooperative(supplier);
    }

    int pageSize=4;
    /**
     *  分页查询数据库
     * @param supplier
     * @return
     */
    public List<Supplier> pagerSuplier(Supplier supplier) {
        supplier.setPageSize(pageSize);
        if (supplier.getCurrentPage()>1){
            supplier.setCurrentPage((supplier.getCurrentPage()-1)*pageSize);
        }else {
            supplier.setCurrentPage(0);
        }
        List<Supplier> count=supplierDao.pages(supplier);
        return count;
    }
    /**
     * 分页类入参
     * @param supplier
     * @return
     */
    public Pages<Supplier> getPager(Supplier supplier, Integer currentPage) {
        List<Supplier> count=null;
        Supplier c=new Supplier();
        int i=0;
        if(supplier.getSupplierState()==1 || supplier.getSupplierState()==0){
            c.setSupplierState(supplier.getSupplierState());
            i=supplierDao.count(supplier);
        }else {
            c.setSupplierState(supplier.getSupplierState());
            count=supplierDao.pages(c);
            i=supplierDao.count(c);
        }
        Pages<Supplier> pages=new Pages<Supplier>();
        pages.setCurrentPage(currentPage);
        pages.setList(count);
        pages.setTotalRecord(i);
        pages.setPageSize(pageSize);
        return pages;
    }
}
