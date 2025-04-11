package com.example.FoodiesCustom.Cotroller;

import com.example.FoodiesCustom.DatabaseEntities.Order;
import com.example.FoodiesCustom.DatabaseEntities.User;
import com.example.FoodiesCustom.OrderService.OrderRequest;
import com.example.FoodiesCustom.OrderService.OrderServiceImpl;
import com.example.FoodiesCustom.Repository.OrderRepository;
import com.example.FoodiesCustom.Repository.UserRepository;
import com.example.FoodiesCustom.SecurityConfiguration.JwtUtility;
import com.example.FoodiesCustom.UserService.UserServiceImpl;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Value("${store.id}")
    private String storeKey;

    @Value("${store.pass}")
    private String storePass;

    @Autowired
    private JwtUtility jwtUtility;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderServiceImpl orderService;

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private OrderRepository orderRepository;

    @PostMapping("/init")
    public ResponseEntity<?> initializePayment(@RequestHeader("Authorization") String jwt,@RequestBody OrderRequest request){

        //extract the token
        String token = jwt.replace("Bearer ","");
        String userName = jwtUtility.extractUserName(token);

        //extract User Details
        User currentUser = userRepository.findByEmail(userName).get();

        //we need to send a POST request here to init payment
        String url = "https://sandbox.sslcommerz.com/gwprocess/v4/api.php";
        String tran_id = UUID.randomUUID().toString();

        //we create the request body from scratch
        Map<String ,String> payload = new LinkedHashMap<>();
        payload.put("store_id", storeKey);
        payload.put("store_passwd", storePass);
        payload.put("total_amount", "" + request.getPrice());
        payload.put("currency", "BDT");
        payload.put("tran_id", tran_id);
        payload.put("success_url", "https://restaurant-gwgl.onrender.com/api/payment/success");
        payload.put("fail_url", "https://restaurant-gwgl.onrender.com/api/payment/fail");
        payload.put("cancel_url", "https://restaurant-gwgl.onrender.com/api/payment/cancel");
        payload.put("cus_name", request.getFirstName() + " " + request.getLastName());
        payload.put("cus_email", request.getEmail());
        payload.put("cus_add1", request.getAddress());
        payload.put("cus_city", request.getState());
        payload.put("cus_country", "Bangladesh");
        payload.put("cus_phone", currentUser.getPhone() + "");
        payload.put("shipping_method", "NO");
        payload.put("ship_name", request.getFirstName() + " " + request.getLastName());
        payload.put("ship_add1", request.getAddress());
        payload.put("ship_city", request.getState());
        payload.put("ship_country", "Bangladesh");
        payload.put("product_name", "Food Items");
        payload.put("product_category", "Food");
        payload.put("product_profile", "general");

        //sending post request to ssl commerce
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
        formData.setAll(payload);

        HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(formData, headers);


        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Map> sslResponse = restTemplate.postForEntity(url, entity, Map.class);

        //getting the payment url
        Map body = sslResponse.getBody();
        String gatewayUrl = (String) body.get("GatewayPageURL");

        if("SUCCESS".equalsIgnoreCase(body.get("status").toString())){
            orderService.addOrder(request,currentUser.getId() ,tran_id);
            return ResponseEntity.ok(Map.of("url", gatewayUrl));
        }
        return (ResponseEntity<?>) ResponseEntity.badRequest();
    }

    @CrossOrigin("*")
    @RequestMapping(value = "/success", method = {RequestMethod.GET, RequestMethod.POST})
    public void paymentSuccess(@RequestParam String tran_id,
            @RequestParam String val_id,
            HttpServletResponse response) throws IOException {

        // Step 2: Check if it's a real success
        if (this.requestValidation(val_id)) {
            orderService.updatePaymentStatus(tran_id);
            userService.clearCart(orderRepository.findByTransactionId(tran_id).getUserId());
        }
        response.sendRedirect("http://localhost:5173/order-history");
    }


    @CrossOrigin("*")
    @RequestMapping(value = "/fail", method = {RequestMethod.GET, RequestMethod.POST})
    public void paymentFail(@RequestParam String tran_id , HttpServletResponse response) throws IOException {

        orderService.deleteByTransactionId(tran_id);
        response.sendRedirect("http://localhost:5173/order");
    }

    private boolean requestValidation(String val_id){
        String validationURL = "https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php"
                + "?val_id=" + URLEncoder.encode(val_id, StandardCharsets.UTF_8)
                + "&store_id=" + storeKey
                + "&store_passwd=" + storePass
                + "&v=1&format=json";

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Map> validationResponse = restTemplate.getForEntity(validationURL, Map.class);

        Map result = validationResponse.getBody();
        return "VALID".equals(result.get("status"));
    }

}
