package team.ruike.imm.entity;

import team.ruike.imm.utility.PagerParameter;

import java.io.Serializable;

/**
 * @author 闫琛昊
 * @version 2.0
 *供应商产品
 */
public class SupplierProduct extends PagerParameter implements Serializable{
    /**
     * 编号
     */
    private Integer supplierProductId;
    /**
     * 商品编号
     */
    private Integer merchandiseId;
    /**
     * 供应商编号
     */
    private Integer supplierId;
    /**
     * 供应商报价
     */
    private double supplierProductPrice;
    /**
     * 是否已删除
     */
    private Integer supplierProductState;
    /**
     * 商品信息
     */
    private Merchandise merchandise;
    /**
     * 供应商信息
     */
    private Supplier supplier;

    public Integer getSupplierProductId() {
        return supplierProductId;
    }

    public void setSupplierProductId(Integer supplierProductId) {
        this.supplierProductId = supplierProductId;
    }

    public Integer getMerchandiseId() {
        return merchandiseId;
    }

    public void setMerchandiseId(Integer merchandiseId) {
        this.merchandiseId = merchandiseId;
    }

    public Integer getSupplierId() {
        return supplierId;
    }

    public void setSupplierId(Integer supplierId) {
        this.supplierId = supplierId;
    }

    public double getSupplierProductPrice() {
        return supplierProductPrice;
    }

    public void setSupplierProductPrice(double supplierProductPrice) {
        this.supplierProductPrice = supplierProductPrice;
    }

    public Integer getSupplierProductState() {
        return supplierProductState;
    }

    public void setSupplierProductState(Integer supplierProductState) {
        this.supplierProductState = supplierProductState;
    }

    public Merchandise getMerchandise() {
        return merchandise;
    }

    public void setMerchandise(Merchandise merchandise) {
        this.merchandise = merchandise;
    }

    public Supplier getSupplier() {
        return supplier;
    }

    public void setSupplier(Supplier supplier) {
        this.supplier = supplier;
    }
}
