package team.ruike.imm.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import team.ruike.imm.dao.PositionDao;
import team.ruike.imm.entity.Position;
import team.ruike.imm.service.PositionService;

import java.util.List;

@Service("PositionService")
public class PositionServiceImpl implements PositionService{
    @Autowired
    PositionDao positionDao;

    public PositionDao getPositionDao() {
        return positionDao;
    }

    public void setPositionDao(PositionDao positionDao) {
        this.positionDao = positionDao;
    }

    public List<Position> selectPosition(Position position) {
        return positionDao.selecrPosition(position);
    }

    public int updatePosition(Position position) {
        return positionDao.updatePosition(position);
    }

    public int insertPosition(Position position) {
        return positionDao.insertPosition(position);
    }
}
