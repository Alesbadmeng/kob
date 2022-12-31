package com.kob.backend.pojo;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class User {
    @TableId(type = IdType.AUTO)//id自增 mybatis-plus
    private Integer id;
    private String username;
    private String password;
    private String photo;

}
