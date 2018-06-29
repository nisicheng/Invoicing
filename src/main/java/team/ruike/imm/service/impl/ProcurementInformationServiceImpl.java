package team.ruike.imm.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import team.ruike.imm.dao.ProcurementInformationDao;
import team.ruike.imm.entity.ProcurementInformation;
import team.ruike.imm.service.ProcurementInformationService;

import java.util.List;

@Service("procurementInformationService")
public class ProcurementInformationServiceImpl implements ProcurementInformationService{


    @Autowired
    ProcurementInformationDao procurementInformationDao;

    public ProcurementInformationDao getProcurementInformationDao() {
        return procurementInformationDao;
    }

    public void setProcurementInformationDao(ProcurementInformationDao procurementInformationDao) {
        this.procurementInformationDao = procurementInformationDao;
    }

    public List<ProcurementInformation> selectProcurementInformation(ProcurementInformation procurementInformation) {
        return null;
    }
    public List<ProcurementInformation> rankingProcurement(){
      return   procurementInformationDao.rankingProcurement();
    }
    public int updateProcurementInformation(ProcurementInformation procurementInformation) {
        return 0;
    }

    public int insertProcurementInformation(ProcurementInformation procurementInformation) {
        return 0;
    }
    public void insertAll(List<ProcurementInformation> procurementInformations) {
        procurementInformationDao.insertAll(procurementInformations);
    }

    public List<ProcurementInformation> selectAllProcureMent(ProcurementInformation procurementInformation) {
        return procurementInformationDao.selectAllProcureMent(procurementInformation);
    }

    public List<ProcurementInformation> selectReplenish() {
        return procurementInformationDao.selectReplenish();
    }
    public int generateUpdateProcurementInfo(List<ProcurementInformation> information) {
        return procurementInformationDao.generateUpdateProcurementInfo(information);
    }

    public List<ProcurementInformation> selectProcurementByProcurementId(ProcurementInformation procurementInformation) {
        return procurementInformationDao.selectProcurementByProcurementId(procurementInformation);
    }
}
