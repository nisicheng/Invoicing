package team.ruike.imm.dao;

import team.ruike.imm.entity.StorageMove;

import java.util.List;

/**
 * @author 闫琛昊
 * @version 1.0
 *出库记录
 */
public interface StorageMoveDao {
    /**
     * 指定条件查询出库记录
     * @param storageMove 出库记录
     * @return
     */
    public List<StorageMove> selectStorageMove(StorageMove storageMove);

    /**
     * 指定条件修改出库记录
     * @param storageMove 出库记录
     * @return
     */
    public int updateStorageMove(StorageMove storageMove);

    /**
     * 新增出库记录
     * @param storageMove 出库记录
     * @return
     */
    public int insertStorageMove(StorageMove storageMove);
    /**
     * 分页
     * @return
     */
    public List<StorageMove> PagerStorageMove(StorageMove storageMove);
}
