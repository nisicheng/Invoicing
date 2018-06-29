package team.ruike.imm.dao;

import team.ruike.imm.entity.Procurement;

import java.util.List;
/**
 * @author 索志文
 * @version 1.0
 */
public interface ProcurementDao {
    /**
     * 指定条件查询采购订单
     * @param procurement 采购订单
     * @return
     */
    public List<Procurement> selecrProcurement(Procurement procurement);
    List<Procurement> selectAll(Procurement procurement);
    List<Procurement> selectll(Procurement procurement);
    List<Procurement> procurementSize();
    //查询所有购货订单和购货详情订单
    List<Procurement> selectAllProcureMent(Procurement procurement);
    /**
     * 指定条件修改采购订单
     * @param procurement
     * @return
     */
    public int updateProcurement(Procurement procurement);


    /**
     * 添加采购订单
     * @param procurement
     * @return
     */
    public int insertProcurement(Procurement procurement);
    /**
     * 分页
     * @return
     */
    public List<Procurement> PagerProcurement(Procurement procurement);
    //批量修改购货订单
    int generateUpdateProcurement(List<Procurement> procurements);


}
