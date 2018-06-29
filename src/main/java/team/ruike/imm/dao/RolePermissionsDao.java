package team.ruike.imm.dao;

import team.ruike.imm.entity.RolePermissions;

import java.util.List;

/**
 * @author 闫琛昊
 * @version 1.0
 * 角色权限
 */
public interface RolePermissionsDao {
    /**
     * 指定条件查询角色权限
     * @param rolePermissions RolePermissions
     * @return
     */
    public List<RolePermissions> selectRolePermissions(RolePermissions rolePermissions);

    /**
     * 指定条件修改角色权限
     * @param rolePermissions
     * @return
     */
    public int updateRolePermissions(RolePermissions rolePermissions);

    /**
     * 新增角色权限
     * @param rolePermissions
     * @return
     */
    public  int insertRolePermissions(RolePermissions rolePermissions);

    /**
     * 分页
     * @return
     */
    public List<RolePermissions> PagerRolePermissions(RolePermissions rolePermissions);
}
