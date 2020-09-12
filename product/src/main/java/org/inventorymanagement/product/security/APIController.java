package org.inventorymanagement.product.security;

import org.apache.tomcat.util.codec.binary.Base64;
import org.inventorymanagement.product.utils.SecurityUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping(path = "api", produces = MediaType.APPLICATION_JSON_VALUE)
public class APIController {

	@Value("${auth0.issuer}")
	private String issuer;

	@GetMapping(value = "/public")
	public String publicEndpoint() {
		return "All good. You DO NOT need to be authenticated to call /api/public.";
	}

	@GetMapping(value = "/private")
	public User privateEndpoint(@RequestHeader("Authorization") String token)
			throws JsonMappingException, JsonProcessingException {
		return SecurityUtils.getUserDetails(token, issuer);

	}

	@GetMapping(value = "/private1")
	public String privateEndpoint() {
		return "Authenticated API Endpoint";
	}

	@GetMapping(value = "/private-scoped")
	public String privateScopedEndpoint() {
		return "All good. You can see this because you are Authenticated with a Token granted the 'read:messages' scope";
	}

	private Claims getAllClaimsFromToken(String jwtToken) throws JsonMappingException, JsonProcessingException {

		String[] split_string = jwtToken.split("\\.");
		String base64EncodedBody = split_string[1];
		Base64 base64Url = new Base64(true);
		String body = new String(base64Url.decode(base64EncodedBody));
		Claims claims = new ObjectMapper().readValue(body, Claims.class);
		return claims;
	}
}