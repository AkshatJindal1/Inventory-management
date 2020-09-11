package org.inventorymanagement.product.security;

import java.util.Date;

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

	private Date created_at;
	private String email;
	private Boolean email_verified;
	private String name;
	private String nickname;
	private String picture;
	private String updated_at;
	private String user_id;
	private String last_ip;
	private Date last_login;
	private Integer logins_count;
	private UserMetadata user_metadata;
	private Identities[] identities;
	
}
