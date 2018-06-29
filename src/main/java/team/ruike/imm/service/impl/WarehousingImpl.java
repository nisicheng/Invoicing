package team.ruike.imm.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import team.ruike.imm.dao.WarehousingDao;
import team.ruike.imm.entity.Warehousing;
import team.ruike.imm.service.WarehousingService;


import javax.annotation.Resource;
import java.util.List;

@Service("warehousingService")
public class WarehousingImpl implements WarehousingService {
    @Autowired
    WarehousingDao warehousingDao;

    public WarehousingDao getWarehousingDao() {
        return warehousingDao;
    }

    public void setWarehousingDao(WarehousingDao warehousingDao) {
        this.warehousingDao = warehousingDao;
    }

    public List<Warehousing> selectWarehousing(Warehousing warehousing) {
        return warehousingDao.selectWarehousing(warehousing);
    }

    public int updateWarehousing(Warehousing warehousing) {
        return warehousingDao.updateWarehousing(warehousing);
    }

    public int insertWarehousing(Warehousing warehousing) {
        System.out.println(warehousing.getWarehousingState());
        return warehousingDao.insertWarehousing(warehousing);
    }
}
