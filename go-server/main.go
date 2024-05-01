package main

import (
	"log"
	"net"
)




func handleConnection(conn net.Conn){
	defer conn.Close()
	
 
}


func main(){

	listener , err := net.Listen("tcp" , ":4000")

	if err != nil {
		log.Fatal("Couldn't create the server")
	}
	for {
		conn , err := listener.Accept()

		if err != nil {
			log.Fatal("Couldn't initiate the connection")
		}

		go handleConnection(conn)
		
	}
}