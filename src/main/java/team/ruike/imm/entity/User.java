package team.ruike.imm.entity;
import java.io.Serializable;
import java.util.List;

/**
 * @author 闫琛昊
 * @version 2.0
 *用户信息
 */
public class User  implements Serializable{
    /**
     * 用户编号
     */
    private Integer userId;
    private  String role;

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    /**
     * 用户名称
     */
    private String userName;
    /**
     * 用户密码
     */
    private String userPassword;
    /**
     * 员工编号
     */
    private Integer employeeId;
    /**
     * 员工信息集合
     */
    private Employee employee;
    /**
     * 角色权限表
     */
    private List<RolePermissions> rolePermissions;
    /**
     * 当前和删除
     */
    private  Integer userState;
    public User(){
    }
    /**
     * 构造函数用于批量添加
     * @param userName
     * @param userPassword
     */
    public User(String userName,String userPassword){
        this.userName=userName;
        this.userPassword=userPassword;
    }


    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

    public Integer getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Integer employeeId) {
        this.employeeId = employeeId;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public List<RolePermissions> getRolePermissions() {
        return rolePermissions;
    }

    public void setRolePermissions(List<RolePermissions> rolePermissions) {
        this.rolePermissions = rolePermissions;
    }

    public Integer getUserState() {
        return userState;
    }

    public void setUserState(Integer userState) {
        this.userState = userState;
    }

//    public Integer getCurrentPage() {
//        return currentPage;
//    }
//
//    public void setCurrentPage(Integer currentPage) {
//        this.currentPage = currentPage;
//    }
//
//    public Integer getPageSize() {
//        return pageSize;
//    }
//
//    public void setPageSize(Integer pageSize) {
//        this.pageSize = pageSize;
//    }
}
