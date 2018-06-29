package team.ruike.imm.service;

import team.ruike.imm.entity.Permissions;

import java.util.List;

/**
 * 闫琛昊
 */
public interface PermissionsService {
    /**
     * 按指定条件查询权限
     * @param permissions
     * @return
     */
    public List<Permissions> selectPermissions(Permissions permissions);

    /**
     * 按指定条件修改权限
     * @param permissions
     * @return
     */
    public int updatePermissions(Permissions permissions);

    /**
     * 新增权限
     * @param permissions
     * @return
     */
    public int insertPermissions(Permissions permissions);
}