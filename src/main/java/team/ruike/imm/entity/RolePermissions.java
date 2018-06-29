package team.ruike.imm.entity;

import team.ruike.imm.utility.PagerParameter;

import java.io.Serializable;

/**
 * @author 闫琛昊
 * @version 1.0
 *角色权限
 */
public class RolePermissions extends PagerParameter implements Serializable{
    /**
     * 编号
     */
    private Integer roleId;

    /**
     * 用户编号
     */
    private Integer userId;
    /**
     * 权限编号
     */
    private Integer permissionsId;

    /**
     * 是否赋予
     */
    private Integer roleGive;
    /**
     * 用户信息
     */
    private User user;
    /**
     * 权限信息
     */
    private Permissions permissions;

    public Integer getRoleId() {
        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getPermissionsId() {
        return permissionsId;
    }

    public void setPermissionsId(Integer permissionsId) {
        this.permissionsId = permissionsId;
    }

    public Integer getRoleGive() {
        return roleGive;
    }

    public void setRoleGive(Integer roleGive) {
        this.roleGive = roleGive;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Permissions getPermissions() {
        return permissions;
    }

    public void setPermissions(Permissions permissions) {
        this.permissions = permissions;
    }
}
