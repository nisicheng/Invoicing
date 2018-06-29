package team.ruike.imm.entity;

import team.ruike.imm.utility.PagerParameter;

import java.io.Serializable;

/**
 *　@author 索志文
 *　@versrion 1.0
 * 权限
 */
public class Permissions extends PagerParameter implements Serializable{
    /**
     * 权限编号
     */
    private Integer permissionsId;
    /**
     * 权限名字
     */
    private String permissionsName;

    public Integer getPermissionsId() {
        return permissionsId;
    }

    public void setPermissionsId(Integer permissionsId) {
        this.permissionsId = permissionsId;
    }

    public String getPermissionsName() {
        return permissionsName;
    }

    public void setPermissionsName(String permissionsName) {
        this.permissionsName = permissionsName;
    }
}
