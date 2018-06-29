package team.ruike.imm.dao;

import team.ruike.imm.entity.Crm;

import java.util.List;
/**
 * @author 索志文
 * @version 1.0
 */
public interface CrmDao {
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
    /**
     * 分页
     * @return
     */
    public List<Crm> PagerCrm(Crm crm);
}
