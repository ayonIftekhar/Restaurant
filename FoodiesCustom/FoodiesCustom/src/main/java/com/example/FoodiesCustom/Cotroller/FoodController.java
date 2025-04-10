package com.example.FoodiesCustom.Cotroller;

import com.example.FoodiesCustom.FoodService.FoodRequest;
import com.example.FoodiesCustom.FoodService.FoodResponse;
import com.example.FoodiesCustom.FoodService.FoodService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.ListBucketsResponse;

import java.util.List;

@RestController
@RequestMapping("/api/foods")
@AllArgsConstructor
public class FoodController {

    public FoodService foodService;

    private S3Client s3Client;

    @GetMapping("/check-bucket")
    public ResponseEntity<String> checkBucket() {
        try {
            ListBucketsResponse response = s3Client.listBuckets();
            boolean bucketExists = response.buckets().stream()
                    .anyMatch(bucket -> bucket.name().equals("foodiescustom-foods"));

            if (bucketExists) {
                return ResponseEntity.ok("Bucket exists!");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Bucket NOT found!");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage());
        }
    }


    @PostMapping
    public FoodResponse addFood(@RequestPart("food") String foodString ,
                                @RequestPart("file")MultipartFile file){
        ObjectMapper objectMapper = new ObjectMapper();
        FoodRequest foodRequest = null;

        try{
            foodRequest = objectMapper.readValue(foodString , FoodRequest.class);
        }catch (Exception exception){
            ResponseEntity.badRequest().build();
        }
//        System.out.println(foodRequest);
//        System.out.println(foodString);
//        System.out.println(file.getOriginalFilename());
        return foodService.addFood(foodRequest,file);
    }

    @GetMapping
    public List<FoodResponse> retrieveAllFoods(){
        return foodService.getFoods();
    }

    @GetMapping("/{id}")
    public FoodResponse retrieveFood(@PathVariable String id){
        return foodService.retrieveFood(id);
    }

    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/{id}")
    public void deleteFood(@PathVariable String id){
        foodService.deleteById(id);
    }

}
