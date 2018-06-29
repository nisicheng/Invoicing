package team.ruike.imm.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import team.ruike.imm.dao.UnitsDao;
import team.ruike.imm.entity.Units;
import team.ruike.imm.service.UnitsService;

import java.util.List;

@Service("unitsService")
public class UnitsServiceImpl implements UnitsService{
    @Autowired
    UnitsDao unitsDao;

    public UnitsDao getUnitsDao() {
        return unitsDao;
    }

    public void setUnitsDao(UnitsDao unitsDao) {
        this.unitsDao = unitsDao;
    }

    public List<Units> selectUnits(Units units){
        return unitsDao.selectUnits(units);
    }
    //根據 id 查詢單位
    public Units selectUntisGetById(Units units){
        return unitsDao.selectUnits(units).get(0);
    }
    public int updateUnits(Units units){
        return unitsDao.updateUnits(units);
    }
    public int insertUnits(Units units){
        return  unitsDao.insertUnits(units);
    }
}
