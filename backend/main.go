package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"time"
	"vitalblinks-server/config"
	"vitalblinks-server/routes"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
)

func main() {
	// reading the environment variables
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	// connecting with the database
	config.ConnectDB()

	router := mux.NewRouter()
	// handeling the routing portion
	http.Handle("/", router)

	// handling the user routes
	routes.UserRoutes(router)

	port := os.Getenv("PORT")

	// server configuration
	svr := &http.Server{
		Handler: router,
		Addr:    fmt.Sprintf("127.0.0.1:%s", port),

		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	fmt.Println("The server is running in 127.0.0.1:3001")
	// runs the server
	log.Fatal(svr.ListenAndServe())
}
