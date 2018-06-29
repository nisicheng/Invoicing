package team.ruike.imm.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import team.ruike.imm.dao.SalesInformationDao;
import team.ruike.imm.entity.SalesInformation;
import team.ruike.imm.service.SalesInformationService;

import java.util.List;

@Service("salesInformationService")
public class SalesInformationServiceImpl implements SalesInformationService {

    @Autowired
    SalesInformationDao salesInformationDao;


    public SalesInformationDao getSalesInformationDao() {
        return salesInformationDao;
    }

    public void insertAll(List<SalesInformation> salesInformations) {
        salesInformationDao.insertAll(salesInformations);
    }

    public void setSalesInformationDao(SalesInformationDao salesInformationDao) {
        this.salesInformationDao = salesInformationDao;
    }

    public List<SalesInformation> selectSalesInformation(SalesInformation salesInformation) {
        return salesInformationDao.selectSalesInformation(salesInformation);
    }

    public int updateSalesInformation(SalesInformation salesInformation) {
        return salesInformationDao.updateSalesInformation(salesInformation);
    }

    public int insertSalesInformation(SalesInformation salesInformation) {
        return salesInformationDao.insertSalesInformation(salesInformation);
    }

    public List<SalesInformation> PagerSalesInformation(SalesInformation salesInformation) {
        return null;
    }
}
