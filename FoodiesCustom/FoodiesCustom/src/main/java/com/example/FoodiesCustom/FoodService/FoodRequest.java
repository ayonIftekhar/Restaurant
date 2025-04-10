package com.example.FoodiesCustom.FoodService;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FoodRequest {
    private String name ;
    private String description ;
    private String category ;
    private double price ;
}
