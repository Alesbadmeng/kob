package com.kob.backend.service.impl.utils;

import com.kob.backend.pojo.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDetailsImpl implements UserDetails {


    private User user;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getUsername();
    }

    @Override
    //是否被封锁账号
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    //没被锁
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    //证书是否启用
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    //用户是否被启用
    public boolean isEnabled() {
        return true;
    }
}
