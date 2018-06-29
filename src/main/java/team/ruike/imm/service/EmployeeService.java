package team.ruike.imm.service;

import team.ruike.imm.entity.Employee;
import team.ruike.imm.utility.Pages;

import java.util.List;

/**
 * 闫琛昊
 */
public interface EmployeeService {


    /**
     * 分页
     * @param
     * @return
     */
    public List<Employee> pagerEmployee(Employee employee);
    /**
     * 入参分页类
     * @param
     * @return
     */
    public Pages<Employee> getPager(Employee employee, Integer currentPage);
    /**
     * 按指定条件查询员工信息
     * @param employee
     * @return
     */
    public List<Employee> selectEmployee(Employee employee);
    /**
     * 按指定条件修改员工信息
     * @param employee
     * @return
     */
    public int updateEmployee(Employee employee);

    /**
     * 新增员工信息
     * @param employee
     * @return
     */
    public int insertEmployee(Employee employee);

    public int noncooperation(List<Employee> employee);
    public int cooperative(List<Employee> employee);
}
