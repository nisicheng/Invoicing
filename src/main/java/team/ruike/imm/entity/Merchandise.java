package team.ruike.imm.entity;

import com.baomidou.mybatisplus.annotations.TableName;
import org.jeecgframework.poi.excel.annotation.Excel;
import org.jeecgframework.poi.excel.annotation.ExcelEntity;
import org.jeecgframework.poi.excel.annotation.ExcelTarget;
import team.ruike.imm.utility.PagerParameter;

import java.io.Serializable;

/**
 *　@author 索志文
 *　@versrion 2.0
 * 商品信息
 */
@ExcelTarget("Merchandise")
public class Merchandise extends PagerParameter implements Serializable{
    /**
     * 商品编号
     */
    @Excel(name = "商品编号" , needMerge = true)
    private Integer merchandiseId;
    /**
     * 商品编码；
     */
    @Excel(name = "商品编码" , needMerge = true)
    private String merchandiseCode;
    /**
     *商品名称
     */
    @Excel(name = "商品名称" , needMerge = true)
    private String merchandiseName;
    /**
     * 商品规格
     */
    @Excel(name = "商品规格" , needMerge = true)
    private String merchandiseSpecification;

    /**
     * 商品类型编号
     */
    private Integer productTypeId;
    /**
     * 商品单位信息
     */
    private Integer unitsId;
    /**
     * 产地
     */
    @Excel(name = "产地" , needMerge = true)
    private String merchandisePlaceOfOrigin;
    /**
     * 安全存量
     */
    @Excel(name = "安全存量" , needMerge = true)
    private Integer merchandiseSafetyStock;
    /**
     * 当前数量
     */
    @Excel(name = "当前数量" , needMerge = true)
    private Integer merchandiseActualQuntity;
    /**
     * 无税供价
     */
    @Excel(name = "无税供价" , needMerge = true)
    private double merchandiseSalsePrice;
    /**
     * 销售状态
     */
    private Integer salesStatusId;
    /**
     * 是否已删除
     */
    private  Integer merchandiseState;

    /**
     * 查询多条
     */
    private String about;

    public String getAbout() {
        return about;
    }

    public void setAbout(String about) {
        this.about = about;
    }

    /**
     * 商品单位信息
     */
    @ExcelEntity(name = "商品单位信息")
    private Units units;
    /**
     * 商品类型
     */
    private ProductType productType;
    /**
     * 销售状态
     */
    private SalesStatus salesStatus;

    /**
     * 有多少条商品库存预警
     */
    private  Integer sumStock;

    public Integer getSumStock() {
        return sumStock;
    }

    public void setSumStock(Integer sumStock) {
        this.sumStock = sumStock;
    }

    public Integer getMerchandiseId() {
        return merchandiseId;
    }

    public void setMerchandiseId(Integer merchandiseId) {
        this.merchandiseId = merchandiseId;
    }

    public String getMerchandiseCode() {
        return merchandiseCode;
    }

    public void setMerchandiseCode(String merchandiseCode) {
        this.merchandiseCode = merchandiseCode;
    }

    public String getMerchandiseName() {
        return merchandiseName;
    }

    public void setMerchandiseName(String merchandiseName) {
        this.merchandiseName = merchandiseName;
    }

    public String getMerchandiseSpecification() {
        return merchandiseSpecification;
    }

    public void setMerchandiseSpecification(String merchandiseSpecification) {
        this.merchandiseSpecification = merchandiseSpecification;
    }

    public Integer getProductTypeId() {
        return productTypeId;
    }

    public void setProductTypeId(Integer productTypeId) {
        this.productTypeId = productTypeId;
    }

    public Integer getUnitsId() {
        return unitsId;
    }

    public void setUnitsId(Integer unitsId) {
        this.unitsId = unitsId;
    }

    public String getMerchandisePlaceOfOrigin() {
        return merchandisePlaceOfOrigin;
    }

    public void setMerchandisePlaceOfOrigin(String merchandisePlaceOfOrigin) {
        this.merchandisePlaceOfOrigin = merchandisePlaceOfOrigin;
    }

    public Integer getMerchandiseSafetyStock() {
        return merchandiseSafetyStock;
    }

    public void setMerchandiseSafetyStock(Integer merchandiseSafetyStock) {
        this.merchandiseSafetyStock = merchandiseSafetyStock;
    }

    public Integer getMerchandiseActualQuntity() {
        return merchandiseActualQuntity;
    }

    public void setMerchandiseActualQuntity(Integer merchandiseActualQuntity) {
        this.merchandiseActualQuntity = merchandiseActualQuntity;
    }

    public double getMerchandiseSalsePrice() {
        return merchandiseSalsePrice;
    }

    public void setMerchandiseSalsePrice(double merchandiseSalsePrice) {
        this.merchandiseSalsePrice = merchandiseSalsePrice;
    }

    public Integer getSalesStatusId() {
        return salesStatusId;
    }

    public void setSalesStatusId(Integer salesStatusId) {
        this.salesStatusId = salesStatusId;
    }

    public Integer getMerchandiseState() {
        return merchandiseState;
    }

    public void setMerchandiseState(Integer merchandiseState) {
        this.merchandiseState = merchandiseState;
    }

    public Units getUnits() {
        return units;
    }

    public void setUnits(Units units) {
        this.units = units;
    }

    public ProductType getProductType() {
        return productType;
    }

    public void setProductType(ProductType productType) {
        this.productType = productType;
    }

    public SalesStatus getSalesStatus() {
        return salesStatus;
    }

    public void setSalesStatus(SalesStatus salesStatus) {
        this.salesStatus = salesStatus;
    }
}
