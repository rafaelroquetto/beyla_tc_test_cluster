#include <iostream>
#include <string>
#include <sstream>
#include <thread>
#include <vector>
#include <cstring>
#include <netinet/in.h>
#include <unistd.h>

void handle_request(const int client_socket)
{
    // HTTP response content
    const std::string response_body = "Service E -> Hello from Service E";
    const std::string response = 
        "HTTP/1.1 200 OK\r\n"
        "Content-Length: " + std::to_string(response_body.length()) + "\r\n"
        "Content-Type: text/plain\r\n"
        "Connection: close\r\n\r\n" +
        response_body;

    // Send the response
    send(client_socket, response.c_str(), response.length(), 0);

    // Close the socket
    close(client_socket);
}

void run_server()
{
    // Create socket
    const int server_socket = socket(AF_INET, SOCK_STREAM, 0);
    if (server_socket == -1)
    {
        std::cerr << "Failed to create socket" << std::endl;
        return;
    }

    // Bind socket to port
    sockaddr_in server_address = {};
    server_address.sin_family = AF_INET;
    server_address.sin_addr.s_addr = INADDR_ANY;
    server_address.sin_port = htons(5004);

    if (bind(server_socket, reinterpret_cast<sockaddr*>(&server_address), sizeof(server_address)) == -1)
    {
        std::cerr << "Failed to bind socket" << std::endl;
        close(server_socket);
        return;
    }

    // Listen for connections
    if (listen(server_socket, 5) == -1)
    {
        std::cerr << "Failed to listen on socket" << std::endl;
        close(server_socket);
        return;
    }

    std::cout << "Service E running on port 5004" << std::endl;

    // Accept connections and handle requests
    while (true)
    {
        sockaddr_in client_address = {};
        socklen_t client_address_length = sizeof(client_address);
        const int client_socket = accept(server_socket, reinterpret_cast<sockaddr*>(&client_address), &client_address_length);

        if (client_socket == -1)
        {
            std::cerr << "Failed to accept connection" << std::endl;
            continue;
        }

        // Handle the request in a separate thread
        std::thread(handle_request, client_socket).detach();
    }

    close(server_socket);
}

int main()
{
    run_server();
    return 0;
}

