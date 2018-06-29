package team.ruike.imm.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import team.ruike.imm.dao.MerchandiseDao;
import team.ruike.imm.entity.Employee;
import team.ruike.imm.entity.Merchandise;
import team.ruike.imm.service.MerchandiseService;
import team.ruike.imm.utility.Pages;

import java.util.List;

@Service("merchandiseService")
public class MerchandiseServiceImpl   implements MerchandiseService{
    @Autowired
    MerchandiseDao merchandiseDao;

    public MerchandiseDao getMerchandiseDao() {
        return merchandiseDao;
    }

    public void setMerchandiseDao(MerchandiseDao merchandiseDao) {
        this.merchandiseDao = merchandiseDao;
    }

    public List<Merchandise> sanMerchandise(Merchandise merchandise) {
        return merchandiseDao.sanMerchandise(merchandise);
    }

    public int sumstock() {
        return merchandiseDao.sumstock();
    }

    public List<Merchandise> selectMerchandise(Merchandise merchandise) {
        List<Merchandise> list=merchandiseDao.selecrMerchandise(merchandise);
        return list;
    }
    //根据id 查询一个类
    public Merchandise selectOne(Merchandise merchandise){
        List<Merchandise> list=merchandiseDao.selectAll(merchandise);
        if(null!=list){
            return list.get(0);
        }else {
            return  new Merchandise();
        }
    }
    public List<Merchandise> selectRelenish(Merchandise merchandise) {
        return merchandiseDao.selectRelenish(merchandise);
    }
    public int noncooperation(List<Merchandise> merchandise) {
        return merchandiseDao.noncooperation(merchandise);
    }
    public int cooperative(List<Merchandise> merchandise) {
        return merchandiseDao.cooperative(merchandise);
    }
    int pageSize=4;
    public List<Merchandise> pagerMerchandise(Merchandise merchandise) {
        merchandise.setPageSize(pageSize);
        if (merchandise.getCurrentPage()>1){
            merchandise.setCurrentPage((merchandise.getCurrentPage()-1)*pageSize);
        }else {
            merchandise.setCurrentPage(0);
        }
        List<Merchandise> count=merchandiseDao.pagerMerchandise(merchandise);
        return count;
    }
    public Pages<Merchandise> getPager(Merchandise merchandise, Integer currentPage) {
        List<Merchandise> count=null;
        Merchandise e=new Merchandise();
        int i=0;
        if(merchandise.getMerchandiseName()!=null
                && merchandise.getMerchandiseName()!=""
                || merchandise.getUnitsId()>0 ||  merchandise.getUnitsId()!=null
                || merchandise.getProductTypeId()>0 || merchandise.getProductTypeId()!=null
                || merchandise.getSalesStatusId()>0 || merchandise.getSalesStatusId()!=null){
            count=merchandiseDao.pagerMerchandise(merchandise);
            i=merchandiseDao.count(merchandise);
        }else {
            e.setMerchandiseState(merchandise.getMerchandiseState());
            count=merchandiseDao.pagerMerchandise(e);
            i=merchandiseDao.count(e);
        }
        Pages<Merchandise> pages=new Pages<Merchandise>();
        pages.setCurrentPage(currentPage);
        pages.setList(count);
        pages.setTotalRecord(i);
        pages.setPageSize(pageSize);
        return pages;
    }

    public int insufficient(List<Merchandise> merchandise) {
        return merchandiseDao.insufficient(merchandise);
    }

    public List<Merchandise> insufficientMerchandise(Merchandise merchandise) {
        return merchandiseDao.insufficientMerchandise(merchandise);
    }

    public List<Merchandise> selectAll(Merchandise merchandise) {
        return merchandiseDao.selectAll(merchandise);
    }
    public int updateMerchandise(Merchandise merchandise) {
        return merchandiseDao.updateMerchandise(merchandise);
    }
    public int insertMerchandise(Merchandise merchandise) {
        return merchandiseDao.insertMerchandise(merchandise);
    }


}
