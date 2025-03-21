package main

import (
    "fmt"
    "io/ioutil"
    "log"
    "net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
    log.Println("Received request at Service C") // Log when a request is received

    // Create a new HTTP client
    client := &http.Client{}

    // Construct a request to Service D
    req, err := http.NewRequest("GET", "http://service-d:5003/d", nil)
    if err != nil {
        log.Printf("Error creating request: %v", err) // Log the error
        http.Error(w, "Internal Server Error", http.StatusInternalServerError)
        return
    }
    log.Println("Sending request to Service D") // Log before sending request

    // Send the request to Service D
    resp, err := client.Do(req)
    if err != nil {
        log.Printf("Error connecting to Service D: %v", err) // Log the error
        http.Error(w, "Internal Server Error: Could not reach Service D", http.StatusInternalServerError)
        return
    }
    defer resp.Body.Close()

    // Read the response from Service D
    body, err := ioutil.ReadAll(resp.Body)
    if err != nil {
        log.Printf("Error reading response from Service D: %v", err) // Log the error
        http.Error(w, "Internal Server Error: Unable to read response", http.StatusInternalServerError)
        return
    }
    log.Println("Successfully connected to Service D") // Log on successful connection

    // Send the response back to the caller
    fmt.Fprintf(w, "Service C -> %s", body)
}

func main() {
    // Set up the HTTP server
    http.HandleFunc("/c", handler)
    log.Println("Service C running on port 5002") // Log when the service starts
    log.Fatal(http.ListenAndServe(":5002", nil))  // Start the server
}

