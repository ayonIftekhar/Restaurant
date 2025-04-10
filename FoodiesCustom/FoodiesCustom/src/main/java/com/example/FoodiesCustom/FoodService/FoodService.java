package com.example.FoodiesCustom.FoodService;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface FoodService {
    FoodResponse addFood(FoodRequest foodRequest , MultipartFile path);

    List<FoodResponse> getFoods();

    FoodResponse retrieveFood(String id);

    void deleteById(String id);

}
