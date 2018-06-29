package team.ruike.imm.utility;

import java.io.Serializable;

public class PagerParameter implements Serializable{

    //当前第几页
    private Integer currentPage;
    //每页记录数
    private Integer pageSize;

    public Integer getCurrentPage() {
        return currentPage;
    }

    public void setCurrentPage(Integer currentPage) {
        this.currentPage = currentPage;
    }

    public Integer getPageSize() {
        return pageSize;
    }

    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }
}
