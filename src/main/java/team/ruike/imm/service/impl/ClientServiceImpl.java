package team.ruike.imm.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import team.ruike.imm.dao.ClientDao;
import team.ruike.imm.entity.Client;
import team.ruike.imm.service.ClientService;
import team.ruike.imm.utility.Pages;

import java.util.List;
@Service("clientService")
public class ClientServiceImpl   implements ClientService{
    @Autowired
    ClientDao clientDao;
    public List<Client> selecrClient(Client client) {
        return clientDao.selecrClient(client);
    }
    int pageSize=4;

    /**
     *  分页查询数据库
     * @param client
     * @return
     */
    public List<Client> pagerClient(Client client) {
        client.setPageSize(pageSize);
        if (client.getCurrentPage()>1){
            client.setCurrentPage((client.getCurrentPage()-1)*pageSize);
        }else {
            client.setCurrentPage(0);
        }
        List<Client> count=clientDao.pages(client);
        return count;
    }
    /**
     * 分页类入参
     * @param client
     * @return
     */
    public Pages<Client> getPager(Client client,Integer currentPage) {
        List<Client> count=null;
        Client c=new Client();
        int i=0;
        if(client.getClientName()!=null && client.getClientName()!=""){
            count=clientDao.pages(client);
            i=clientDao.count(client);
        }else {
            c.setClientState(client.getClientState());
            count=clientDao.pages(c);
            i=clientDao.count(c);
        }
        Pages<Client> pages=new Pages<Client>();
        pages.setCurrentPage(currentPage);
        pages.setList(count);
        pages.setTotalRecord(i);
        pages.setPageSize(pageSize);
        return pages;
    }

    public int updateClient(Client client) {
        return clientDao.updateClient(client);
    }
    public int insertClient(Client client) {
        return clientDao.insertClient(client);
    }
    public int noncooperation(List<Client> client) {
        return clientDao.noncooperation(client);
    }
    public int cooperative(List<Client> client) {
        return clientDao.cooperative(client);
    }
}
