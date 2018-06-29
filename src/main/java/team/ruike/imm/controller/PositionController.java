package team.ruike.imm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import team.ruike.imm.entity.Position;
import team.ruike.imm.service.PositionService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
@RequestMapping("position")
public class PositionController {
    @Autowired
    PositionService positionService;

    @RequestMapping(value = "/sposition.do")
    public String selectposition(Position position,HttpSession session){
        List<Position> positions=positionService.selectPosition(null);
        return "login";
    }
    @RequestMapping(value = "/iposition.do")
    public String insertposition(Position positon, Model model){
        int i =positionService.insertPosition(positon);
        if(i>0){
            return "success";
        }
        return "fail";
    }
    @RequestMapping("/ipositions.do")
    public String ipositions(){
           return "iposition";
    }


    @RequestMapping(value = "/suposition.do")
    public String suposition(Position position,HttpSession session){
        List<Position> positions=positionService.selectPosition(position);
        if(position!=null){
            session.setAttribute("position",positions);
            return "sposition";
        }
        return "login";
    }
    @RequestMapping("/uposition.do")
    public String updateposition(Position position,Model model){
        System.out.println(position.getPositionId()+" :"+position.getPositionName());
        int positions = positionService.updatePosition(position);
        if (positions > 0){
            return "success";
        }
        return "fail";
    }


    @RequestMapping("/upositionss.do")
    public String upositions(int i, HttpServletRequest request){
        request.setAttribute("id",i);
        return "update";
    }
}
