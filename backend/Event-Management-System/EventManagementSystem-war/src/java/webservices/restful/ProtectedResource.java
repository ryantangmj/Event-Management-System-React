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
import javax.json.Json;
import javax.json.JsonObject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
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

    @PUT
    @Secured
    @Path("/updateAccount")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Account updateAccount(@Context SecurityContext securityContext, Account a) {
        Principal principal = securityContext.getUserPrincipal();
        String userId = principal.getName();
        Account currentAccount = accountSessionLocal.getAccount(Long.parseLong(userId));

        currentAccount.setName(a.getName());
        currentAccount.setContactDetails(a.getContactDetails());
        currentAccount.setEmail(a.getEmail());
        currentAccount.setPassword(a.getPassword());
        currentAccount.setImageURL(a.getImageURL());
        accountSessionLocal.updateAccount(currentAccount);
        return a;
    }

    @GET
    @Path("/getName/{account_id}")
    @Produces(MediaType.APPLICATION_JSON)
    public String getName(@PathParam("account_id") Long aId) {
        return accountSessionLocal.getName(aId);
    }

    @GET
    @Path("/getContact/{account_id}")
    @Produces(MediaType.APPLICATION_JSON)
    public String getContact(@PathParam("account_id") Long aId) {
        return accountSessionLocal.getContactDetails(aId);
    }

    @PUT
    @Path("/addEvent/{event_id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response addEvent(@QueryParam("aId") Long aId, @QueryParam("eId") Long eId) {
        Event e = eventSessionLocal.getEvent(eId);
        Account a = accountSessionLocal.getAccount(aId);
        accountSessionLocal.addNewEvent(a, e);
        return Response.status(204).build();
    }

    @PUT
    @Path("/joinEvent/")
    @Produces(MediaType.APPLICATION_JSON)
    public Response joinEvent(@QueryParam("aId") Long aId, @QueryParam("eId") Long eId) {
        Event e = eventSessionLocal.getEvent(eId);
        Account a = accountSessionLocal.getAccount(aId);
        accountSessionLocal.joinNewEvent(a, e);
        return Response.status(204).build();
    }

    @DELETE
    @Path("/removeEvent/{event_id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response removeEvent(@PathParam("event_id") Long eId, Long aId) {
        Event e = eventSessionLocal.getEvent(eId);
        Account a = accountSessionLocal.getAccount(aId);
        accountSessionLocal.removeEvent(a, e);
        return Response.status(204).build();
    }

    @DELETE
    @Path("/removeOrgEvent/{event_id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response removeOrgEvent(@PathParam("event_id") Long eId, Long aId) {
        Event e = eventSessionLocal.getEvent(eId);
        Account a = accountSessionLocal.getAccount(aId);
        accountSessionLocal.removeOrgEvent(a, e);
        return Response.status(204).build();
    }

    @PUT
    @Path("/joinEvent/{event_id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateAttendees(@PathParam("event_id") Long eId, List<Account> accounts) {
        Event e = eventSessionLocal.getEvent(eId);
        accountSessionLocal.updateAttendees(accounts, e);
        return Response.status(204).build();
    }
}
