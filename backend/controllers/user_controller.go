package controllers

import (
	"context"
	"encoding/json"
	"net/http"
	"time"

	"vitalblinks-server/config"
	"vitalblinks-server/models"
	"vitalblinks-server/utils"

	"go.mongodb.org/mongo-driver/bson"
)

type UnverifiedUser struct {
	Email  string `json:"email"`
	Role   string `json:"role"`
	Status string `json:"status"`
}

func RegisterUser(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var userCollection = config.DB.Collection("users")

	w.Header().Set("Content-Type", "application/json")

	// getting the user data from the request body
	var user models.User
	err := json.NewDecoder(r.Body).Decode(&user)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// checking user existence before registration
	var existingUser models.User
	err = userCollection.FindOne(ctx, bson.M{"email": user.UserInfo.Email}).Decode(&existingUser)

	if err == nil {
		http.Error(w, "User already exists", http.StatusBadRequest)
		return
	}

	// hashing the password before storing it in the database
	user.UserInfo.Password, err = utils.HashPassword(user.UserInfo.Password)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	_, err = userCollection.InsertOne(ctx, user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// since while creation no user is verified
	user.UserInfo.Verified = false
	// generating a jwt token
	token, err := utils.GenerateJwtToken(user, nil)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	cookies := &http.Cookie{
		Name:     "auth_token",
		Value:    token,
		SameSite: http.SameSiteStrictMode,
		Expires:  time.Now().Add(24 * time.Hour),
		Secure:   true,
		HttpOnly: true,
	}

	http.SetCookie(w, cookies)

	responseData := map[string]interface{}{
		"email":    user.UserInfo.Email,
		"verified": user.UserInfo.Verified,
	}

	json.NewEncoder(w).Encode(responseData)
}

func LoginUser(w http.ResponseWriter, r *http.Request) {
	var userCollection = config.DB.Collection("users")

	w.Header().Set("Content-Type", "application/json")

	// getting the user data from the request body
	var user models.User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// checking user existence before login
	var existingUser models.User
	err = userCollection.FindOne(ctx, bson.M{"email": user.UserInfo.Email}).Decode(&existingUser)

	if err != nil {
		http.Error(w, "User not found", http.StatusBadRequest)
		return
	}

	if existingUser.Password != user.Password {
		http.Error(w, "Invalid password", http.StatusBadRequest)
		return
	}

	json.NewEncoder(w).Encode(existingUser)
}

func ForgotPassword(w http.ResponseWriter, r *http.Request) {
	var userCollection = config.DB.Collection("users")

	w.Header().Set("Content-Type", "application/json")

	// getting the user data from the request body
	var requestData struct {
		Email string `json:"email"`
		Mode  string `json:"mode"`
	}

	err := json.NewDecoder(r.Body).Decode(requestData)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// checking user existence before password reset
	var existingUser models.User
	err = userCollection.FindOne(ctx, bson.M{"email": requestData.Email}).Decode(&existingUser)

	if err != nil {
		http.Error(w, "User not found", http.StatusBadRequest)
		return
	}

	// Generating opt
	// TODO: Implement a function to generate OTP or magic link according to the user
	// otp := generateOTP()

	// Sending the OTP to the user via email
	// TODO: Setup email sending client
}
