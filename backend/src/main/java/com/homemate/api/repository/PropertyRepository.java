package com.homemate.api.repository;

import com.homemate.api.model.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface PropertyRepository extends JpaRepository<Property, Long> {
    List<Property> findByType(String type);
    List<Property> findByIsFeaturedTrue();
    
    @Query("SELECT p FROM Property p WHERE " +
           "LOWER(p.title) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(p.address) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Property> searchProperties(String query);

    @Query("SELECT p FROM Property p WHERE " +
           "(:type IS NULL OR :type = 'all' OR p.type = :type) AND " +
           "(:minPrice IS NULL OR p.price >= :minPrice) AND " +
           "(:maxPrice IS NULL OR p.price <= :maxPrice) AND " +
           "(:beds IS NULL OR p.beds >= :beds) AND " +
           "(:baths IS NULL OR p.baths >= :baths)")
    List<Property> findPropertiesWithFilters(
        @Param("type") String type,
        @Param("minPrice") Double minPrice,
        @Param("maxPrice") Double maxPrice,
        @Param("beds") Integer beds,
        @Param("baths") Integer baths
    );

    @Query("SELECT p FROM Property p ORDER BY p.createdAt DESC")
    List<Property> findAllProperties();
} 