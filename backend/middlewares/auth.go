package middlewares

import (
	"encoding/json"
	"io"
	"net/http"
	"vitalblinks-server/utils"
)

func CheckAuth(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}

		token, err := r.Cookie("auth_token")

		if err != nil || token.Value == "" || token == nil {
			w.WriteHeader(http.StatusInternalServerError)
			json.NewEncoder(w).Encode(
				map[string]string{
					"message": "Something went wrong while getting user data",
				})
			return
		}

		// getting user status
		// TODO: Redirect unverifed user to verification route.
		userData, err := utils.ExtractJWTInfo(token.Value)

		if err != nil {
			w.WriteHeader(http.StatusUnauthorized)
			json.NewEncoder(w).Encode(
				map[string]string{
					"message": "Access denied please authenticate.",
				})
		}

		var bodyData map[string]interface{}

		// extracting the actual request body and adding user data there
		if r.Body != nil {
			// reading entire body
			bodyBytes, err := io.ReadAll(r.Body)
			if err != nil {
				w.WriteHeader(http.StatusInternalServerError)
				json.NewEncoder(w).Encode(map[string]string{
					"message": "Error Occured while processing request body",
				})
				return
			}

			err = r.Body.Close() // closing the original body

			if err != nil {
				w.WriteHeader(http.StatusInternalServerError)
				json.NewEncoder(w).Encode(map[string]string{
					"message": "Error Occured while closing request body",
				})
				return
			}

			if len(bodyBytes) > 0 {
				err = json.Unmarshal(bodyBytes, &bodyData)

				if err != nil {
					w.WriteHeader(http.StatusInternalServerError)
					json.NewEncoder(w).Encode(map[string]string{
						"message": "Error Occured while unpacking request body",
					})
					return
				}
			}
		}

		if bodyData == nil {
			// if body is nill making space for new map
			// As go freeks out when assigning to nil map
			bodyData = make(map[string]interface{})
		}

		// Add proper type to it which will make it easier in other requests
		bodyData["user"] = userData

		next.ServeHTTP(w, r)
	})
}
