package com.example.FoodiesCustom.FoodService;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class FoodResponse {
    private String id ;
    private String name ;
    private String description ;
    private String category ;
    private double price ;
    private String imageURL ;
}
