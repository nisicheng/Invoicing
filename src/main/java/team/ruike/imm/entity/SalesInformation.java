package team.ruike.imm.entity;

import org.jeecgframework.poi.excel.annotation.Excel;
import org.jeecgframework.poi.excel.annotation.ExcelEntity;
import org.springframework.format.annotation.DateTimeFormat;
import team.ruike.imm.utility.PagerParameter;

import java.io.Serializable;
import java.util.Date;

/**
 * @author 闫琛昊
 * @version 2.0
 *销售订单详情
 */
public class SalesInformation extends PagerParameter implements Serializable{
    /**
     * 销售编号
     */
    private Integer siId;
    /**
     * 订单编号
     */
    private String salesId;
    /**
     * 药品编号
     */
    private Integer merchandiseId;
    /**
     * 销售数量
     */
    @Excel(name = "销售数量" , needMerge = true)
    private Integer siVolume;
    /**
     * 单位
     */
    private Integer unitsId;
    /**
     * 售价
     */
    @Excel(name = "售价" , needMerge = true)
    private double siActualPrice;
    /**
     * 是否已删除
     */
    private Integer siState;
    /**
     * 销售订单表
     */
    @ExcelEntity(name = "销售订单表")
    private Sales sales;
    /**
     * 销售订单详情
     */
    @ExcelEntity(name = "销售订单详情")
    private Merchandise merchandise;
    /**
     * 单位
     */
    @ExcelEntity(name = "单位")
    private Units units;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date startTime;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date endTime;
    @Excel(name = "商品名称" , needMerge = true)
    private String merchandiseName;
    @Excel(name = "单位名称" , needMerge = true)
    private String unitsName;
    public String getMerchandiseName() {
        return merchandiseName;
    }

    public void setMerchandiseName(String merchandiseName) {
        this.merchandiseName = merchandiseName;
    }

    public String getUnitsName() {
        return unitsName;
    }

    public void setUnitsName(String unitsName) {
        this.unitsName = unitsName;
    }


    /**
     * 总价
     */
    private double siTotalPrice;

    /**
     * 备注
     */
    private String siRemarks;


    public double getSiTotalPrice() {
        return siTotalPrice;
    }

    public void setSiTotalPrice(double siTotalPrice) {
        this.siTotalPrice = siTotalPrice;
    }

    public String getSiRemarks() {
        return siRemarks;
    }

    public void setSiRemarks(String siRemarks) {
        this.siRemarks = siRemarks;
    }

    public Integer getSiId() {
        return siId;
    }

    public void setSiId(Integer siId) {
        this.siId = siId;
    }

    public String getSalesId() {
        return salesId;
    }

    public void setSalesId(String salesId) {
        this.salesId = salesId;
    }

    public Integer getMerchandiseId() {
        return merchandiseId;
    }

    public void setMerchandiseId(Integer merchandiseId) {
        this.merchandiseId = merchandiseId;
    }

    public Integer getSiVolume() {
        return siVolume;
    }

    public void setSiVolume(Integer siVolume) {
        this.siVolume = siVolume;
    }

    public Integer getUnitsId() {
        return unitsId;
    }

    public void setUnitsId(Integer unitsId) {
        this.unitsId = unitsId;
    }

    public double getSiActualPrice() {
        return siActualPrice;
    }

    public void setSiActualPrice(double siActualPrice) {
        this.siActualPrice = siActualPrice;
    }

    public Integer getSiState() {
        return siState;
    }

    public void setSiState(Integer siState) {
        this.siState = siState;
    }

    public Sales getSales() {
        return sales;
    }

    public void setSales(Sales sales) {
        this.sales = sales;
    }

    public Merchandise getMerchandise() {
        return merchandise;
    }

    public void setMerchandise(Merchandise merchandise) {
        this.merchandise = merchandise;
    }

    public Units getUnits() {
        return units;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public void setUnits(Units units) {
        this.units = units;
    }
}
