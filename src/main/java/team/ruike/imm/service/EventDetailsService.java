package team.ruike.imm.service;

import team.ruike.imm.entity.EventDetails;

import java.util.List;

/**
 * 闫琛昊
 */
public interface EventDetailsService {
    /**
     * 按指定条件查询活动详情
     * @param eventDetails
     * @return
     */
    public List<EventDetails> selectEventDetails(EventDetails eventDetails);

    /**
     * 按指定条件修改活动详情
     * @param eventDetails
     * @return
     */
    public int updateEventDetails(EventDetails eventDetails);

    /**
     * 新增活动详情
     * @param eventDetails
     * @return
     */
    public int insertEventDetails(EventDetails eventDetails);
}
