package com.example.FoodiesCustom.Repository;

import com.example.FoodiesCustom.DatabaseEntities.Food;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FoodsRepository extends MongoRepository<Food, String> {

}
