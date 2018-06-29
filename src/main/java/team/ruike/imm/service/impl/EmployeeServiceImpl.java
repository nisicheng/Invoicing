package team.ruike.imm.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import team.ruike.imm.dao.EmployeeDao;
import team.ruike.imm.entity.Employee;
import team.ruike.imm.service.EmployeeService;
import team.ruike.imm.utility.Pages;

import java.util.List;


@Service("employeeService")
public class EmployeeServiceImpl implements EmployeeService{
    @Autowired
    EmployeeDao employeeDao;
    int pageSize=4;
    /**
     *  分页查询数据库
     * @param employee
     * @return
     */
    public List<Employee> pagerEmployee(Employee employee) {
        employee.setPageSize(pageSize);
        if (employee.getCurrentPage()>1){
            employee.setCurrentPage((employee.getCurrentPage()-1)*pageSize);
        }else {
            employee.setCurrentPage(0);
        }
        List<Employee> count=employeeDao.pages(employee);
        return count;
    }
    /**
     * 分页类入参
     * @param employee
     * @return
     */
    public Pages<Employee> getPager(Employee employee, Integer currentPage) {
        List<Employee> count=null;
        Employee e=new Employee();
        int i=0;
        if(employee.getEmployeeName()!=null && employee.getEmployeeName()!=""){
            count=employeeDao.pages(employee);
            i=employeeDao.count(employee);
        }else {
            e.setEmployeeState(employee.getEmployeeState());
            count=employeeDao.pages(e);
            i=employeeDao.count(e);
        }
        Pages<Employee> pages=new Pages<Employee>();
        pages.setCurrentPage(currentPage);
        pages.setList(count);
        pages.setTotalRecord(i);
        pages.setPageSize(pageSize);
        return pages;
    }
    public List<Employee> selectEmployee(Employee employee){
        return employeeDao.selectEmployee(employee);
    }
    public int updateEmployee(Employee employee){
        return employeeDao.updateEmployee(employee);
    }
    public int insertEmployee(Employee employee) {
        return  employeeDao.insertEmployee(employee);
    }

    public int noncooperation(List<Employee> employee) {
        return employeeDao.noncooperation(employee);
    }
    public int cooperative(List<Employee> employee) {
        return employeeDao.cooperative(employee);
    }
}
