package main

import (
	"kokosalah45/tcp-server/internal/server"
)


func main(){

	server := server.NewServer(":3001")

	server.Start()
}