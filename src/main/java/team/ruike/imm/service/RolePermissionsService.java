package team.ruike.imm.service;

import team.ruike.imm.entity.RolePermissions;

import java.util.List;

/**
 * 闫琛昊
 */
public interface RolePermissionsService {
    /**
     * 按指定条件查询角色权限
     * @param rolePermissions
     * @return
     */
    public List<RolePermissions> selectRolePermissions(RolePermissions rolePermissions);

    /**
     * 按指定条件修改角色权限
     * @param rolePermissions
     * @return
     */
    public int updateRolePermissions(RolePermissions rolePermissions);

    /**
     * 新增角色权限
     * @param rolePermissions
     * @return
     */
    public int insertRolePermissions(RolePermissions rolePermissions);
}
