package team.ruike.imm.entity;

import team.ruike.imm.utility.PagerParameter;

import java.io.Serializable;

/**
 *　@author 索志文
 *　@versrion 2.0
 * 活动详情
 */
public class EventDetails extends PagerParameter implements Serializable{
    /**
     * 活动编号
     */
    private Integer eventDetailsId;
    /**
     * 活动详情
     */
    private String eventDetailsName;
    /**
     * 是否已删除
     */
    private  Integer eventDetailsState;

    public Integer getEventDetailsId() {
        return eventDetailsId;
    }

    public void setEventDetailsId(Integer eventDetailsId) {
        this.eventDetailsId = eventDetailsId;
    }

    public String getEventDetailsName() {
        return eventDetailsName;
    }

    public void setEventDetailsName(String eventDetailsName) {
        this.eventDetailsName = eventDetailsName;
    }

    public Integer getEventDetailsState() {
        return eventDetailsState;
    }

    public void setEventDetailsState(Integer eventDetailsState) {
        this.eventDetailsState = eventDetailsState;
    }
}
