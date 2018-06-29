package team.ruike.imm.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.TypeReference;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import team.ruike.imm.entity.Merchandise;
import team.ruike.imm.entity.ProductType;
import team.ruike.imm.entity.SalesStatus;
import team.ruike.imm.entity.Units;
import team.ruike.imm.service.MerchandiseService;
import team.ruike.imm.service.ProductTypeService;
import team.ruike.imm.service.SalesStatusService;
import team.ruike.imm.service.UnitsService;
import team.ruike.imm.utility.Pages;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("merchandise")
public class MerchandiseController {
    @Autowired
    MerchandiseService merchandiseService;
    @Autowired
    UnitsService unitsService;
    @Autowired
    ProductTypeService productTypeService;
    @Autowired
    SalesStatusService salesStatusService;

    /**
     * 查询商品信息
     */
    @RequestMapping(value = "/smerchandise.do")
    public String select(Merchandise merchandise, HttpSession session){
        List<Merchandise> merchandises = merchandiseService.selectMerchandise(merchandise);
        ; List<Units> unitses = unitsService.selectUnits(null);
        List<ProductType> productTypes = productTypeService.selectProductType(null);
        List<SalesStatus> salesStatuses=salesStatusService.selectSalesStatus(null);
        session.setAttribute("merc", merchandises);
        session.setAttribute("unis",unitses);
        session.setAttribute("prod",productTypes);
        session.setAttribute("sale",salesStatuses);
        return "page/warehouse/goods-balance";
    }

    /**
     *上方搜索栏
     */
    @RequestMapping(value = "merchandisemenu.do")
    public String merchandisemenu(Merchandise merchandise,HttpSession session){
        List<Merchandise> ab = merchandiseService.sanMerchandise(merchandise);
        session.setAttribute("merc",ab);
        return  "page/warehouse/goods-balance";
    }

    //按商品类型查询
    @RequestMapping(value = "/selectType.do")
    public void selectType(Merchandise merchandise,PrintWriter printWriter){
        List<Merchandise> merchandises = merchandiseService.selectMerchandise(merchandise);
        System.out.println(merchandise.getMerchandiseName());
        if(merchandises.size()>0){
            String json = JSON.toJSONString(merchandises);
            printWriter.write(json);
            printWriter.flush();
            printWriter.close();
        }
    }
    /**
     * 查询被选中即将修改的商品的信息
     */
    @RequestMapping(value = "/merchandiseId.do")
    public void updatemerchandiseId(Merchandise merchandise,PrintWriter printWriter){
        List<Merchandise> merchandises = merchandiseService.selectMerchandise(merchandise);
        if(merchandises.size()>0){
            Merchandise m = merchandises.get(0);
            String json= JSON.toJSONString(m);
            printWriter.write(json);
            printWriter.flush();
            printWriter.close();
        }else{
            String json=JSON.toJSONString(0);
            printWriter.write(json);
            printWriter.flush();
            printWriter.close();
        }
    }
    /* 删除商品信息
     */
    @RequestMapping(value = "/deleteMerchandise.do")
    @ResponseBody
    public void  deleteMerchandise(Merchandise merchandises,PrintWriter printWriter){
        System.out.println(merchandises.getMerchandiseId());
        merchandises.setMerchandiseState(1);
        merchandiseService.updateMerchandise(merchandises);
        String jsonString = JSON.toJSONString("1");
        printWriter.write(jsonString);
        printWriter.flush();
        printWriter.close();

    }
    /**
     * 修改被选中的商品的信息
     */
    @RequestMapping(value = "/updateMerchandise.do")
    public void  updateMerchandise(String merchandises,PrintWriter printWriter){
        int i =0;
        ArrayList<Merchandise>merchandiseList=JSON.parseObject(merchandises,new TypeReference<ArrayList<Merchandise>>(){});
        for(Merchandise m :merchandiseList){
            i=merchandiseService.updateMerchandise(m);
        }
        if(i>0){
            List<Merchandise> merchandise =merchandiseService.selectMerchandise(null);
            //返回值
            String jsonString = JSON.toJSONString(merchandise);
            printWriter.write(jsonString);
            printWriter.flush();
            printWriter.close();
        }
        //返回值
        String jsonString=JSON.toJSONString(0);
        printWriter.write(jsonString);
        printWriter.flush();
        printWriter.close();
    }




