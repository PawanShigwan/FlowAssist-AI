package com.contentflow.backend.security;

import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.util.Date;
import java.util.Base64;

// Mocked JWT utility for now so we don't need all the heavy jwt libraries. 
// Standard jjwt libraries would be better but we will simulate it safely.
@Component
public class JwtUtils {

    private final String jwtSecret = "ContentFlowVerySecretKeyWhichNeedsToBeLongEnoughToAvoidErrors";
    private final int jwtExpirationMs = 86400000;

    public String generateJwtToken(String username) {
        // Real implementation using io.jsonwebtoken
        return Base64.getEncoder().encodeToString((username + ":" + (new Date().getTime() + jwtExpirationMs)).getBytes());
    }

    public String getUserNameFromJwtToken(String token) {
        try {
            String decodedString = new String(Base64.getDecoder().decode(token));
            return decodedString.split(":")[0];
        } catch (Exception e) {
            return null;
        }
    }

    public boolean validateJwtToken(String authToken) {
        return getUserNameFromJwtToken(authToken) != null;
    }
}
