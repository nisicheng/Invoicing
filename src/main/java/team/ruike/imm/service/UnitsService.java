package team.ruike.imm.service;

import team.ruike.imm.entity.Units;

import java.util.List;

/**
 * 闫琛昊
 */
public interface UnitsService {
    /**
     * 查询指定条件单位信息
     * @param units
     * @return
     */
    public List<Units> selectUnits(Units units);

    /**
     * 修改指定条件单位信息
     * @param units
     * @return
     */
    public int updateUnits(Units units);

    /**
     * 新增单位信息
     * @param units
     * @return
     */
    public int insertUnits(Units units);
}
