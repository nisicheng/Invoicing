package team.ruike.imm.entity;
import org.jeecgframework.poi.excel.annotation.ExcelEntity;
import org.springframework.format.annotation.DateTimeFormat;
import team.ruike.imm.utility.PagerParameter;

import java.io.Serializable;
import java.util.Date;

/**
 * @author 索志文
 * @version 2.0
 * 采购订单
 */
public class Procurement extends PagerParameter implements Serializable{
    /**
     * 采购单号
     */
    private String procurementId;
    /**
     * 采购日期
     */
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date procurementDate;
    /**
     * 供应商编号
     */
    private  Integer supplierId;

    /**
     * 员工编号
     */
    private Integer procurementEmployeeId;
    /**
     * 状态
     */
    private Integer procurementAccomplish;
    /**
     * 是否已删除
     */
    private  Integer procurementState;
    /**
     * 采购人 =员工信息
     */
    @ExcelEntity(name = "采购人")
    private Employee procurementEmployee;
    /**
     * 供应商信息
     */
    private Supplier supplier;

    public String getProcurementId() {
        return procurementId;
    }

    public void setProcurementId(String procurementId) {
        this.procurementId = procurementId;
    }

    public Date getProcurementDate() {
        return procurementDate;
    }

    public void setProcurementDate(Date procurementDate) {
        this.procurementDate = procurementDate;
    }

    public Integer getSupplierId() {
        return supplierId;
    }

    public void setSupplierId(Integer supplierId) {
        this.supplierId = supplierId;
    }

    public Integer getProcurementEmployeeId() {
        return procurementEmployeeId;
    }

    public void setProcurementEmployeeId(Integer procurementEmployeeId) {
        this.procurementEmployeeId = procurementEmployeeId;
    }

    public Integer getProcurementAccomplish() {
        return procurementAccomplish;
    }

    public void setProcurementAccomplish(Integer procurementAccomplish) {
        this.procurementAccomplish = procurementAccomplish;
    }

    public Integer getProcurementState() {
        return procurementState;
    }

    public void setProcurementState(Integer procurementState) {
        this.procurementState = procurementState;
    }

    public Employee getProcurementEmployee() {
        return procurementEmployee;
    }

    public void setProcurementEmployee(Employee procurementEmployee) {
        this.procurementEmployee = procurementEmployee;
    }

    public Supplier getSupplier() {
        return supplier;
    }

    public void setSupplier(Supplier supplier) {
        this.supplier = supplier;
    }
}
