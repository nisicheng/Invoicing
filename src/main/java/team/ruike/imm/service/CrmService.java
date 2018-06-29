package team.ruike.imm.service;

import team.ruike.imm.entity.Crm;

import java.util.List;

public interface CrmService {
    /**
     * 指定条件查询客户关系维护记录信息
     * @param crm 客户关系维护记录信息
     * @return
     */
    public List<Crm> selecrCrm(Crm crm);

    /**
     *指定条件修改客户关系维护记录
     * @param crm
     * @return
     */
    public int updateCrm(Crm crm);

    /**
     *增加客户关系维护记录
     * @param crm
     * @return
     */
    public int insertCrm(Crm crm);

}
