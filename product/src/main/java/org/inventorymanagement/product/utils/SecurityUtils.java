package org.inventorymanagement.product.utils;

import org.apache.tomcat.util.codec.binary.Base64;
import org.inventorymanagement.product.security.model.Claims;
import org.inventorymanagement.product.security.model.User;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class SecurityUtils {

	public static User getUserDetailsUsingManagementAPI(String tokenWithBearer, String issuer) throws JsonMappingException, JsonProcessingException {

		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", tokenWithBearer);
		HttpEntity<String> entity = new HttpEntity<>("headers", headers);
		RestTemplate restTemplate = new RestTemplate();
	
		Claims claims = getAllClaimsFromToken(tokenWithBearer.split(" ")[1]);
		System.out.println("Calling: " + issuer + "/api/v2/users/" + claims.getSub());
		User user = restTemplate.exchange(issuer + "/api/v2/users/" + claims.getSub() , HttpMethod.GET, entity, User.class).getBody();
		return user;
	}

	public static Claims getAllClaimsFromToken(String jwtToken) throws JsonMappingException, JsonProcessingException {

		String[] split_string = jwtToken.split("\\.");
        String base64EncodedBody = split_string[1];
        Base64 base64Url = new Base64(true);
        String body = new String(base64Url.decode(base64EncodedBody));
        Claims claims = new ObjectMapper().readValue(body, Claims.class);
        return claims;
	}

	public static String getSubjectFromToken(String jwtToken) throws JsonMappingException, JsonProcessingException {

		String[] split_string = jwtToken.split("\\.");
        String base64EncodedBody = split_string[1];
        Base64 base64Url = new Base64(true);
        String body = new String(base64Url.decode(base64EncodedBody));
        Claims claims = new ObjectMapper().readValue(body, Claims.class);
        return claims.getSub();
	}

}
