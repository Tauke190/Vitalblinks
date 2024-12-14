package routes

import (
	"vitalblinks-server/controllers"

	"github.com/gorilla/mux"
)

func UserRoutes(r *mux.Router) {
	r.HandleFunc("/auth/register", controllers.RegisterUser).Methods("POST", "OPTIONS")
	r.HandleFunc("/auth/login", controllers.LoginUser).Methods("POST")
	r.HandleFunc("/auth/forgot-password", controllers.ForgotPassword).Methods("POST")
}
