package config

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var DB *mongo.Database

func ConnectDB() {
	CONNECTION_STRING, exists := os.LookupEnv("DB_CONNECTION_STRING")

	if !exists {
		log.Fatal("Connection string not found in the environment.")
	}

	if CONNECTION_STRING == "" {
		log.Fatal("Connection string is found but is empty in the environment.")
	}

	clientOptions := options.Client().ApplyURI(CONNECTION_STRING)

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	client, err := mongo.Connect(ctx, clientOptions)

	if err != nil {
		log.Fatalf("Error connecting to the database: %v", err)
	}

	// checkig the database connection
	err = client.Ping(ctx, nil)
	if err != nil {
		log.Fatalf("Error pinging the database: %v", err)
	}

	fmt.Println("Pinged the database, connection successfull")

	DB_NAME, exists := os.LookupEnv("DB_NAME")
	if !exists {
		log.Fatal("Database name not found in the environment")
	}

	if DB_NAME == "" {
		log.Fatal("Database name is empty in the environment")
	}

	DB = client.Database(DB_NAME)

	if DB == nil {
		log.Fatal("Database connection failed")
	}
}
