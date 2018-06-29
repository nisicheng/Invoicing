package team.ruike.imm.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import team.ruike.imm.dao.SalesStatusDao;
import team.ruike.imm.entity.SalesStatus;
import team.ruike.imm.service.SalesStatusService;

import java.util.List;

@Service("SalesStatusService")
public class SalesStatusServiceImpl implements SalesStatusService{
    @Autowired
    SalesStatusDao salesStatusDao;

    public SalesStatusDao getSalesStatusDao() {
        return salesStatusDao;
    }

    public void setSalesStatusDao(SalesStatusDao salesStatusDao) {
        this.salesStatusDao = salesStatusDao;
    }

    public List<SalesStatus> selectSalesStatus(SalesStatus salesStatus) {
        return salesStatusDao.selectSalesStatus(salesStatus);
    }

    public int updateSalesStatus(SalesStatus salesStatus) {
        return salesStatusDao.updateSalesStatus(salesStatus);
    }

    public int insertSalesStatus(SalesStatus salesStatus) {
        return salesStatusDao.insertSalesStatus(salesStatus);
    }
}
