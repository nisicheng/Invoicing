package team.ruike.imm.dao;

import team.ruike.imm.entity.EventDetails;

import java.util.List;
/**
 * @author 索志文
 * @version 1.0
 */
public interface EventDetailsDao {
    /**
     * 指定条件查询活动详情
     * @param eventDetails 活动详情
     * @return
     */
    public List<EventDetails> selecrEventDetails(EventDetails eventDetails);

    /**
     *指定条件修改活动详情
     * @param eventDetails
     * @return
     */
    public int updateEventDetails(EventDetails eventDetails);

    /**
     *增加活动详情
     * @param eventDetails
     * @return
     */
    public int insertEventDetails(EventDetails eventDetails);
        /**
     * 分页
     * @return
     */
    public List<EventDetails> PagerEventDetails(EventDetails eventDetails);
}
