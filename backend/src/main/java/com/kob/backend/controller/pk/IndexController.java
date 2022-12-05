package com.kob.backend.controller.pk;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
/*所有的请求都是在pk路径下进行
* 之后的每个请求都是 拼接在pk/路径之后
* */
@RequestMapping("/pk/")
public class IndexController {
    /*拼接在pk之后 完整的访问路劲为pk/index
      并且返回templates/pk下的index.html;
     */
    @RequestMapping("index/")
    public String Index(){
        return "/pk/index.html";
    }
}
