package controllers

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"vitalblinks-server/config"
	"vitalblinks-server/models"
	"vitalblinks-server/utils"

	"go.mongodb.org/mongo-driver/bson"
)

func RegisterUser(w http.ResponseWriter, r *http.Request) {
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
	err = userCollection.FindOne(ctx, bson.M{"email": user.Email}).Decode(&existingUser)

	if err == nil {
		http.Error(w, "User already exists", http.StatusBadRequest)
		return
	}

	// hashing the password before storing it in the database
	user.Password, err = utils.HashPassword(user.Password)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	_, err = userCollection.InsertOne(ctx, user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// generating a jwt token

	json.NewEncoder(w).Encode(user)
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
	err = userCollection.FindOne(ctx, bson.M{"email": user.Email}).Decode(&existingUser)

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
