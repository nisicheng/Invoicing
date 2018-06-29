package team.ruike.imm.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.TypeReference;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import team.ruike.imm.entity.*;
import team.ruike.imm.service.ProductTypeService;
import team.ruike.imm.service.SalesStatusService;
import team.ruike.imm.service.UnitsService;

import javax.servlet.http.HttpServletRequest;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping(value = "/unitsandtype")
public class UnitsAndType {
    @Autowired
    UnitsService unitsService;
    @Autowired
    ProductTypeService productTypeService;
    @Autowired
    SalesStatusService salesStatusService;
    //展示全部页面
    @RequestMapping(value="/units.do")
    public  String units(Units units, ProductType productType, SalesStatus salesStatus, HttpServletRequest request){
        List<Units> u = unitsService.selectUnits(null);
        List<ProductType> p = productTypeService.selectProductType(null);
        List<SalesStatus> s = salesStatusService.selectSalesStatus(null);
        request.setAttribute("u",u);
        request.setAttribute("p",p);
        request.setAttribute("s",s);
        for (Units u1 :u){
            System.out.println(u1.getUnitsName());
        }
        for(ProductType p1:p){
            System.out.println(productType.getProductTypeName());
        }
        return "page/material/unitsAndType";
    }

    //被选中的单位信息
    @RequestMapping(value = "/unitsId.do")
    public void updateunitsId(Integer unitsId, PrintWriter printWriter){
        Units unit  = new Units();
        unit.setUnitsId(unitsId);
        List<Units> unitses = unitsService.selectUnits(unit);
        if(unitses.size()>0){
            Units u = unitses.get(0);
            String json= JSON.toJSONString(u);
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
    //更新单位信息
    @RequestMapping(value = "/updateunits.do")
    public void updateu(String Units,PrintWriter printWriter){
        int i =0;
        ArrayList<Units> unitsList=JSON.parseObject(Units,new TypeReference<ArrayList<Units>>(){});
        for(Units u :unitsList){
            i=unitsService.updateUnits(u);
        }
        //返回值
        String jsonString=JSON.toJSONString(i);
        printWriter.write(jsonString);
        printWriter.flush();
        printWriter.close();
    }
    //删除单位信息
    @RequestMapping(value = "/deleteunits.do")
    @ResponseBody
    public void  deleteunits(Units units,PrintWriter printWriter){
            units.setUnitsState(1);
            unitsService.updateUnits(units);
            String jsonString = JSON.toJSONString("1");
            printWriter.write(jsonString);
            printWriter.flush();
            printWriter.close();
    }


     //被选中的类型信息
    @RequestMapping(value = "/productTypeId.do")
    public void updateproductType(Integer productTypeId,PrintWriter printWriter){
            ProductType p = new ProductType();
            p.setProductTypeId(productTypeId);
            List<ProductType> productTypes = productTypeService.selectProductType(p);
            if(productTypes.size()>0){
                ProductType u = productTypes.get(0);
                String json= JSON.toJSONString(u);
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
    //更新类型信息
    @RequestMapping(value = "/updateproductTypes.do")
    public void updatep(String ProductTypes,PrintWriter printWriter){
        int i =0;
        ArrayList<ProductType> productTypeList=JSON.parseObject(ProductTypes,new TypeReference<ArrayList<ProductType>>(){});
        for(ProductType p :productTypeList){
            i=productTypeService.updateProductType(p);
        }
        //返回值
        String jsonString=JSON.toJSONString(i);
        printWriter.write(jsonString);
        printWriter.flush();
        printWriter.close();
    }
    //删除类型信息
    @RequestMapping(value = "/deleteproductTypes.do")
    @ResponseBody
    public void  deleteproduct(ProductType productType,PrintWriter printWriter){
            productType.setProductTypeState(1);
            productTypeService.updateProductType(productType);
            String jsonString = JSON.toJSONString("1");
            printWriter.write(jsonString);
            printWriter.flush();
            printWriter.close();
    }


    //被选中的销售状态名
    @RequestMapping(value = "/salesStatusId.do")
    public void updatesalesStatus(Integer salesStatusId,PrintWriter printWriter){
        SalesStatus s = new SalesStatus();
        s.setSalesStatusId(salesStatusId);
        List<SalesStatus> salesStatuses = salesStatusService.selectSalesStatus(s);
        if(salesStatuses.size()>0){
            SalesStatus ss = salesStatuses.get(0);
            String json= JSON.toJSONString(ss);
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
    //更新销售状态名
    @RequestMapping(value = "/updatesalesStatus.do")
    public void updates(String SalesStatus,PrintWriter printWriter){
        int i =0;
        ArrayList<SalesStatus> salesStatusList=JSON.parseObject(SalesStatus,new TypeReference<ArrayList<SalesStatus>>(){});
        for(SalesStatus s :salesStatusList){
            i=salesStatusService.updateSalesStatus(s);
        }
        //返回值
        String jsonString=JSON.toJSONString(i);
        printWriter.write(jsonString);
        printWriter.flush();
        printWriter.close();
    }
    //删除销售状态名
    @RequestMapping(value = "/deletesalesStatus.do")
    @ResponseBody
    public void  deletesales(SalesStatus salesStatus,PrintWriter printWriter){
        salesStatus.setSalesStatusState(1);
        salesStatusService.updateSalesStatus(salesStatus);
        String jsonString = JSON.toJSONString("1");
        printWriter.write(jsonString);
        printWriter.flush();
        printWriter.close();
    }
}
