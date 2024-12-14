package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type UserInfo struct {
	ID                  primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	FirstName           string             `bson:"first_name" json:"first_name"`
	LastName            string             `bson:"last_name" json:"last_name"`
	Email               string             `bson:"email" json:"email"`
	Password            string             `bson:"password" json:"password"`
	Role                string             `bson:"role" json:"role"` // TODO: create a emum instead
	Organization_number int                `bson:"organization_number" json:"organization_number"`
	Access_code         string             `bson:"access_code" json:"access_code"`
	Verified            bool               `bson:"verified" json:"verified"`
}

type AdminDetails struct {
	Purchase_number int `json:"purchase_number" json:"purchase_number"`
}

type User struct {
	UserInfo
	AdminDetails
}
