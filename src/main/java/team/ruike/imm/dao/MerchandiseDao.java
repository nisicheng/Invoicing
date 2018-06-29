package team.ruike.imm.dao;

import team.ruike.imm.entity.Merchandise;

import java.util.List;

/**
 * @author 索志文
 * @version 1.0
 */
public interface MerchandiseDao {

    int sumstock();

    List<Merchandise> selectAll(Merchandise merchandise);
    //查询当前库存小于安全库存
    List<Merchandise> selectRelenish(Merchandise merchandise);
    /**
     * 按关键字查询出多个
     */
    List<Merchandise> sanMerchandise(Merchandise merchandise);

    /**
     *指定条件修改商品信息
     */
    int updateMerchandise(Merchandise merchandise);

    /**
     *增加商品信息
     */
    int insertMerchandise(Merchandise merchandise);


    List<Merchandise> selecrMerchandise(Merchandise merchandise);
    /**
     * 分页
     * @return
     */
    List<Merchandise> Merchandise(Merchandise merchandise);


    int count(Merchandise merchandise);
    List<Merchandise> pagerMerchandise(Merchandise merchandise);
    int noncooperation(List<Merchandise> merchandise);
    int cooperative(List<Merchandise> merchandise);

    /**
     * 修改为缺货
     * @param merchandise
     * @return
     */
    int insufficient(List<Merchandise> merchandise);

    /**
     * 查询当前库存小于安全库存并且 缺货状态没有修改的
     * @param merchandise
     * @return
     */
    List<Merchandise> insufficientMerchandise(Merchandise merchandise);
}
