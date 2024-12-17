package com.homemate.api.service;

import com.homemate.api.model.Property;
import com.homemate.api.repository.PropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

@Service
public class PropertyService {
    
    @Autowired
    private PropertyRepository propertyRepository;
    
    @Autowired
    private EntityManager entityManager;
    
    public List<Property> getAllProperties(
            String type,
            Double minPrice,
            Double maxPrice,
            Integer beds,
            Integer baths,
            List<String> amenities) {
            
        // For initial load without filters, return all properties
        if (isNoFiltersApplied(type, minPrice, maxPrice, beds, baths, amenities)) {
            List<Property> allProperties = propertyRepository.findAllProperties();
            System.out.println("Returning all properties: " + allProperties.size());
            return allProperties;
        }
        
        // Use filters if any are applied
        List<Property> filteredProperties = propertyRepository.findPropertiesWithFilters(
            type, minPrice, maxPrice, beds, baths
        );
        
        // Filter by amenities if needed
        if (amenities != null && !amenities.isEmpty()) {
            filteredProperties = filteredProperties.stream()
                .filter(p -> p.getAmenities().stream()
                    .anyMatch(a -> amenities.contains(a.getAmenities())))
                .toList();
        }
        
        System.out.println("Returning filtered properties: " + filteredProperties.size());
        return filteredProperties;
    }
    
    private boolean isNoFiltersApplied(
            String type,
            Double minPrice,
            Double maxPrice,
            Integer beds,
            Integer baths,
            List<String> amenities) {
        return (type == null || type.equals("all")) &&
               minPrice == null &&
               maxPrice == null &&
               beds == null &&
               baths == null &&
               (amenities == null || amenities.isEmpty());
    }
    
    public Optional<Property> getPropertyById(Long id) {
        return propertyRepository.findById(id);
    }
    
    public List<Property> getFeaturedProperties() {
        return propertyRepository.findByIsFeaturedTrue();
    }
    
    public List<Property> searchProperties(String query) {
        return propertyRepository.searchProperties(query);
    }
    
    public Property saveProperty(Property property) {
        return propertyRepository.save(property);
    }
    
    public void deleteProperty(Long id) {
        propertyRepository.deleteById(id);
    }
} 