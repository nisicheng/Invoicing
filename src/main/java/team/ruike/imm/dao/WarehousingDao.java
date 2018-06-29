package team.ruike.imm.dao;

import team.ruike.imm.entity.Warehousing;

import java.util.List;

/**
 * @author 闫琛昊
 * @version 1.0
 *入库记录
 */
public interface WarehousingDao {
    /**
     * 指定条件查询入库记录信息
     * @param warehousing 入库记录信息
     * @return
     */
    public List<Warehousing> selectWarehousing(Warehousing warehousing);

    /**
     * 指定条件修改入库记录信息
     * @param warehousing 入库记录信息
     * @return
     */
    public int updateWarehousing(Warehousing warehousing);

    /**
     * 增加入库记录信息
     * @param warehousing 入库记录信息
     * @return
     */
    public int insertWarehousing(Warehousing warehousing);

    /**
     * 分页
     * @return
     */
    public List<Warehousing> PagerWarehousing(Warehousing warehousing);
}
