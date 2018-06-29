package team.ruike.imm.entity;
import org.jeecgframework.poi.excel.annotation.Excel;
import org.springframework.format.annotation.DateTimeFormat;
import team.ruike.imm.utility.PagerParameter;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * @author 闫琛昊
 * @version 2.0
 *销售订单
 */
public class Sales extends PagerParameter implements Serializable{
    /**
     *  订单编号
     */
    @Excel(name = "订单编号" , needMerge = true)
    private String salesId;
    /**
     *  销售日期
     */
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date salesDate;
    /**
     * 客户编号
     */
    private Integer clientId;
    /**
     * 业务员编号
     */
    private Integer employeeId;
    /**
     * 状态
     */
    private Integer salesAccomplish;
    /**
     * 活动编号
     */
    private Integer eventDetailsId;
    /**
     * 活动商品量
     */
    private Integer salesActivities;
    /**
     * 是否已删除
     */
    private Integer salesState;

    /**
     *销售订单详情
     */
    private SalesInformation salesInformations;
    /**
     * 客户信息表
     */
    private Client client;
    /**
     * 业务员信息表
     */
    private Employee employee;

    /**
     * 活动信息表
     */
    private EventDetails eventDetails;

    /**
     * 药品信息ID
     */
    private Integer merchandiseId;

    /**
     * 销售笔数-郭旭
     */
    private Integer countAllForThis;

    /**
     * 销售总金额-郭旭
     */
    private double allPriceForThis;

    /**
     * 销售总笔数-郭旭-销售利润
     */
    private Integer countAllForProfit;

    /**
     * 销售成本-郭旭-销售利润
     */
    private double cost;

    /**
     * 销售利润-郭旭-销售利润
     */
    private double profit;



    private double allVolume;

    private double allMonth;

    public double getAllMonth() {
        return allMonth;
    }

    public void setAllMonth(double allMonth) {
        this.allMonth = allMonth;
    }

    public double getAllVolume() {
        return allVolume;
    }

    public void setAllVolume(double allVolume) {
        this.allVolume = allVolume;
    }

    public double getProfit() {
        return profit;
    }

    public void setProfit(double profit) {
        this.profit = profit;
    }

    public double getCost() {
        return cost;
    }

    public void setCost(double cost) {
        this.cost = cost;
    }

    public Integer getCountAllForProfit() {
        return countAllForProfit;
    }

    public void setCountAllForProfit(Integer countAllForProfit) {
        this.countAllForProfit = countAllForProfit;
    }

    /**
     * 药品类型ID
     */
    private  Integer productTypeId;

    public Integer getProductTypeId() {
        return productTypeId;
    }

    public void setProductTypeId(Integer productTypeId) {
        this.productTypeId = productTypeId;
    }

    public Integer getCountAllForThis() {
        return countAllForThis;
    }

    public void setCountAllForThis(Integer countAllForThis) {
        this.countAllForThis = countAllForThis;
    }

    public double getAllPriceForThis() {
        return allPriceForThis;
    }

    public void setAllPriceForThis(double allPriceForThis) {
        this.allPriceForThis = allPriceForThis;
    }

    public Integer getMerchandiseId() {
        return merchandiseId;
    }

    public void setMerchandiseId(Integer merchandiseId) {
        this.merchandiseId = merchandiseId;
    }

    public String getSalesId() {
        return salesId;
    }

    public void setSalesId(String salesId) {
        this.salesId = salesId;
    }

    public Date getSalesDate() {
        return salesDate;
    }

    public void setSalesDate(Date salesDate) {
        this.salesDate = salesDate;
    }

    public Integer getClientId() {
        return clientId;
    }

    public void setClientId(Integer clientId) {
        this.clientId = clientId;
    }

    public Integer getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Integer employeeId) {
        this.employeeId = employeeId;
    }

    public Integer getSalesAccomplish() {
        return salesAccomplish;
    }

    public void setSalesAccomplish(Integer salesAccomplish) {
        this.salesAccomplish = salesAccomplish;
    }

    public Integer getEventDetailsId() {
        return eventDetailsId;
    }

    public void setEventDetailsId(Integer eventDetailsId) {
        this.eventDetailsId = eventDetailsId;
    }

    public Integer getSalesActivities() {
        return salesActivities;
    }

    public void setSalesActivities(Integer salesActivities) {
        this.salesActivities = salesActivities;
    }

    public Integer getSalesState() {
        return salesState;
    }

    public void setSalesState(Integer salesState) {
        this.salesState = salesState;
    }

    public SalesInformation getSalesInformations() {
        return salesInformations;
    }

    public void setSalesInformations(SalesInformation salesInformations) {
        this.salesInformations = salesInformations;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public EventDetails getEventDetails() {
        return eventDetails;
    }

    public void setEventDetails(EventDetails eventDetails) {
        this.eventDetails = eventDetails;
    }
}
