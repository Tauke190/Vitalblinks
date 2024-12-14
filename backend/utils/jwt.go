package utils

import (
	"github.com/golang-jwt/jwt"
	"os"
	"time"
)

type topions struct {
	secret *string
	time   *time.Duration
}

func GenerateJwtToken(data any, options *topions) (string, error) {
	defaultSecret := os.Getenv("JWT_SECRET")
	defaultTime := 24 * time.Hour

	if options.secret == nil {
		options.secret = &defaultSecret
	}

	if options.time == nil {
		options.time = &defaultTime
	}

	claims := jwt.MapClaims{}
	claims["exp"] = time.Now().Add(*options.time).Unix()
	claims["data"] = data

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(*options.secret))
}

func VerifyJwtToken(tokenString string, options *topions) (jwt.MapClaims, error) {
	defaultSecret := os.Getenv("JWT_SECRET")

	if options.secret == nil {
		options.secret = &defaultSecret
	}

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return []byte(*options.secret), nil
	})

	if err != nil {
		return nil, err
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok || !token.Valid {
		return nil, err
	}

	return claims, nil
}

func IsVerified(tokenString string, options *topions) bool {
	claims, err := VerifyJwtToken(tokenString, options)

	if err != nil {
		return false
	}

	if claims["status"] == "verified" {
		return true
	}

	return false
}
