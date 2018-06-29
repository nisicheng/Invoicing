package team.ruike.imm.service;

import team.ruike.imm.entity.Client;
import team.ruike.imm.utility.Pages;

import java.util.List;

public interface ClientService {
    /**
     * 指定条件查询客户信息
     * @param client 客户信息
     * @return
     */
    public List<Client> selecrClient(Client client);
    /**
     * 分页
     * @param
     * @return
     */
    public List<Client> pagerClient(Client client);
    /**
     * 入参分页类
     * @param
     * @return
     */
    public Pages<Client> getPager(Client client,Integer currentPage);
    /**
     * 指定条件修改客户信息
     * @param client
     * @return
     */
    public int updateClient(Client client);

    /**
     * 添加客户信息
     * @param client
     * @return
     */
    public int insertClient(Client client);

    /**
     * 批量修改
     * @return
     */
    public int noncooperation(List<Client> client);
    public int cooperative(List<Client> client);
}
