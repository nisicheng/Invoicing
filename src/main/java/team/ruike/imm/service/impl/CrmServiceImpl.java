package team.ruike.imm.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import team.ruike.imm.dao.CrmDao;
import team.ruike.imm.entity.Crm;
import team.ruike.imm.service.CrmService;

import java.util.List;

@Service("crmService")
public class CrmServiceImpl implements CrmService {
    @Autowired
    private CrmDao crmDao;

    public CrmDao getCrmDao() { return crmDao; }
    public void setCrmDao(CrmDao crmDao) { this.crmDao = crmDao; }


    public List<Crm> selecrCrm(Crm crm) {
        System.out.println(crm.getEmployeeId()+"/CrmServiceImpl");
        List<Crm> clients = crmDao.selecrCrm(crm);
        return clients;
    }

    public int updateCrm(Crm crm) {
        return 0;
    }

    public int insertCrm(Crm crm) {
        return 0;
    }
}
