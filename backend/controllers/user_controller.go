package controllers

import (
	"context"
	"encoding/json"
	"net/http"
	"time"

	"vitalblinks-server/config"
	"vitalblinks-server/models"

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

	// hashing the user password
	// TODO: Implement a hashing function
	// user.Password = hash(user.Password)

	_, err = userCollection.InsertOne(ctx, user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

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
