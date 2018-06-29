package team.ruike.imm.utility;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by HP on 2017/12/8.
 */
public class RandomUtil {
    public static String getRandomFileName() {

        SimpleDateFormat simpleDateFormat;

        simpleDateFormat = new SimpleDateFormat("yyyyMMdd");

        Date date = new Date();

        String str = simpleDateFormat.format(date);

        return  str;// 当前时间
    }
}
