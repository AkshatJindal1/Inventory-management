package org.inventorymanagement.product.security;

import com.auth0.spring.security.api.JwtWebSecurityConfigurer;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

import java.util.Arrays;

@Configuration
@EnableWebSecurity(debug = false)
public class AppConfig extends WebSecurityConfigurerAdapter {

	@Value(value = "${auth0.apiAudience}")
	private String apiAudience;
	@Value(value = "${auth0.issuer}")
	private String issuer;

	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedMethods(Arrays.asList("GET", "POST", "OPTIONS"));
		configuration.setAllowCredentials(true);
		configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
		configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}

	@Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors();
        JwtWebSecurityConfigurer
                .forRS256(apiAudience, issuer)
                .configure(http)
                .authorizeRequests()
                // Note: If passing an Authorization header, Spring Security will validate it even with permitAll()
                // You can ignore security filters if this is an issue for you, as discussed here:
                // https://stackoverflow.com/questions/36296869/spring-security-permitall-still-considering-token-passed-in-authorization-header
                .antMatchers(HttpMethod.GET, "/api/public").permitAll()
                .antMatchers(HttpMethod.GET, "/api/private-scoped").hasAuthority("read:messages")
                
                .antMatchers(HttpMethod.GET, "/forms/**").authenticated()
                .antMatchers(HttpMethod.POST, "/forms/**").authenticated()

                .antMatchers(HttpMethod.GET, "/products/**").authenticated()
                .antMatchers(HttpMethod.POST, "/products/**").authenticated()

                .antMatchers(HttpMethod.GET, "/options/**").authenticated()
                .antMatchers(HttpMethod.POST, "/options/**").authenticated()
                
                .antMatchers(HttpMethod.GET, "/user-management/**").authenticated()
                .antMatchers(HttpMethod.POST, "/user-management/**").authenticated();
                
    }
}
