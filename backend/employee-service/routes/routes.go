// routes/routes.go
package routes

import (
	"employee-service/controllers"
	"net/http"
)

func RegisterRoutes() {
	http.HandleFunc("/getemp", controllers.GetEmployees)   // Get all employees
	http.HandleFunc("/create", controllers.CreateEmployee) // Create a new employee
}
