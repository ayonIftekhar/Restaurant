package com.example.FoodiesCustom.Repository;


import com.example.FoodiesCustom.DatabaseEntities.User;
import com.mongodb.client.MongoDatabase;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User,String> {
    Optional<User> findByEmail(String email);
}
