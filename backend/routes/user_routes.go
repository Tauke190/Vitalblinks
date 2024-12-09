package routes

import (
	"vitalblinks-server/controllers"

	"github.com/gorilla/mux"
)

func UserRoutes(r *mux.Router) {
	r.HandleFunc("/user/register", controllers.RegisterUser).Methods("POST")
	r.HandleFunc("/user/login", controllers.LoginUser).Methods("POST")
	r.HandleFunc("/user/forgot-password", controllers.ForgotPassword).Methods("POST")
}
