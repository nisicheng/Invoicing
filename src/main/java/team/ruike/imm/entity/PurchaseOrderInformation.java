package team.ruike.imm.entity;

/**
 * Created by HP on 2017/12/15.
 */
public class PurchaseOrderInformation {
    /**
     * 采购编号
     */
    private Integer poiId;

    /**
     * 采购订单编号
     */
    private String purchaseOrderId;
    /**
     * 商品编号
     */
    private Integer merchandiseId;

    /**
     * 采购价格
     */
    private double poiActualPrice;
    /**
     * 采购数量
     */
    private Integer poiVolume;

    /**
     * 单位编号
     */
    private Integer unitsId;

    /**
     * 售价
     */
    private double siActualPrice;
    /**
     * 是否已删除
     */
    private double poiTotalPrice;
    private String poiRemarks;



    private Integer poiState;

    public Integer getPoiId() {
        return poiId;
    }

    public void setPoiId(Integer poiId) {
        this.poiId = poiId;
    }

    public String getPurchaseOrderId() {
        return purchaseOrderId;
    }

    public void setPurchaseOrderId(String purchaseOrderId) {
        this.purchaseOrderId = purchaseOrderId;
    }

    public Integer getMerchandiseId() {
        return merchandiseId;
    }

    public void setMerchandiseId(Integer merchandiseId) {
        this.merchandiseId = merchandiseId;
    }

    public double getPoiActualPrice() {
        return poiActualPrice;
    }

    public void setPoiActualPrice(double poiActualPrice) {
        this.poiActualPrice = poiActualPrice;
    }

    public Integer getPoiVolume() {
        return poiVolume;
    }

    public void setPoiVolume(Integer poiVolume) {
        this.poiVolume = poiVolume;
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

    public double getPoiTotalPrice() {
        return poiTotalPrice;
    }

    public void setPoiTotalPrice(double poiTotalPrice) {
        this.poiTotalPrice = poiTotalPrice;
    }

    public String getPoiRemarks() {
        return poiRemarks;
    }

    public void setPoiRemarks(String poiRemarks) {
        this.poiRemarks = poiRemarks;
    }

    public Integer getPoiState() {
        return poiState;
    }

    public void setPoiState(Integer poiState) {
        this.poiState = poiState;
    }

    public Units getUnits() {
        return units;
    }

    public void setUnits(Units units) {
        this.units = units;
    }

    public Merchandise getMerchandise() {
        return merchandise;
    }

    public void setMerchandise(Merchandise merchandise) {
        this.merchandise = merchandise;
    }

    /**
     * 单位信息
     */
    private Units units;
    /**
     * 商品信息
     */
    private Merchandise merchandise;
    /**
     * 采购订单信息
     */
    private PurchaseOrder purchaseOrder;

    public PurchaseOrder getPurchaseOrder() {
        return purchaseOrder;
    }

    public void setPurchaseOrder(PurchaseOrder purchaseOrder) {
        this.purchaseOrder = purchaseOrder;
    }
}
