/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/WebServices/GenericResource.java to edit this template
 */
package webservices.restful;

import entity.Account;
import entity.Event;
import java.security.Principal;
import java.util.List;
import javax.ejb.EJB;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.PathParam;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import session.AccountSessionLocal;
import session.EventSessionLocal;

/**
 * REST Web Service
 *
 * @author admin
 */
@Path("protected")
public class ProtectedResource {

    @EJB
    private AccountSessionLocal accountSessionLocal;
    @EJB
    private EventSessionLocal eventSessionLocal;

    @GET
    @Secured
    @Path("/getOrgEvents")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getOrgEvents(@Context SecurityContext securityContext) {
        try {
            Principal principal = securityContext.getUserPrincipal();
            String userId = principal.getName();

            List<Event> orgEvents = accountSessionLocal.getOrganisedEvents(Long.parseLong(userId));

            for (Event e : orgEvents) {
                Account org = e.getOrganiser();
                org.setAttendedEvents(null);
                org.setJoinedEvents(null);
                org.setOrganisedEvents(null);

                for (Account a : e.getAttendees()) {
                    a.setAttendedEvents(null);
                    a.setJoinedEvents(null);
                    a.setOrganisedEvents(null);
                }

                for (Account a : e.getParticipants()) {
                    a.setAttendedEvents(null);
                    a.setJoinedEvents(null);
                    a.setOrganisedEvents(null);
                }
            }

            return Response.ok(orgEvents).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Error fetching organized events")
                    .build();
        }
    }
    
    @GET
    @Secured
    @Path("/getOrgEventsbyUserId/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getOrgEventsByUserId(@Context SecurityContext securityContext, @PathParam("id") Long aId) {
        try {
            List<Event> orgEvents = accountSessionLocal.getOrganisedEvents(aId);

            for (Event e : orgEvents) {
                Account org = e.getOrganiser();
                org.setAttendedEvents(null);
                org.setJoinedEvents(null);
                org.setOrganisedEvents(null);

                for (Account a : e.getAttendees()) {
                    a.setAttendedEvents(null);
                    a.setJoinedEvents(null);
                    a.setOrganisedEvents(null);
                }

                for (Account a : e.getParticipants()) {
                    a.setAttendedEvents(null);
                    a.setJoinedEvents(null);
                    a.setOrganisedEvents(null);
                }
            }

            return Response.ok(orgEvents).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Error fetching organized events")
                    .build();
        }
    }

    @GET
    @Secured
    @Path("/getRegEvents")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getRegEvents(@Context SecurityContext securityContext) {
        try {
            Principal principal = securityContext.getUserPrincipal();
            String userId = principal.getName();

            List<Event> regEvents = accountSessionLocal.getRegisteredEvents(Long.parseLong(userId));

            for (Event e : regEvents) {
                Account org = e.getOrganiser();
                org.setAttendedEvents(null);
                org.setJoinedEvents(null);
                org.setOrganisedEvents(null);

                for (Account a : e.getAttendees()) {
                    a.setAttendedEvents(null);
                    a.setJoinedEvents(null);
                    a.setOrganisedEvents(null);
                }

                for (Account a : e.getParticipants()) {
                    a.setAttendedEvents(null);
                    a.setJoinedEvents(null);
                    a.setOrganisedEvents(null);
                }
            }

            return Response.ok(regEvents).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Error fetching organized events")
                    .build();
        }
    }

    @GET
    @Secured
    @Path("/getAccount")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAccount(@Context SecurityContext securityContext) {

        try {
            Principal principal = securityContext.getUserPrincipal();
            String userId = principal.getName();

            Account account = accountSessionLocal.getAccount(Long.parseLong(userId));
            account.setAttendedEvents(null);
            account.setJoinedEvents(null);
            account.setOrganisedEvents(null);

            return Response.ok(account).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Error fetching account")
                    .build();
        }
    }
    
    @GET
    @Secured
    @Path("/getAccountByUserId/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAccountByUserId(@Context SecurityContext securityContext, @PathParam("id") Long aId) {

        try {
            Account account = accountSessionLocal.getAccount(aId);
            account.setAttendedEvents(null);
            account.setJoinedEvents(null);
            account.setOrganisedEvents(null);

            return Response.ok(account).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Error fetching account")
                    .build();
        }
    }

    @PUT
    @Secured
    @Path("/updateAccount")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateAccount(@Context SecurityContext securityContext, Account a) {
        Principal principal = securityContext.getUserPrincipal();
        String userId = principal.getName();
        Account currentAccount = accountSessionLocal.getAccount(Long.parseLong(userId));
        
        if (!currentAccount.getEmail().equals(a.getEmail()) && accountSessionLocal.sameEmail(a.getEmail())) {
            return Response.status(Response.Status.UNAUTHORIZED)
                    .entity("This email already has an account!")
                    .build();
        }

        currentAccount.setContactDetails(a.getContactDetails());
        currentAccount.setEmail(a.getEmail());
        currentAccount.setPassword(a.getPassword());
        currentAccount.setImageURL(a.getImageURL());
        accountSessionLocal.updateAccount(currentAccount);
        return Response.ok(a).build();
    }
}
