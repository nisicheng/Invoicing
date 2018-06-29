package team.ruike.imm.dao;
import team.ruike.imm.entity.Position;
import java.util.List;
/**
 * @author 索志文
 * @version 1.0
 */
public interface PositionDao {
    /**
     * 指定条件查询职位信息
     * @param position 职位信息
     * @return
     */
    public List<Position> selecrPosition(Position position);

    /**
     * 指定条件修改职位信息
     * @param position
     * @return
     */
    public int updatePosition(Position position);

    /**
     * 添加职位信息
     * @param position
     * @return
     */
    public int insertPosition(Position position);
    /**
     * 分页
     * @return
     */
    public List<Position> PagerPosition(Position position);
}
