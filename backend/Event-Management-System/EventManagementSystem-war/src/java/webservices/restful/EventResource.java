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
import java.util.Date;
import java.util.List;
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
import javax.ws.rs.PathParam;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.GenericEntity;
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
    @EJB
    private EventSessionLocal eventSessionLocal;
    @EJB
    private AccountSessionLocal accountSessionLocal;

    @GET
    @Secured
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllEvent(@Context SecurityContext securityContext) {
        List<Event> allEvents = eventSessionLocal.getAllEvents();

        try {
            for (Event e : allEvents) {
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

            return Response.ok(allEvents).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Error fetching all events")
                    .build();
        }
    }

    @GET
    @Secured
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response getEvent(@Context SecurityContext securityContext, @PathParam("id") Long eId) {
        Event e = eventSessionLocal.getEvent(eId);
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

        return Response.ok(e).build();
    }

    @GET
    @Secured
    @Path("/participants/{event_id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getParticipants(@PathParam("event_id") Long eId) {
        Event e = eventSessionLocal.getEvent(eId);

        List<Account> participants = e.getParticipants();

        for (Account a : participants) {
            a.setAttendedEvents(null);
            a.setJoinedEvents(null);
            a.setOrganisedEvents(null);
        }

        return Response.ok(participants).build();
    }

    @GET
    @Secured
    @Path("/isRegistered/{event_id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response isRegistered(@Context SecurityContext securityContext, @PathParam("event_id") Long eId) {
        Principal principal = securityContext.getUserPrincipal();
        String userId = principal.getName();

        Account a = accountSessionLocal.getAccount(Long.parseLong(userId));
        Event e = eventSessionLocal.getEvent(eId);

        Boolean registered = e.getParticipants().contains(a);

        return Response.ok(registered).build();
    }

    @GET
    @Secured
    @Path("/attendees/{event_id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAttendees(@PathParam("event_id") Long eId) {
        Event e = eventSessionLocal.getEvent(eId);
        
        List<Account> attendees = e.getAttendees();
        for (Account a : attendees) {
            a.setAttendedEvents(null);
            a.setJoinedEvents(null);
            a.setOrganisedEvents(null);
        }

        GenericEntity<List<Account>> entity = new GenericEntity<List<Account>>(attendees){};
        return Response.status(200).entity(
                    entity
            ).build(); 
    }

    @POST
    @Secured
    @Path("/addParticipant")
    @Produces(MediaType.APPLICATION_JSON)
    public Response addParticipant(@Context SecurityContext securityContext, @QueryParam("eId") Long eId) {
        Principal principal = securityContext.getUserPrincipal();
        String userId = principal.getName();

        Account a = accountSessionLocal.getAccount(Long.parseLong(userId));
        Event e = eventSessionLocal.getEvent(eId);

        if (e.getDeadline().before(new Date())) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("It is already passed the event deadline!")
                    .build();
        }

        eventSessionLocal.addParticipant(a, e);
        accountSessionLocal.joinNewEvent(a, e);
        return Response.ok().build();
    }

    @POST
    @Secured
    @Path("/removeParticipant")
    @Produces(MediaType.APPLICATION_JSON)
    public Response removeParticipant(@Context SecurityContext securityContext, @QueryParam("eId") Long eId) {
        Principal principal = securityContext.getUserPrincipal();
        String userId = principal.getName();

        Account a = accountSessionLocal.getAccount(Long.parseLong(userId));
        Event e = eventSessionLocal.getEvent(eId);

        eventSessionLocal.removeParticipant(a, e);
        accountSessionLocal.removeEvent(a, e);
        return Response.ok().build();
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

    @POST
    @Path("/updateAttendees/{event_id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateAttendees(@PathParam("event_id") Long eId, List<Account> attendees) {
        Event e = eventSessionLocal.getEvent(eId);

        for (Account a: attendees) {
            System.out.println(a.getAttendedEvents());
            System.out.println(a.getJoinedEvents());
        }
        
        accountSessionLocal.updateAttendees(attendees, e);
        eventSessionLocal.updateAttendees(attendees, e);
        
        for (Account a: attendees) {
            System.out.println(a.getAttendedEvents());
            System.out.println(a.getJoinedEvents());
        }
        
        JsonObject successMessage = Json.createObjectBuilder()
                .add("message", "Event's attendance succesfully marked")
                .build();
        return Response.status(200).entity(successMessage)
                .type(MediaType.APPLICATION_JSON).build();
    }
    

    @DELETE
    @Secured
    @Path("/deleteEvent/{event_id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteEvent(@Context SecurityContext securityContext, @PathParam("event_id") Long eId) {
        try {
            Principal principal = securityContext.getUserPrincipal();
            String userId = principal.getName();

            Account a = accountSessionLocal.getAccount(Long.parseLong(userId));
            Event e = eventSessionLocal.getEvent(eId);

            accountSessionLocal.removeOrgEvent(a, e);

            List<Account> registeredUsers = e.getParticipants();
            for (Account account: registeredUsers) {
                eventSessionLocal.removeParticipant(account, e);
                accountSessionLocal.removeEvent(account, e);
            }
            
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
