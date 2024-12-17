package com.homemate.api.controller;

import com.homemate.api.model.Property;
import com.homemate.api.service.PropertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/properties")
@CrossOrigin(origins = "http://localhost:5173") // For Vite dev server
public class PropertyController {
    
    @Autowired
    private PropertyService propertyService;
    
    @GetMapping
    public List<Property> getAllProperties(
            @RequestParam(required = false) String type,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) Integer beds,
            @RequestParam(required = false) Integer baths,
            @RequestParam(required = false) List<String> amenities) {
        
        System.out.println("Received request with filters:");
        System.out.println("Type: " + type);
        System.out.println("Price range: " + minPrice + " - " + maxPrice);
        System.out.println("Beds: " + beds);
        System.out.println("Baths: " + baths);
        System.out.println("Amenities: " + amenities);
        
        List<Property> properties = propertyService.getAllProperties(type, minPrice, maxPrice, beds, baths, amenities);
        System.out.println("Returning " + properties.size() + " properties");
        return properties;
    }
    
    @GetMapping("/featured")
    public List<Property> getFeaturedProperties() {
        return propertyService.getFeaturedProperties();
    }
    
    @GetMapping("/search")
    public List<Property> searchProperties(@RequestParam String query) {
        return propertyService.searchProperties(query);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Property> getPropertyById(@PathVariable Long id) {
        return propertyService.getPropertyById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public Property createProperty(@RequestBody Property property) {
        return propertyService.saveProperty(property);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Property> updateProperty(
            @PathVariable Long id,
            @RequestBody Property property) {
        return propertyService.getPropertyById(id)
                .map(existingProperty -> {
                    property.setId(id);
                    return ResponseEntity.ok(propertyService.saveProperty(property));
                })
                .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProperty(@PathVariable Long id) {
        return propertyService.getPropertyById(id)
                .map(property -> {
                    propertyService.deleteProperty(id);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/test")
    public ResponseEntity<String> testEndpoint() {
        return ResponseEntity.ok("Backend is working!");
    }
} 