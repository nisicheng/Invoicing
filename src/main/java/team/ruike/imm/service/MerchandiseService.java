package team.ruike.imm.service;

import team.ruike.imm.entity.Merchandise;
import team.ruike.imm.utility.Pages;

import java.util.List;

/**
 * 闫琛昊
 */
public interface MerchandiseService {
    /**
     * 获取在售商品库存小于安全库存的有几种
     * @return
     */
    int sumstock();
    /**
     * 按指定条件查询商品信息
     * @param merchandise
     * @return
     */
    List<Merchandise> selectMerchandise(Merchandise merchandise);
    List<Merchandise> selectAll(Merchandise merchandise);

    /**
     * 查询
     * @param merchandise
     * @return
     */
    Merchandise selectOne(Merchandise merchandise);

    /**
     * 按关键字查询
     * @param merchandise
     * @return
     */
    List<Merchandise> sanMerchandise(Merchandise merchandise);
    /**
     * 按指定条件修改商品信息
     * @param merchandise
     * @return
     */
    int updateMerchandise(Merchandise merchandise);

    /**
     * 新增商品信息
     * @param merchandise
     * @return
     */
    int insertMerchandise(Merchandise merchandise);
    //查询当前库存小于安全库存
    List<Merchandise> selectRelenish(Merchandise merchandise);


    /**
     * 批量修改
     * @return
     */
    public int noncooperation(List<Merchandise> merchandise);
    public int cooperative(List<Merchandise> merchandise);
    /**
     * 分页
     * @param
     * @return
     */
    public List<Merchandise> pagerMerchandise(Merchandise merchandise);
    /**
     * 入参分页类
     * @param
     * @return
     */
    public Pages<Merchandise> getPager(Merchandise merchandise, Integer currentPage);


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
