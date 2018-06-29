package team.ruike.imm.entity;

import org.jeecgframework.poi.excel.annotation.Excel;
import team.ruike.imm.utility.PagerParameter;

import java.io.Serializable;
import java.util.List;

/**
 * @author 闫琛昊
 * @version 2.0
 * 种类信息
 */
public class ProductType extends PagerParameter implements Serializable{
    /**
     *  种类编号
     */
    private Integer productTypeId;
    /**
     * 种类名称
     */

    private String productTypeName;

    /**
     * 供应商信息表
     */
    private List<Supplier>supplier;
    /**
     * 是否已删除
     */
    private Integer productTypeState;

    public Integer getProductTypeId() {
        return productTypeId;
    }

    public void setProductTypeId(Integer productTypeId) {
        this.productTypeId = productTypeId;
    }

    public String getProductTypeName() {
        return productTypeName;
    }

    public void setProductTypeName(String productTypeName) {
        this.productTypeName = productTypeName;
    }

    public List<Supplier> getSupplier() {
        return supplier;
    }

    public void setSupplier(List<Supplier> supplier) {
        this.supplier = supplier;
    }

    public Integer getProductTypeState() {
        return productTypeState;
    }

    public void setProductTypeState(Integer productTypeState) {
        this.productTypeState = productTypeState;
    }
}
