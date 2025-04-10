package com.example.FoodiesCustom.FoodService;

import com.example.FoodiesCustom.AwsConfiguration.AwsFileUpload;
import com.example.FoodiesCustom.DatabaseEntities.Food;
import com.example.FoodiesCustom.Repository.FoodsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.DeleteObjectResponse;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FoodServiceImplementation implements FoodService{

    @Autowired
    private AwsFileUpload awsFileUpload ;

    @Autowired
    private FoodsRepository foodsRepository;

    @Autowired
    private S3Client s3Client;

    @Override
    public FoodResponse addFood(FoodRequest foodRequest, MultipartFile path) {
        Food newFood = getFoodEntity(foodRequest);
        String url = awsFileUpload.uploadFile(path);
        if( url == null ) return null;
        newFood.setImageURL(url);
        newFood = foodsRepository.save(newFood);
        //System.out.println(newFood.toString());
        return generateFoodResponse( newFood );
    }

    @Override
    public List<FoodResponse> getFoods() {
        List<FoodResponse> foodResponses = new ArrayList<>();
        List<Food> allFoods = foodsRepository.findAll();
        for ( Food food : allFoods) foodResponses.add( generateFoodResponse(food));
        return foodResponses;
    }

    @Override
    public FoodResponse retrieveFood(String id){
        Optional<Food> food = foodsRepository.findById(id);
        if( food.isPresent())
            return generateFoodResponse( food.get());
        else
            throw new RuntimeException("food with provided id not present");
    }

    @Override
    public void deleteById(String id){
        FoodResponse food = this.retrieveFood(id);
        String filename = food.getImageURL().substring( food.getImageURL().lastIndexOf("/")+1 );
        if( removeFile(filename) ){
            foodsRepository.deleteById(id);
        }
    }

    private boolean removeFile(String filename){
        //System.out.println(filename);
        DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                .bucket("foodiescustom-foods")
                .key(filename)
                .build();
        DeleteObjectResponse response =  s3Client.deleteObject(deleteObjectRequest);
        return response.sdkHttpResponse().isSuccessful();
    }

    private FoodResponse generateFoodResponse(Food newFood) {
        return FoodResponse.builder()
                .id(newFood.getID())
                .name(newFood.getName())
                .category(newFood.getCategory())
                .price(newFood.getPrice())
                .description(newFood.getDescription())
                .imageURL(newFood.getImageURL())
                .build();
    }

    private Food getFoodEntity(FoodRequest foodRequest){
        return Food.builder()
                .name(foodRequest.getName())
                .price(foodRequest.getPrice())
                .category(foodRequest.getCategory())
                .description(foodRequest.getDescription())
                .build();
    }
}
