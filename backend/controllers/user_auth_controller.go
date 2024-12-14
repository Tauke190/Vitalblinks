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
	"go.mongodb.org/mongo-driver/mongo"
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
	err = userCollection.FindOne(ctx, bson.M{"userinfo.email": user.UserInfo.Email}).Decode(&existingUser)

	if err == nil {
		w.WriteHeader(http.StatusConflict)
		json.NewEncoder(w).Encode(map[string]string{"message": "User already exists"})
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
	return
}

func LoginUser(w http.ResponseWriter, r *http.Request) {
	var userCollection = config.DB.Collection("users")

	w.Header().Set("Content-Type", "application/json")

	// getting the user data from the request body
	type requestUserType struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	requestUser := requestUserType{}

	err := json.NewDecoder(r.Body).Decode(&requestUser)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// checking user existence before login
	var existingUser models.User
	err = userCollection.FindOne(ctx, bson.M{"userinfo.email": requestUser.Email}).Decode(&existingUser)

	if err != nil {
		if err == mongo.ErrNoDocuments {
			w.WriteHeader(http.StatusNotFound)
			json.NewEncoder(w).Encode(map[string]string{"message": "User not found"})
			return
		}

		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// comparing the password
	correctPassword := utils.ComparePassword(existingUser.UserInfo.Password, requestUser.Password)
	if !correctPassword {
		w.WriteHeader(http.StatusForbidden)
		json.NewEncoder(w).Encode(map[string]string{"message": "Invalid credentials"})
		return
	}

	// generating a jwt token
	token, err := utils.GenerateJwtToken(existingUser, nil)

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
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(existingUser)

	return
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
