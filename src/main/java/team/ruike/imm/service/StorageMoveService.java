package team.ruike.imm.service;

import team.ruike.imm.entity.StorageMove;

import java.util.List;

/**
 * 闫琛昊
 */
public interface StorageMoveService {
    /**
     *  按指定条件查询出库记录信息
     * @param storageMove
     * @return
     */
    public List<StorageMove> selectStorageMove(StorageMove storageMove);

    /**
     *  按指定条件修改出库记录信息
     * @param storageMove
     * @return
     */
    public int updateStorageMove(StorageMove storageMove);

    /**
     * 新增出库记录信息
     * @param storageMove
     * @return
     */
    public int insertStorageMove(StorageMove storageMove);
}
