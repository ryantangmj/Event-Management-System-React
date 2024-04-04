/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/WebServices/GenericResource.java to edit this template
 */
 /*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/WebServices/GenericResource.java to edit this template
 */
package webservices.restful;

import entity.Account;
import entity.Event;
import java.security.Principal;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Locale;
import javax.ejb.EJB;
import javax.json.Json;
import javax.json.JsonObject;
import javax.persistence.NoResultException;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
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
@Path("event")
public class EventResource {

    SimpleDateFormat inputFormat = new SimpleDateFormat("EEE, dd MMM yyyy HH:mm:ss 'GMT'", Locale.ENGLISH);
    @EJB
    private EventSessionLocal eventSessionLocal;
    @EJB
    private AccountSessionLocal accountSessionLocal;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Event> getAllEvent() {
        return eventSessionLocal.getAllEvents();
    }

    @GET
    @Path("/participants/{event_id}")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Account> getParticipants(@PathParam("event_id") Long eId) {
        return eventSessionLocal.retrieveParticipants(eId);
    }

    @GET
    @Path("/attendees/{event_id}")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Account> getAttendees(@PathParam("event_id") Long eId) {
        return eventSessionLocal.retrieveAttendees(eId);
    }

    @GET
    @Path("/{event_id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Event getEvent(@PathParam("event_id") Long eId) {
        return eventSessionLocal.getEvent(eId);
    }

    @PUT
    @Path("addParticipant")
    @Produces(MediaType.APPLICATION_JSON)
    public void addParticipant(@QueryParam("aId") Long aId, @QueryParam("eId") Long eId) {
        Event e = eventSessionLocal.getEvent(eId);
        Account a = accountSessionLocal.getAccount(aId);

        eventSessionLocal.addParticipant(a, e);
    }

    @PUT
    @Path("/removeParticipant")
    @Produces(MediaType.APPLICATION_JSON)
    public void removeParticipant(@QueryParam("aId") Long aId, @QueryParam("eId") Long eId) {
        Event e = eventSessionLocal.getEvent(eId);
        Account a = accountSessionLocal.getAccount(aId);

        eventSessionLocal.removeParticipant(a, e);
    }

    @POST
    @Secured
    @Path("/createEvent")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createEvent(@Context SecurityContext securityContext, Event e) {
        Principal principal = securityContext.getUserPrincipal();
        String userId = principal.getName();
        
        Account a = accountSessionLocal.getAccount(Long.parseLong(userId));
        e.setOrganiser(a);
        eventSessionLocal.createEvent(a, e);
        accountSessionLocal.addNewEvent(a, e);

        JsonObject successMessage = Json.createObjectBuilder()
                .add("message", "Event created successfully")
                .build();
        return Response.status(200).entity(successMessage)
                .type(MediaType.APPLICATION_JSON).build();
    }

    @PUT
    @Path("/updateAttendees/{event_id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Event updateAttendees(@PathParam("event_id") Long eId, List<Account> accounts) {
        Event e = eventSessionLocal.getEvent(eId);
        eventSessionLocal.updateAttendees(accounts, e);
        return e;
    }

    @DELETE
    @Path("/deleteEvent/{event_id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteEvent(@PathParam("event_id") Long eId) {
        try {
            Event e = eventSessionLocal.getEvent(eId);
            eventSessionLocal.removeOrgEvent(e);
            return Response.status(204).build();
        } catch (NoResultException e) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Event cannot be deleted")
                    .build();
            return Response.status(404).entity(exception).build();
        }
    }
}
