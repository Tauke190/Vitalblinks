package controllers

import (
	"context"
	"encoding/json"
	"net/http"
	"time"

	"vitalblinks-server/config"
	"vitalblinks-server/models"

	"go.mongodb.org/mongo-driver/mongo"
)

var userCollection = config.DB.Collection("users")

func CreateUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var user models.User
	_ = json.NewDecoder(r.Body).Decode(&user)

	// inserting user into the database with 5 seconds timeout
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	result, err := userCollection.InsertOne(ctx, user)

	if err != nil {
		http.Error(w, "Error inserting user", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(result)
}

func UpdateUser(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/json")

	var user models.User
	_ = json.NewDecoder(r.Body).Decode(&user)

	// inserting user into the database with 5 seconds timeout
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	result, err := userCollection.UpdateByID(ctx, user.ID, user)

	if err != nil {
		http.Error(w, "Error updating user", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(result)
}

func DeleteUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var userId string

	// inserting user into the database with 5 seconds timeout
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	result, err := userCollection.DeleteOne(ctx, { ID: userId })

	if err != nil {
		http.Error(w, "Error deleting user", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(result)
}

func GetUsers(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// inserting user into the database with 5 seconds timeout
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	cursor, err := userCollection.Find(ctx, {})

	if err != nil {
		http.Error(w, "Error fetching users", http.StatusInternalServerError)
		return
	}

	var users []models.User
	if err = cursor.All(ctx, &users); err != nil {
		http.Error(w, "Error fetching users", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(users)
}
