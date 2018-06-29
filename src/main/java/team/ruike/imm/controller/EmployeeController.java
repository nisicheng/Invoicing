package team.ruike.imm.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.TypeReference;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import team.ruike.imm.entity.Employee;
import team.ruike.imm.entity.Position;
import team.ruike.imm.service.EmployeeService;
import team.ruike.imm.service.PositionService;
import team.ruike.imm.utility.Pages;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

@RequestMapping(value = "employee")
@Controller
public class EmployeeController {

    @Autowired
    EmployeeService employeeService;
    @Autowired
    PositionService positionService;

    //展示在职员工数据
    @RequestMapping(value="/cooperative.do")
    public  String cooperative(HttpServletRequest request, HttpSession session, Integer currentPage, Employee employee){
        employee.setEmployeeState(0);
            session.setAttribute("name",employee.getEmployeeName());
        if (currentPage==null ){
            employee.setCurrentPage(1);
            currentPage=1;
        }else {
            employee.setCurrentPage(currentPage);
        }
        List<Employee> e=employeeService.pagerEmployee(employee);
        request.setAttribute("cooperative",e);
        Pages<Employee> pages=employeeService.getPager(employee,currentPage);
        request.setAttribute("pages",pages);
        List<Position> positions=positionService.selectPosition(null);
        request.setAttribute("positions",positions);
        int i=0;
        request.setAttribute("i",i);
        return "page/material/staff-list-4";
    }

    /**
     * 展示不在职员工的数据
     * @param request
     * @param currentPage
     * @param employee
     * @return
     */
    @RequestMapping(value="/noncooperation.do")
    public  String noncooperation(HttpServletRequest request, HttpSession session,Integer currentPage,Employee employee){
        employee.setEmployeeState(1);

        if (currentPage==null ){
            employee.setCurrentPage(1);
            currentPage=1;
        }else {
            employee.setCurrentPage(currentPage);
        }
        List<Employee> employees=employeeService.pagerEmployee(employee);
        request.setAttribute("noncooperation",employees);
        Pages<Employee> pages=employeeService.getPager(employee,currentPage);
        request.setAttribute("pages",pages);
        List<Position> positions=positionService.selectPosition(null);
        request.setAttribute("positions",positions);
        int i=1;
        request.setAttribute("i",i);
        session.setAttribute("nonname",employee.getEmployeeName());
        return "page/material/staff-list-4";
    }

    /**
     * 修改为离职员工
     * @param noncooperation
     * @param printWriter
     */
    @RequestMapping("/noncooperationEmployee.do")
    public void noncooperationEmployee(String noncooperation,PrintWriter printWriter){
        int i=0;
        ArrayList<Employee> supplierArrayList =  JSON.parseObject(noncooperation, new TypeReference<ArrayList<Employee>>(){});
        i= employeeService.noncooperation(supplierArrayList);
        if(i>0){
            String jsonString = JSON.toJSONString(1);
            printWriter.write(jsonString);
        }
        printWriter.flush();
        printWriter.close();
    }
    /**
     * 修改为在职员工
     * @param cooperative
     * @param printWriter
     */
    @RequestMapping("/cooperativeEmployee.do")
    public void cooperativeEmployee(String cooperative,PrintWriter printWriter){
        int i=0;
        ArrayList<Employee> supplierArrayList =  JSON.parseObject(cooperative, new TypeReference<ArrayList<Employee>>(){});
        i= employeeService.cooperative(supplierArrayList);
        if(i>0){
            //返回值
            String jsonString = JSON.toJSONString(1);
            printWriter.write(jsonString);
        }
        printWriter.flush();
        printWriter.close();
    }

    /**
     * 获取要修改的用户信息
     * @param employee
     * @param printWriter
     */
    @RequestMapping(value = "/EmployeeId.do")
    public void EmployeeId(Employee employee,PrintWriter printWriter){
        List<Employee> suppliers=employeeService.selectEmployee(employee);
        if (suppliers.size()>0){
            String jsonString = JSON.toJSONString(suppliers);
            printWriter.write(jsonString);
        }
        printWriter.flush();
        printWriter.close();
    }

    /**
     * 修改用户信息
     * @param employee
     * @param printWriter
     */
    @RequestMapping(value = "/updateEmployee.do")
    public  void updateEmployee(Employee employee,PrintWriter printWriter){
        int i=0;
        i = employeeService.updateEmployee(employee);
        if(i>0) {
            String jsonString = JSON.toJSONString(1);
            printWriter.write(jsonString);
        }
        printWriter.flush();
        printWriter.close();
    }


    /**
     * 添加用户信息
     * @return
     */
    @RequestMapping("/addEmployee.do")
    public void addEmployee(Employee employee,PrintWriter printWriter){
        int i = employeeService.insertEmployee(employee);
        if(i>0) {
            String jsonString = JSON.toJSONString(1);
            printWriter.write(jsonString);
        }
        printWriter.flush();
        printWriter.close();
    }
}
