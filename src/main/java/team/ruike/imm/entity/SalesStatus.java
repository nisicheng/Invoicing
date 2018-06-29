package team.ruike.imm.entity;

import team.ruike.imm.utility.PagerParameter;

import java.io.Serializable;
import java.util.List;

/**
 * @author 闫琛昊
 * @version 2.0
 *销售状态
 */
public class SalesStatus extends PagerParameter implements Serializable{
    /**
     * 销售编号
     */
    private Integer salesStatusId;
    /**
     * 销售名称
     */
    private String salesStatusName;

    /**
     * 商品信息表
     */
    private List<Merchandise> merchandise;
    /**
     * 是否已删除
     */
    private  Integer salesStatusState;

    public List<Merchandise> getMerchandise() {
        return merchandise;
    }

    public void setMerchandise(List<Merchandise> merchandise) {
        this.merchandise = merchandise;
    }

    public Integer getSalesStatusState() {
        return salesStatusState;
    }

    public void setSalesStatusState(Integer salesStatusState) {
        this.salesStatusState = salesStatusState;
    }

    public Integer getSalesStatusId() {
        return salesStatusId;
    }

    public void setSalesStatusId(Integer salesStatusId) {
        this.salesStatusId = salesStatusId;
    }

    public String getSalesStatusName() {
        return salesStatusName;
    }

    public void setSalesStatusName(String salesStatusName) {
        this.salesStatusName = salesStatusName;
    }
}
