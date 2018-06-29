package team.ruike.imm.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import team.ruike.imm.dao.StorageMoveDao;
import team.ruike.imm.entity.StorageMove;
import team.ruike.imm.service.StorageMoveService;

import java.util.List;

@Service("StorageMoveService")
public class StorageMoveServiceImpl implements StorageMoveService{
    @Autowired
    StorageMoveDao storageMoveDao;

    public StorageMoveDao getStorageMoveDao() {
        return storageMoveDao;
    }

    public void setStorageMoveDao(StorageMoveDao storageMoveDao) {
        this.storageMoveDao = storageMoveDao;
    }

    public List<StorageMove> selectStorageMove(StorageMove storageMove) {
        return storageMoveDao.selectStorageMove(storageMove);
    }
    public int updateStorageMove(StorageMove storageMove) {
        return storageMoveDao.updateStorageMove(storageMove);
    }

    public int insertStorageMove(StorageMove storageMove) {
        return storageMoveDao.insertStorageMove(storageMove);
    }
}
