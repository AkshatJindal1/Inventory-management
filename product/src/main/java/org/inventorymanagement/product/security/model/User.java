package org.inventorymanagement.product.security.model;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class User {

	@JsonProperty("created_at")
	private Date createdAt;

	@JsonProperty("email")
	private String email;

	@JsonProperty("email_verified")
	private Boolean emailVerified;

	@JsonProperty("name")
	private String name;

	@JsonProperty("nickname")
	private String nickname;

	@JsonProperty("picture")
	private String picture;

	@JsonProperty("updated_at")
	private String updatedAt;

	@JsonProperty("user_id")
	private String userId;

	@JsonProperty("last_ip")
	private String lastIp;

	@JsonProperty("last_login")
	private Date lastLogin;

	@JsonProperty("logins_count")
	private Integer loginsCount;

	@JsonProperty("user_metadata")
	private UserMetadata userMetadata;

	@JsonProperty("identities")
	private Identities[] identities;

}
