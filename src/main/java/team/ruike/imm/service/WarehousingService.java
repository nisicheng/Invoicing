package team.ruike.imm.service;

import team.ruike.imm.entity.Warehousing;

import java.util.List;

/**
 * 闫琛昊
 */
public interface WarehousingService {
    /**
     * 查询指定条件的入库记录信息
     * @param warehousing
     * @return
     */
    public List<Warehousing> selectWarehousing(Warehousing warehousing);

    /**
     * 指定条件修改入库记录信息
     * @param warehousing
     * @return
     */
    public int updateWarehousing(Warehousing warehousing);

    /**
     * 添加入库记录信息
     * @param warehousing
     * @return
     */
    public int insertWarehousing(Warehousing warehousing);
}
