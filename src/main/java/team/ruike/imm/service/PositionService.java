package team.ruike.imm.service;

import team.ruike.imm.entity.Position;

import java.util.List;

/**
 * 闫琛昊
 */
public interface PositionService {
    /**
     * 按指定条件查询职位信息
     * @param position
     * @return
     */
    public List<Position> selectPosition(Position position);

    /**
     * 按指定条件修改职位信息
     * @param position
     * @return
     */
    public int updatePosition(Position position);

    /**
     * 新增职位信息
     * @param position
     * @return
     */
    public int insertPosition(Position position);
}
