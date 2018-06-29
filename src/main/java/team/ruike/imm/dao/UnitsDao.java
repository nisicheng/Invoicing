package team.ruike.imm.dao;

import team.ruike.imm.entity.Units;

import java.util.List;

/**
 * @author 闫琛昊
 * @version 1.0
 *单位信息
 */
public interface UnitsDao {
    /**
     * 指定条件查询单位信息
     * @param units 单位信息
     * @return
     */
    public List<Units> selectUnits(Units units);

    /**
     * 指定条件修改单位信息
     * @param units 单位信息
     * @return
     */
    public int updateUnits(Units units);

    /**
     * 新增单位信息
     * @param units 单位信息
     * @return
     */
    public int insertUnits(Units units);
    /**
     * 分页
     * @return
     */
    public List<Units> PagerUnits(Units units);
}