    //展示在售的商品
    @RequestMapping(value="/cooperative.do")
    public  String cooperative(HttpServletRequest request,HttpSession session,Integer currentPage,Merchandise merchandises){
        merchandises.setMerchandiseState(0);
        if(merchandises.getUnitsId()==null || merchandises.getProductTypeId()==null ||  merchandises.getSalesStatusId()==null){
            merchandises.setProductTypeId(0);
            merchandises.setSalesStatusId(0);
            merchandises.setUnitsId(0);
        }
        if (currentPage==null ){
            merchandises.setCurrentPage(1);
            currentPage=1;
        }else {
            merchandises.setCurrentPage(currentPage);
        }
        //分页查询商品信息
        List<Merchandise> merchandise=merchandiseService.pagerMerchandise(merchandises);
        for (Merchandise merchandise1 : merchandise) {
            System.out.println(merchandise1.getMerchandiseName());
        }
        request.setAttribute("merch",merchandise);
        //获取分页信息
        Pages<Merchandise> pages=merchandiseService.getPager(merchandises,currentPage);
        request.setAttribute("pages",pages);
        //单位
        List<Units> unitses = unitsService.selectUnits(null);
        session.setAttribute("unis",unitses);
        //商品类别
        List<ProductType> productTypes = productTypeService.selectProductType(null);
        session.setAttribute("prod",productTypes);
        //销售状态
        List<SalesStatus> salesStatuses=salesStatusService.selectSalesStatus(null);
        session.setAttribute("sale",salesStatuses);
        request.setAttribute("i",0);
        session.setAttribute("cooname",merchandises.getMerchandiseName());
        return "page/material/goods-list-3";
    }

    /**
     * 展示下架的商品
     * @param request
     * @param currentPage
     * @param merchandises
     * @return
     */
    @RequestMapping(value="/noncooperation.do")
    public  String noncooperation(HttpServletRequest request, HttpSession session, Integer currentPage,Merchandise merchandises){
        merchandises.setMerchandiseState(1);
        if(merchandises.getUnitsId()==null || merchandises.getProductTypeId()==null ||  merchandises.getSalesStatusId()==null){
            merchandises.setProductTypeId(0);
            merchandises.setSalesStatusId(0);
            merchandises.setUnitsId(0);
        }
        if (currentPage==null ){
            merchandises.setCurrentPage(1);
            currentPage=1;
        }else {
            merchandises.setCurrentPage(currentPage);
        }
        //分页查询商品信息
        List<Merchandise> merchandise=merchandiseService.pagerMerchandise(merchandises);
        request.setAttribute("merch",merchandise);
        //获取分页信息
        Pages<Merchandise> pages=merchandiseService.getPager(merchandises,currentPage);
        request.setAttribute("pages",pages);
        //单位
        List<Units> unitses = unitsService.selectUnits(null);
        session.setAttribute("unis",unitses);
        //商品类别
        List<ProductType> productTypes = productTypeService.selectProductType(null);
        session.setAttribute("prod",productTypes);
        //销售状态
        List<SalesStatus> salesStatuses=salesStatusService.selectSalesStatus(null);
        session.setAttribute("sale",salesStatuses);
        request.setAttribute("i",1);
        session.setAttribute("nonname",merchandises.getMerchandiseName());
        return "page/material/goods-list-3";
    }

    /**
     * 修改为不合作客户
     * @param noncooperationClient
     * @param printWriter
     */
    @RequestMapping("/noncooperationClient.do")
    public void noncooperationClient(String noncooperationClient,PrintWriter printWriter){
        int i=0;
        ArrayList<Merchandise> merchandiseArrayList =  JSON.parseObject(noncooperationClient, new TypeReference<ArrayList<Merchandise>>(){});
        i= merchandiseService.noncooperation(merchandiseArrayList);
        if(i>0){
            String jsonString = JSON.toJSONString(1);
            printWriter.write(jsonString);
        }
        printWriter.flush();
        printWriter.close();
    }
    /**
     * 修改为合作客户
     * @param cooperativeClients
     * @param printWriter
     */
    @RequestMapping("/cooperativeClient.do")
    public void cooperativeClient(String cooperativeClients,PrintWriter printWriter){
        int i=0;
        ArrayList<Merchandise> merchandiseArrayList =  JSON.parseObject(cooperativeClients, new TypeReference<ArrayList<Merchandise>>(){});
        i= merchandiseService.cooperative(merchandiseArrayList);
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
     * @param merchandises
     * @param printWriter
     */
    @RequestMapping(value = "/merchandisesId.do")
    public void merchandisesId(Merchandise merchandises,PrintWriter printWriter){
        List<Merchandise> merchandise=merchandiseService.selectMerchandise(merchandises);
        if (merchandise.size()>0){
            String jsonString = JSON.toJSONString(merchandise);
            printWriter.write(jsonString);
        }
        printWriter.flush();
        printWriter.close();
    }

    /**
     * 修改用户信息
     * @param merchandise
     * @param printWriter
     */
    @RequestMapping(value = "/updatesMerchandise.do")
    public  void updatesMerchandise(Merchandise merchandise,PrintWriter printWriter){
        int i=0;
        i = merchandiseService.updateMerchandise(merchandise);
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
    @RequestMapping("/addMerchandise.do")
    public void addMerchandise(Merchandise merchandise,PrintWriter printWriter){
        int i = merchandiseService.insertMerchandise(merchandise);
        String jsonString = JSON.toJSONString(i);
        printWriter.write(jsonString);
        printWriter.flush();
        printWriter.close();
    }
}
