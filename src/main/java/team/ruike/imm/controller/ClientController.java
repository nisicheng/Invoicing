package team.ruike.imm.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import jdk.nashorn.internal.ir.annotations.Ignore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import team.ruike.imm.entity.Client;
import team.ruike.imm.entity.User;
import team.ruike.imm.service.ClientService;
import team.ruike.imm.utility.Pages;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.PrintWriter;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
@RequestMapping(value = "/client")
@Controller
public class ClientController {


    @Autowired
    ClientService clientService;
    //展示合作客户数据
    @RequestMapping(value="/cooperative.do")
    public  String cooperative(HttpServletRequest request,HttpSession session,Integer currentPage,Client client){
        client.setClientState(0);
        if (currentPage==null ){
            client.setCurrentPage(1);
            currentPage=1;
        }else {
            client.setCurrentPage(currentPage);
        }
        List<Client> clients=clientService.pagerClient(client);
        request.setAttribute("clients",clients);
        Pages<Client> pages=clientService.getPager(client,currentPage);
        request.setAttribute("pages",pages);
        int i=0;
        request.setAttribute("i",i);
        session.setAttribute("cooname",client.getClientName());
        return "page/material/customer-list-1";
    }

    /**
     * 展示不合作的客户
     * @param request
     * @param currentPage
     * @param client
     * @return
     */
    @RequestMapping(value="/noncooperation.do")
    public  String noncooperation(HttpServletRequest request,HttpSession session,Integer currentPage,Client client){
        client.setClientState(1);
        if (currentPage==null ){
            client.setCurrentPage(1);
            currentPage=1;
        }else {
            client.setCurrentPage(currentPage);
        }
        List<Client> clients=clientService.pagerClient(client);
        for (Client client1 : clients) {
            System.out.println(client1.getClientName());
        }
        request.setAttribute("cc",clients);
        Pages<Client> pages=clientService.getPager(client,currentPage);
        request.setAttribute("pages",pages);
        int i=1;
        request.setAttribute("i",i);
        session.setAttribute("nonname",client.getClientName());
        return "page/material/customer-list-1";
    }

    /**
     * 修改为不合作客户
     * @param noncooperationClient
     * @param printWriter
     */
    @RequestMapping("/noncooperationClient.do")
    public void noncooperationClient(String noncooperationClient,PrintWriter printWriter){
        int i=0;
            ArrayList<Client> clientArrayList =  JSON.parseObject(noncooperationClient, new TypeReference<ArrayList<Client>>(){});
                i= clientService.noncooperation(clientArrayList);
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
            ArrayList<Client> clientArrayList =  JSON.parseObject(cooperativeClients, new TypeReference<ArrayList<Client>>(){});
        int  i= clientService.cooperative(clientArrayList);
                //返回值
                String jsonString = JSON.toJSONString(i);
                printWriter.write(jsonString);

        printWriter.flush();
        printWriter.close();
    }

    /**
     * 获取要修改的用户信息
     * @param client
     * @param printWriter
     */
    @RequestMapping(value = "/clientId.do")
    public void clientId(Client client,PrintWriter printWriter){
        List<Client> clients=clientService.selecrClient(client);
        if (clients.size()>0){
            String jsonString = JSON.toJSONString(clients);
            printWriter.write(jsonString);
        }
        printWriter.flush();
        printWriter.close();
    }

    /**
     * 修改用户信息
     * @param clientList
     * @param printWriter
     */
    @RequestMapping(value = "/updatesClient.do")
    public  void updatesClient(String clientList,PrintWriter printWriter){
        int i=0;
        ArrayList<Client> clientArrayList =  JSON.parseObject(clientList, new TypeReference<ArrayList<Client>>(){});
        for (Client client : clientArrayList) {
            i = clientService.updateClient(client);
        }
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
    @RequestMapping("/addClient.do")
    public void addClient(String clientList,PrintWriter printWriter){
        int i=0;
        ArrayList<Client> clientArrayList =  JSON.parseObject(clientList, new TypeReference<ArrayList<Client>>(){});
        for (Client client : clientArrayList) {
            i = clientService.insertClient(client);
        }
        if(i>0) {
                String jsonString = JSON.toJSONString(1);
                printWriter.write(jsonString);
        }
        printWriter.flush();
        printWriter.close();
    }
}
