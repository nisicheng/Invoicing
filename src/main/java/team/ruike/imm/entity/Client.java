package team.ruike.imm.entity;
import team.ruike.imm.utility.PagerParameter;
import team.ruike.imm.utility.Pages;
import java.io.Serializable;

/**
 * @author 索志文
 * @versrion 2.0
 * 客户信息
 */
public class Client extends PagerParameter implements Serializable {
    /**
     * 客户编号
     */
    private Integer clientId;
    /**
     * 客户名称
     */
    private String clientName;
    /**
     * 负责人名称
     */
    private String clientPersonInCharge;
    /**
     * 负责人职称
     */
    private String clientPost;
    /**
     *电话
     */
    private String clientPhone;
    /**
     *移动电话
     */
    private String clientMobilePhone;
    /**
     * 传真
     */
    private String clientFax;
    /**
     * 客户地址
     */
    private String clientAddress;
    /**
     * 送货地址
     */
    private String clientFactoryAddress;
    /**
     * 是否合作
     */
    private Integer clientState;

    /**
     * 保存是否合作
     */
    private String State;

    public String getState() {
        return State;
    }

    public void setState(String state) {
        State = state;
    }

    public Integer getClientState() {
        return clientState;
    }

    public void setClientState(Integer clientState) {
        this.clientState = clientState;
    }

    public Integer getClientId() {
        return clientId;
    }

    public void setClientId(Integer clientId) {
        this.clientId = clientId;
    }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public String getClientPersonInCharge() {
        return clientPersonInCharge;
    }

    public void setClientPersonInCharge(String clientPersonInCharge) {
        this.clientPersonInCharge = clientPersonInCharge;
    }

    public String getClientPost() {
        return clientPost;
    }

    public void setClientPost(String clientPost) {
        this.clientPost = clientPost;
    }

    public String getClientPhone() {
        return clientPhone;
    }

    public void setClientPhone(String clientPhone) {
        this.clientPhone = clientPhone;
    }

    public String getClientMobilePhone() {
        return clientMobilePhone;
    }

    public void setClientMobilePhone(String clientMobilePhone) {
        this.clientMobilePhone = clientMobilePhone;
    }

    public String getClientFax() {
        return clientFax;
    }

    public void setClientFax(String clientFax) {
        this.clientFax = clientFax;
    }

    public String getClientAddress() {
        return clientAddress;
    }

    public void setClientAddress(String clientAddress) {
        this.clientAddress = clientAddress;
    }

    public String getClientFactoryAddress() {
        return clientFactoryAddress;
    }

    public void setClientFactoryAddress(String clientFactoryAddress) {
        this.clientFactoryAddress = clientFactoryAddress;
    }
}
