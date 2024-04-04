/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package webservices.restful;

import java.util.Set;
import javax.ws.rs.core.Application;

/**
 *
 * @author admin
 */
@javax.ws.rs.ApplicationPath("webresources")
public class ApplicationConfig extends Application {

    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> resources = new java.util.HashSet<>();
        addRestResourceClasses(resources);
        return resources;
    }

    /**
     * Do not modify addRestResourceClasses() method.
     * It is automatically populated with
     * all resources defined in the project.
     * If required, comment out calling this method in getClasses().
     */
    private void addRestResourceClasses(Set<Class<?>> resources) {
        resources.add(webservices.restful.AccountResource.class);
        resources.add(webservices.restful.AuthenticationFilter.class);
        resources.add(webservices.restful.CORSFilter.class);
        resources.add(webservices.restful.EventResource.class);
        resources.add(webservices.restful.ProtectedResource.class);
    }
    
}
