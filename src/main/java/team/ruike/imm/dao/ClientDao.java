package team.ruike.imm.dao;
import team.ruike.imm.entity.Client;
import team.ruike.imm.entity.Employee;
import team.ruike.imm.entity.User;

import java.util.List;
/**
 * @author 索志文
 * @version 1.0
 */
public interface ClientDao {
    int count(Client client);
    /**
     * 指定条件查询客户信息
     * @param client 客户信息
     * @return
     */
     List<Client> selecrClient(Client client);
    /**
     * 分页
     * @return
     */
     List<Client> pages(Client client);
    /**
     * 指定条件修改客户信息
     * @param client
     * @return
     */
     int updateClient(Client client);

    /**
     * 添加客户信息
     * @param client
     * @return
     */
     int insertClient(Client client);
     int noncooperation(List<Client> client);
     int cooperative(List<Client> client);
}
