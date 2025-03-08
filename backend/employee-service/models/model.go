package models

type Employee struct {
	Name                   string `json:"name"`
	BirthDate              string `json:"birthDate"`
	Address                string `json:"address"`
	ContactNumber          string `json:"contactNumber"`
	EmergencyContactNumber int    `json:"emergencyContactNumber"`
}
