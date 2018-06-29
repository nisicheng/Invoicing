package team.ruike.imm.controller;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.TypeReference;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import team.ruike.imm.entity.Supplier;
import team.ruike.imm.service.SupplierService;
import team.ruike.imm.utility.Pages;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;


@RequestMapping(value = "supplier")
@Controller
public class SupplierController {
    @Autowired
    SupplierService supplierService;

    //展示合作客户数据
    @RequestMapping(value="/cooperative.do")
    public  String cooperative(HttpServletRequest request, HttpSession session, Integer currentPage, Supplier supplier){
        supplier.setSupplierState(0);
        System.out.println(supplier.getSupplierName());
        if (currentPage==null ){
            supplier.setCurrentPage(1);
            currentPage=1;
        }else {
            supplier.setCurrentPage(currentPage);
        }
        List<Supplier> supplies=supplierService.pagerSuplier(supplier);
        request.setAttribute("supplies",supplies);
        Pages<Supplier> pages=supplierService.getPager(supplier,currentPage);
        request.setAttribute("pages",pages);
        int i=0;
        request.setAttribute("i",i);
        session.setAttribute("cooname",supplier.getSupplierName() );
        return "page/material/vendor-list-2";
    }

    /**
     * 展示不合作的客户
     * @param request
     * @param currentPage
     * @param supplier
     * @return
     */
    @RequestMapping(value="/noncooperation.do")
    public  String noncooperation(HttpServletRequest request, HttpSession session,Integer currentPage,Supplier supplier){
        supplier.setSupplierState(1);
        if (currentPage==null ){
            supplier.setCurrentPage(1);
            currentPage=1;
        }else {
            supplier.setCurrentPage(currentPage);
        }
        List<Supplier> supplies=supplierService.pagerSuplier(supplier);
        request.setAttribute("ss",supplies);
        Pages<Supplier> pages=supplierService.getPager(supplier,currentPage);
        request.setAttribute("pages",pages);
        int i=1;
        request.setAttribute("i",i);
        session.setAttribute("noncname",supplier.getSupplierName() );
        return "page/material/vendor-list-2";
    }
    /**
     * 修改为不合作客户
     * @param noncooperation
     * @param printWriter
     */
    @RequestMapping("/noncooperationSupplier.do")
    public void noncooperationSupplier(String noncooperation,PrintWriter printWriter){
        int i=0;
        ArrayList<Supplier> supplierArrayList =  JSON.parseObject(noncooperation, new TypeReference<ArrayList<Supplier>>(){});
        i= supplierService.noncooperation(supplierArrayList);
        if(i>0){
            String jsonString = JSON.toJSONString(1);
            printWriter.write(jsonString);
        }
        printWriter.flush();
        printWriter.close();
    }
    /**
     * 修改为合作客户
     * @param cooperative
     * @param printWriter
     */
    @RequestMapping("/cooperativeSupplier.do")
    public void cooperativeSupplier(String cooperative,PrintWriter printWriter){
        int i=0;
        ArrayList<Supplier> supplierArrayList =  JSON.parseObject(cooperative, new TypeReference<ArrayList<Supplier>>(){});
        i= supplierService.cooperative(supplierArrayList);
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
     * @param supplier
     * @param printWriter
     */
    @RequestMapping(value = "/supplierId.do")
    public void supplierId(Supplier supplier,PrintWriter printWriter){
        List<Supplier> suppliers=supplierService.selectSuplier(supplier);
        if (suppliers.size()>0){
            String jsonString = JSON.toJSONString(suppliers);
            printWriter.write(jsonString);
        }
        printWriter.flush();
        printWriter.close();
    }

    /**
     * 修改用户信息
     * @param supplier
     * @param printWriter
     */
    @RequestMapping(value = "/updateSupplier.do")
    public  void updateSupplier(Supplier supplier,PrintWriter printWriter){
        int i=0;
   i = supplierService.updateSupplier(supplier);
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
    @RequestMapping("/addSupplier.do")
    public void addSupplier(Supplier supplier,PrintWriter printWriter){
        int i = supplierService.insertSuplier(supplier);
        if(i>0) {
            String jsonString = JSON.toJSONString(1);
            printWriter.write(jsonString);
        }
        printWriter.flush();
        printWriter.close();
    }
}
