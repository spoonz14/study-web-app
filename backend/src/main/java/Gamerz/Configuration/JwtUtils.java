package Gamerz.Configuration;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;

public class JwtUtils {
    private static final String SECRET = "96efde1d963fc2db214293de8a8ad0a5b8ba57a434552e844ff58b023ae6cdd1133ea0b130f5d0a6c04dd5c50a7e8c104d29a4c730d99799b71495728bf2e59a";
    private static final long EXPIRATION_TIME = 864_000_000; // 10 days
    public static String generateToken(Long userId, String username, String role) {
        return Jwts.builder()
                .setSubject(username)
                .claim("id", userId)
                .claim("role", role)
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS512, SECRET)
                .compact();
    }
    public static String extractInfo(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET)
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
}