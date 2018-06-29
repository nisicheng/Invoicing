package team.ruike.imm.entity;

import org.jeecgframework.poi.excel.annotation.Excel;
import team.ruike.imm.utility.PagerParameter;

import java.io.Serializable;
import java.util.List;

/**
 * @author 闫琛昊
 * @version 2.0
 *单位信息
 */
public class Units extends PagerParameter implements Serializable{
    /**
     * 单位编号
     */
    private Integer unitsId;
    /**
     * 单位名称
     */
    @Excel(name = "单位" , needMerge = true)
    private String unitsName;
    /**
     * 商品信息表
     */
    private List<Merchandise> merchandise;
    /**
     * 销售订单详情表
     */
    private List<SalesInformation> salesInformation;
    /**
     * 采购订单详情表
     */
    private List<ProcurementInformation> procurementInformation;
    /**
     * 是否已删除
     */
    private Integer unitsState;

    public int getUnitsId() {
        return unitsId;
    }

    public void setUnitsId(int unitsId) {
        this.unitsId = unitsId;
    }

    public String getUnitsName() {
        return unitsName;
    }

    public void setUnitsName(String unitsName) {
        this.unitsName = unitsName;
    }

    public List<Merchandise> getMerchandise() {
        return merchandise;
    }

    public void setMerchandise(List<Merchandise> merchandise) {
        this.merchandise = merchandise;
    }

    public List<SalesInformation> getSalesInformation() {
        return salesInformation;
    }

    public void setSalesInformation(List<SalesInformation> salesInformation) {
        this.salesInformation = salesInformation;
    }

    public List<ProcurementInformation> getProcurementInformation() {
        return procurementInformation;
    }

    public void setProcurementInformation(List<ProcurementInformation> procurementInformation) {
        this.procurementInformation = procurementInformation;
    }

    public Integer getUnitsState() {
        return unitsState;
    }

    public void setUnitsState(Integer unitsState) {
        this.unitsState = unitsState;
    }
}
