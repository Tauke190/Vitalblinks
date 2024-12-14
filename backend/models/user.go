package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type UserInfo struct {
	ID                  primitive.ObjectID `bson:"_id,omitempty"`
	FirstName           string             `bson:"first_name,omitempty"`
	LastName            string             `bson:"last_name,omitempty"`
	Email               string             `bson:"email,omitempty"`
	Password            string             `bson:"password,omitempty"`
	Role                string             `bson:"role,omitempty"` // TODO: create a emum instead
	Organization_number int                `bson:"organization_number,omitempty"`
	Access_code         string             `bson:"access_code,omitempty"`
	Verified            bool               `bson:"verified,omitempty"`
}

type AdminDetails struct {
	Purchase_number int `bson:"purchase_number,omitempty"`
}

type User struct {
	UserInfo
	AdminDetails
}
