package routes

import (
	"vitalblinks-server/controllers"

	"github.com/gorilla/mux"
)

func UserRoutes(router *mux.Router) {
	router.HandleFunc("/api/user", controllers.FetchMyData).Methods("GET", "OPTIONS")
}
