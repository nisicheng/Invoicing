package team.ruike.imm.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import team.ruike.imm.dao.ProcurementDao;
import team.ruike.imm.entity.Procurement;
import team.ruike.imm.utility.RandomUtil;
import team.ruike.imm.service.ProcurementService;

import java.util.List;

@Service("ProcurementService")
public class ProcurementServiceImpl implements ProcurementService {
    @Autowired
    ProcurementDao procurementDao;

    public ProcurementDao getProcurementDao() {
        return procurementDao;
    }

    public void setProcurementDao(ProcurementDao procurementDao) {
        this.procurementDao = procurementDao;
    }

    public List<Procurement> selectProcurement(Procurement procurement) {
        List<Procurement> list = procurementDao.selectAll(procurement);
        return list;
    }
    public List<Procurement> selectll(Procurement procurement) {
        List<Procurement> list = procurementDao.selectll(procurement);
        return list;
    }
    //生成购货订单ID
    public String purchaseId(String param) {
        List<Procurement> list=null;
        String aa = param;
        if(aa.equals("GHDD")){
            list = selectProcurement(null);
        }else {
            list=selectll(null);
        }
        aa += RandomUtil.getRandomFileName();
        String size = String.valueOf(list.size() + 1);
        if (size.length() == 1) {
            size = "00" + size;
        } else if (size.length() == 2) {
            size = "0" + size;
        }
        aa += size;
        return aa;
    }

    public int updateProcurement(Procurement procurement) {
        return procurementDao.updateProcurement(procurement);
    }

    public int insertProcurement(Procurement procurement) {
        return procurementDao.insertProcurement(procurement);
    }

    public int generateUpdateProcurement(List<Procurement> procurements) {
        return procurementDao.generateUpdateProcurement(procurements);
    }
    public List<Procurement> procurementSize(){
        return procurementDao.procurementSize();
    }

}
