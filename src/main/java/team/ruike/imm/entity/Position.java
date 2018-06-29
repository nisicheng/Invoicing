package team.ruike.imm.entity;

import team.ruike.imm.utility.PagerParameter;

import java.io.Serializable;
import java.util.List;

/**
 *　@author 索志文
 *　@versrion 2.0
 * 职位信息
 */
public class Position extends PagerParameter implements Serializable{
    /**
     * 职位编号
     */
    private Integer positionId;
    /**
     * 职位名称
     */
    private String positionName;
    /**
     * 员工信息
     */
    private List<Employee> Employee;
    /**
     * 是否已删除
     */
    private  Integer positionState;

    public Integer getPositionId() {
        return positionId;
    }

    public void setPositionId(Integer positionId) {
        this.positionId = positionId;
    }

    public String getPositionName() {
        return positionName;
    }

    public void setPositionName(String positionName) {
        this.positionName = positionName;
    }

    public List<team.ruike.imm.entity.Employee> getEmployee() {
        return Employee;
    }

    public void setEmployee(List<team.ruike.imm.entity.Employee> employee) {
        Employee = employee;
    }

    public Integer getPositionState() {
        return positionState;
    }

    public void setPositionState(Integer positionState) {
        this.positionState = positionState;
    }
}
