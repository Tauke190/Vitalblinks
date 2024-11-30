package controllers

import (
	"net/http"
)

func CreateUser(w http.ResponseWriter, r *http.Request) {
	println("Create user called")
}

func UpdateUser(w http.ResponseWriter, r *http.Request) {
	println("update user called")
}

func DeleteUser(w http.ResponseWriter, r *http.Request) {
	println("Delete user called")
}

func GetUsers(w http.ResponseWriter, r *http.Request) {
	println("Create user called")
}
