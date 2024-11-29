package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var collection *mongo.Collection
var ctx = context.TODO()

func initDB() {
	clientOptions := options.Client().ApplyURI("mongodb://localhost:27017/")
	client, err := mongo.Connect(ctx, clientOptions)

	if err != nil {
		log.Fatal(err)
	}

	collection = client.Database("vital").Collection("auth")
}

func main() {

	// reading the environment variables
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	/* // establishing the db connection
	initDB() */

	r := mux.NewRouter()
	// handeling the routing portion
	http.Handle("/", r)

	port := os.Getenv("PORT")

	// server configuration
	svr := &http.Server{
		Handler: r,
		Addr:    fmt.Sprintf("127.0.0.1:%s", port),

		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	fmt.Println("The server is running in 127.0.0.1:3001")
	// runs the server
	log.Fatal(svr.ListenAndServe())
}
