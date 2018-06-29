package team.ruike.imm.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import team.ruike.imm.dao.EventDetailsDao;
import team.ruike.imm.entity.EventDetails;
import team.ruike.imm.service.EventDetailsService;

import java.util.List;

@Service("EventDetailsService")
public class EventDetailsServiceImpl implements EventDetailsService {
    @Autowired
    EventDetailsDao eventDetailsDao;

    public EventDetailsDao getEventDetailsDao() {
        return eventDetailsDao;
    }

    public void setEventDetailsDao(EventDetailsDao eventDetailsDao) {
        this.eventDetailsDao = eventDetailsDao;
    }
    public List<EventDetails> selectEventDetails(EventDetails eventDetails){
        return eventDetailsDao.selecrEventDetails(eventDetails);
    }
    public int updateEventDetails(EventDetails eventDetails){
        return eventDetailsDao.updateEventDetails(eventDetails);
    }
    public int insertEventDetails(EventDetails eventDetails){
        return eventDetailsDao.insertEventDetails(eventDetails);
    }
}
