package com.example.FoodiesCustom.DatabaseEntities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "Foods")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Food {

    @Id
    private String iD ;

    private String name ;
    private String description ;
    private String category ;
    private double price ;
    private String imageURL ;
}
