package team.ruike.imm.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import team.ruike.imm.dao.RolePermissionsDao;
import team.ruike.imm.entity.RolePermissions;

import java.util.List;

@Service("RolePermissionsService")
public class RolePermissionsServiceImpl  implements RolePermissionsDao{
    @Autowired
    RolePermissionsDao rolePermissionsDao;

    public RolePermissionsDao getRolePermissionsDao() {
        return rolePermissionsDao;
    }

    public void setRolePermissionsDao(RolePermissionsDao rolePermissionsDao) {
        this.rolePermissionsDao = rolePermissionsDao;
    }

    public List<RolePermissions> selectRolePermissions(RolePermissions rolePermissions) {
        return rolePermissionsDao.selectRolePermissions(rolePermissions);
    }

    public int updateRolePermissions(RolePermissions rolePermissions) {
        return rolePermissionsDao.updateRolePermissions(rolePermissions);
    }

    public int insertRolePermissions(RolePermissions rolePermissions) {
        return rolePermissionsDao.insertRolePermissions(rolePermissions);
    }

    public List<RolePermissions> PagerRolePermissions(RolePermissions rolePermissions) {
        return null;
    }
}
