package team.ruike.imm.entity;

import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * Created by HP on 2017/12/15.
 */
public class PurchaseOrder {
    /**
     * 采购单号
     */
    private String purchaseOrderId;
    /**
     * 采购日期
     */
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date purchaseOrderDate;
    /**
     * 供应商编号
     */
    private  Integer supplierId;

    /**
     * 员工编号
     */
    private Integer purchaseOrderEmployeeId;
    /**
     * 状态
     */
    private Integer purchaseOrderAccomplish;
    /**
     * 是否已删除
     */
    private  Integer purchaseOrderState;
    /**
     * 采购人 =员工信息
     */
    private Employee purchaseOrderEmployee;
    /**
     * 供应商信息
     */
    private Supplier supplier;

    public String getPurchaseOrderId() {
        return purchaseOrderId;
    }

    public void setPurchaseOrderId(String purchaseOrderId) {
        this.purchaseOrderId = purchaseOrderId;
    }

    public Date getPurchaseOrderDate() {
        return purchaseOrderDate;
    }

    public void setPurchaseOrderDate(Date purchaseOrderDate) {
        this.purchaseOrderDate = purchaseOrderDate;
    }

    public Integer getSupplierId() {
        return supplierId;
    }

    public void setSupplierId(Integer supplierId) {
        this.supplierId = supplierId;
    }

    public Integer getPurchaseOrderEmployeeId() {
        return purchaseOrderEmployeeId;
    }

    public void setPurchaseOrderEmployeeId(Integer purchaseOrderEmployeeId) {
        this.purchaseOrderEmployeeId = purchaseOrderEmployeeId;
    }

    public Integer getPurchaseOrderAccomplish() {
        return purchaseOrderAccomplish;
    }

    public void setPurchaseOrderAccomplish(Integer purchaseOrderAccomplish) {
        this.purchaseOrderAccomplish = purchaseOrderAccomplish;
    }

    public Integer getPurchaseOrderState() {
        return purchaseOrderState;
    }

    public void setPurchaseOrderState(Integer purchaseOrderState) {
        this.purchaseOrderState = purchaseOrderState;
    }

    public Employee getPurchaseOrderEmployee() {
        return purchaseOrderEmployee;
    }

    public void setPurchaseOrderEmployee(Employee purchaseOrderEmployee) {
        this.purchaseOrderEmployee = purchaseOrderEmployee;
    }

    public Supplier getSupplier() {
        return supplier;
    }

    public void setSupplier(Supplier supplier) {
        this.supplier = supplier;
    }
}
