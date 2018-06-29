package team.ruike.imm.dao;

import team.ruike.imm.entity.Permissions;

import java.util.List;
/**
 * @author 索志文
 * @version 1.0
 */
public interface PermissionsDao {
    /**
     * 指定条件权限
     * @param permissions 权限信息
     * @return
     */
    public List<Permissions> selecrPermissions(Permissions permissions);

    /**
     *指定条件修改权限信息
     * @param permissions
     * @return
     */
    public int updatePermissions(Permissions permissions);

    /**
     *增加权限
     * @param permissions
     * @return
     */
    public int insertPermissions(Permissions permissions);
    /**
     * 分页
     * @return
     */
    public List<Permissions> PagerPermissions(Permissions permissions);
}
