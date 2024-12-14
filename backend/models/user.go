package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type userInfo struct {
	ID                  primitive.ObjectID `bson:"_id,omitempty"`
	UserName            string             `bson:"username,omitempty"`
	Email               string             `bson:"email,omitempty"`
	Password            string             `bson:"password,omitempty"`
	Role                string             `bson:"role,omitempty"` // TODO: create a emum instead
	Organization_number string             `bson:"organization_number,omitempty"`
	Access_code         string             `bson:"access_code,omitempty"`
}

type adminUser struct {
	purchase_number int `bson:"purchase_number,omitempty"`
}

type User struct {
	userInfo
	adminUser
}
