package team.ruike.imm.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import team.ruike.imm.dao.UserDao;
import team.ruike.imm.entity.User;
import team.ruike.imm.service.UserService;

import java.util.List;

/**
 * @author  @author 索志文
 * 测试
 */
@Service("userService")
public class UserServiceImpl implements UserService {
    @Autowired
    UserDao userDao;
    /**
     *
     * @param user
     * @return
     */
    public User selectUser(User user) {
        User u=new User();
        List<User> list=null;
        list=userDao.selectUser(user);
        if (list.size()>0 && list!=null ){
            if(list.get(0).getUserName().equals(user.getUserName())&&list.get(0).getUserPassword().equals(user.getUserPassword())){
                return  list.get(0);
            }
            u.setUserName("无");
        }
        u.setUserName("无");
        return u;
    }

    public User doUserLogin(User user) {
        return userDao.selectUser(user).get(0);
    }

    public List<User> userList(User user) {
        return userDao.selectUser(user);
    }

    public Integer count() {
        return userDao.count();
    }

//    int pageSize=2;//设置每页显示数据数
    /**
     * 分页查询进入SQL语句
     * @return
     */
//    public List<User> pagerUser(Integer currentPage) {
//        User user=new User();
//        user.setCurrentPage(currentPage);
//        //设置每页显示数据数
//        user.setPageSize(pageSize);
//        if (currentPage>0){
//        //根据输入的页数查询
//        user.setCurrentPage((user.getCurrentPage()-1)*pageSize);
//        return userDao.selectUser(user);
//        }
//        return userDao.selectUser(user);
//    }

//    /**
//     *pager分页辅助
//     pager.setTotalRecord 总数
//     */
//    public void queryOrderContract(OrderContract orderContract, Pager<OrderContract> pages) {
//        Integer count = orderContractDao.selectCount(orderContract);
//        pages.setTotalRecord(count);
//        List<OrderContract> orderContractList = orderContractDao.select(orderContract, (pages.getCurrentPage() - 1) * pages.getPageSize(), pages.getPageSize());
//        pager.setList(orderContractList);
//    }

    /**
     *pager分页辅助
     pager.setTotalRecord 总数OrderContract orderContract, Pager<OrderContract> pager
     */ //(每页数据数-1)*每页显示数据数
//    public team.ruike.imm.instrument.Pages queryOrderContract() {
//        team.ruike.imm.instrument.Pages<User> pages=new team.ruike.imm.instrument.Pages<User>();
//        Integer count = userDao.count();
//        pages.setTotalRecord(count);
//        User user=new User();
//        user.setCurrentPage(1);
//        pages.setPageSize(3);
//        List<User> orderContractList = userDao.selectUser(user );
//        pages.setList(orderContractList);
//        return pages;
//    }
    public int insertAdd(List<User> users) {
        return userDao.insertAdd(users);
    }
    public int updateUser(User user) {
        return userDao.updateUser(user);
    }
    public int insertUser(User user) {
        return userDao.insertUser(user);
    }
}
