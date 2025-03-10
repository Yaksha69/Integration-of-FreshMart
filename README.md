# FreshMart Integrated Enterprise System

## A simple implementation of Service Oriented Architecture (SOA) using nodejs

FreshMart is a fictitious grocery store for which this project provides an Integrated Enterprise System. The system includes the following key services:
* ### Point of Sale (POS)
  Handles transactions and customer purchases.
  Provides charts and graphs to track streaks, completion rates, and overall progress over time.
* ### Authentication Service
  Manages user authentication and authorization.
* ### Inventory Management
  Tracks and updates stock levels in real-time.

## Tech Stack
* ### Backend: NodeJS
* ### Database: MongoDB (or any preferred database)
* ### Authentication: JWT-based authentication

Endpoints
Employee:
 api/v1/employee/all
 api/v1/employee/new

Inventory:
 api/v1/inventory/all
 api/v1/inventory/new

POS:
 api/v1/pos/new
 api/v1/pos/all

AUTH:
 api/v1/auth/signup
 api/v1/auth/login

