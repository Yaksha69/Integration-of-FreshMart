package controllers

import (
	"context"
	"employee-service/models"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"sync"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var (
	client     *mongo.Client
	collection *mongo.Collection
	mu         sync.Mutex
)

func init() {
	// Load environment variables from .env file
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// Create a MongoDB client and connect to MongoDB
	mongoURI := os.Getenv("MONGODB_URI")
	client, err = mongo.NewClient(options.Client().ApplyURI(mongoURI))
	if err != nil {
		log.Fatal(err)
	}

	// Connect to the MongoDB server
	err = client.Connect(context.TODO())
	if err != nil {
		log.Fatal(err)
	}

	// Get the "employees" collection from the "employee-service" database
	collection = client.Database("dbFreshMart").Collection("employees")
	fmt.Println("Connected to MongoDB")
}

func GetEmployees(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	mu.Lock()
	defer mu.Unlock()

	// Retrieve all employees from MongoDB
	cursor, err := collection.Find(context.TODO(), bson.D{{}})
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer cursor.Close(context.TODO())

	var employees []models.Employee
	for cursor.Next(context.TODO()) {
		var employee models.Employee
		if err := cursor.Decode(&employee); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		employees = append(employees, employee)
	}

	if err := cursor.Err(); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(employees)
}

func CreateEmployee(w http.ResponseWriter, r *http.Request) {
	var newEmployee models.Employee
	if err := json.NewDecoder(r.Body).Decode(&newEmployee); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	mu.Lock()
	defer mu.Unlock()

	// Insert the new employee into MongoDB
	insertResult, err := collection.InsertOne(context.TODO(), newEmployee)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	fmt.Printf("Inserted new employee with ID: %v\n", insertResult.InsertedID)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(newEmployee)
}
