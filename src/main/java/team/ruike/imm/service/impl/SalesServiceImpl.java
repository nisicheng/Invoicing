package team.ruike.imm.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import team.ruike.imm.dao.SalesDao;
import team.ruike.imm.entity.Sales;
import team.ruike.imm.utility.RandomUtil;
import team.ruike.imm.service.SalesService;

import java.util.List;

@Service("salesService")
public class SalesServiceImpl  implements SalesService{
    @Autowired
    SalesDao salesDao;

    public SalesDao getSalesDao() {
        return salesDao;
    }

    public void setSalesDao(SalesDao salesDao) {
        this.salesDao = salesDao;
    }

    public List<Sales> selectSales(Sales sales) {
        return salesDao.selectSales(sales);
    }

    public String salesId() {
        String aa="XS";
        List<Sales> list= selectSales(null);
        aa+= RandomUtil.getRandomFileName();
        String size=String.valueOf(list.size()+1) ;
        if(size.length()==1){
            size="00"+size;
        }else if(size.length()==2){
            size="0"+size;
        }
        aa+=size;
        return aa;
    }

    public int updateSales(Sales sales) {
        return salesDao.updateSales(sales);
    }

    public int insertSales(Sales sales) {
        return salesDao.insertSales(sales);
    }

    public int insertSalesForPu(Sales sales) { return salesDao.insertSalesForPu(sales); }

    public List<Sales> selectSalesForOrder(Sales sales) { return salesDao.selectSalesForOrder(sales); }

    public List<Sales> selectSalesForThis(Sales sales) {
        return salesDao.selectSalesForThis(sales);
    }

    public List<Sales> selectSalesForThisToAll(Sales sales) { return salesDao.selectSalesForThisToAll(sales); }

    public List<Sales> selectSalesForProfit(Sales sales) { return salesDao.selectSalesForProfit(sales); }


    public List<Sales> selectForMonth(Sales sales) { return salesDao.selectForMonth(sales); }

    public int selectSalses(Sales sales) {
        return salesDao.selectSalses(sales);
    }
}
