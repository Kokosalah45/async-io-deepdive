package main

import (
	"fmt"
	"log"
	"net"
)




func handleConnection(conn net.Conn){
	fmt.Println(conn)
	buff := make([]byte , 2048)
	conn.Read(buff)
	fmt.Println(string(buff))
	conn.Write(buff)
 
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