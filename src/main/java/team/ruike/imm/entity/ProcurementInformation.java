package team.ruike.imm.entity;

import org.jeecgframework.poi.excel.annotation.Excel;
import org.jeecgframework.poi.excel.annotation.ExcelEntity;
import team.ruike.imm.utility.PagerParameter;

import java.io.Serializable;

/**
 * @author 索志文
 * @version 2.0
 * 采购订单详情
 */
public class ProcurementInformation extends PagerParameter implements Serializable{
    /**
     * 采购编号
     */
    private Integer piId;

    public String getProcurementId() {
        return procurementId;
    }

    public void setProcurementId(String procurementId) {
        this.procurementId = procurementId;
    }

    /**
     * 采购订单编号
     */
    @Excel(name = "采购订单编号" , needMerge = true)
    private String procurementId;
    /**
     * 商品编号
     */
    private Integer merchandiseId;

    /**
     * 采购价格
     */
    @Excel(name = "采购价格" , needMerge = true)
    private double piActualPrice;
    /**
     * 采购数量
     */
    @Excel(name = "采购数量" , needMerge = true)
    private Integer piVolume;

    /**
     * 单位编号
     */
    private Integer unitsId;

    /**
     * 售价
     */
    @Excel(name = "采购价格" , needMerge = true)
    private double siActualPrice;
    /**
     * 是否已删除
     */
    private double piTotalPrice;
    private String piRemarks;
    private String startTime;
    private String endTime;

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public double getPiTotalPrice() {
        return piTotalPrice;
    }

    public void setPiTotalPrice(double piTotalPrice) {
        this.piTotalPrice = piTotalPrice;
    }

    public String getPiRemarks() {
        return piRemarks;
    }

    public void setPiRemarks(String piRemarks) {
        this.piRemarks = piRemarks;
    }

    private Integer piState;
    /**
     * 单位信息
     */
    @ExcelEntity(name = "单位信息")
    private Units units;
    /**
     * 商品信息
     */
    @ExcelEntity(name = "商品信息")
    private Merchandise merchandise;
    /**
     * 采购订单信息
     */
    @ExcelEntity(name = "采购订单信息")
    private Procurement procurement;

    public Integer getPiId() {
        return piId;
    }

    public void setPiId(Integer piId) {
        this.piId = piId;
    }



    public Procurement getProcurement() {
        return procurement;
    }

    public void setProcurement(Procurement procurement) {
        this.procurement = procurement;
    }

    public Integer getMerchandiseId() {
        return merchandiseId;
    }

    public void setMerchandiseId(Integer merchandiseId) {
        this.merchandiseId = merchandiseId;
    }

    public Merchandise getMerchandise() {
        return merchandise;
    }

    public void setMerchandise(Merchandise merchandise) {
        this.merchandise = merchandise;
    }

    public double getPiActualPrice() {
        return piActualPrice;
    }

    public void setPiActualPrice(double piActualPrice) {
        this.piActualPrice = piActualPrice;
    }

    public Integer getPiVolume() {
        return piVolume;
    }

    public void setPiVolume(Integer piVolume) {
        this.piVolume = piVolume;
    }

    public Units getUnits() {
        return units;
    }

    public void setUnits(Units units) {
        this.units = units;
    }

    public Integer getUnitsId() {
        return unitsId;
    }

    public void setUnitsId(Integer unitsId) {
        this.unitsId = unitsId;
    }

    public Integer getPiState() {
        return piState;
    }

    public void setPiState(Integer piState) {
        this.piState = piState;
    }

    public double getSiActualPrice() {
        return siActualPrice;
    }

    public void setSiActualPrice(double siActualPrice) {
        this.siActualPrice = siActualPrice;
    }
}
