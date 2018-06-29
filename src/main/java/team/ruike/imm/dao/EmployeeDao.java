package team.ruike.imm.dao;

import team.ruike.imm.entity.Employee;

import java.util.List;
/**
 * @author 索志文
 * @version 1.0
 */
public interface EmployeeDao {
    /**
     * 指定条件查询员工信息
     * @param employee 员工信息
     * @return
     */
     List<Employee> selectEmployee(Employee employee);

    int count(Employee employee);
    /**
     *指定条件修改员工信息
     * @param employee
     * @return099
     */
     int updateEmployee(Employee employee);

    /**
     *增加员工信息
     * @param employee
     * @return
     */
     int insertEmployee(Employee employee);
    /**
     * 分页
     * @return
     */
     List<Employee> pages(Employee employee);

     int noncooperation(List<Employee> employee);
     int cooperative(List<Employee> employee);
}
