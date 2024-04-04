/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/WebServices/GenericResource.java to edit this template
 */
package webservices.restful;

import entity.Account;
import entity.LoginPayload;
import io.jsonwebtoken.Jwts;
import java.util.Calendar;
import java.util.Date;
import java.util.UUID;
import javax.ejb.EJB;
import javax.json.Json;
import javax.json.JsonObject;
import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import session.AccountSessionLocal;
import session.EventSessionLocal;

/**
 * REST Web Service
 *
 * @author admin
 */
@Path("account")
public class AccountResource {

    final int TOKEN_EXPIRY = 600;
    @EJB
    private AccountSessionLocal accountSessionLocal;
    @EJB
    private EventSessionLocal eventSessionLocal;

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createAccount(Account a) {
        if (accountSessionLocal.sameEmail(a.getEmail())) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "This account already has an email").build();
            return Response.status(404).entity(exception)
                    .type(MediaType.APPLICATION_JSON).build();
        }
        accountSessionLocal.createAccount(a);

        JsonObject successMessage = Json.createObjectBuilder()
                .add("message", "Account created successfully")
                .build();
        return Response.status(200).entity(successMessage)
                .type(MediaType.APPLICATION_JSON).build();
    }
    
    @POST
    @Path("/authenticateAccount")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response authenticateAccount(LoginPayload payload) {
        JsonObject LOGIN_FAILED_ERROR = Json.createObjectBuilder()
                .add("error", "Login Failed")
                .build();

        try {
            if (accountSessionLocal.authenticateAccount(payload.getEmail(), payload.getPassword())) {
                int userId = accountSessionLocal.retrieveUserWithEmail(payload.getEmail()).getId().intValue();
                Date now = new Date();

                Calendar cal = Calendar.getInstance();
                cal.setTime(now);
                cal.add(Calendar.MINUTE, TOKEN_EXPIRY);

                String jwtToken = Jwts.builder()
                        .claim("userId", "" + userId) //store the userId as a String
                        .setId(UUID.randomUUID().toString())
                        .setIssuedAt(now)
                        .setExpiration(cal.getTime())
                        .signWith(JWTHelper.hmacKey)
                        .compact();

                System.out.println("#jwtToken: " + jwtToken);
                JsonObject token = Json.createObjectBuilder()
                        .add("token", jwtToken)
                        .build();
                return Response.status(Response.Status.OK).entity(token).build();
            } else {
                return Response.status(Response.Status.UNAUTHORIZED).entity(LOGIN_FAILED_ERROR).build();
            }
        } catch (Exception e) {
            return Response.status(Response.Status.UNAUTHORIZED).entity(LOGIN_FAILED_ERROR).build();
        }
    }
}
