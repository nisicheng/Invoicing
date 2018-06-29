package team.ruike.imm.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import team.ruike.imm.dao.PermissionsDao;
import team.ruike.imm.entity.Permissions;
import team.ruike.imm.service.PermissionsService;

import java.util.List;

@Service("PermissionsService")
public class PermissionsServiceImpl implements PermissionsService {
    @Autowired
    PermissionsDao permissionsDao;

    public PermissionsDao getPermissionsDao() {
        return permissionsDao;
    }

    public void setPermissionsDao(PermissionsDao permissionsDao) {
        this.permissionsDao = permissionsDao;
    }

    public List<Permissions> selectPermissions(Permissions permissions) {
        return null;
    }

    public int updatePermissions(Permissions permissions) {
        return 0;
    }

    public int insertPermissions(Permissions permissions) {
        return 0;
    }
}
