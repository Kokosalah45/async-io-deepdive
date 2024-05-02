package server

import (
	"fmt"
	"log"
	"net"
)




type TCPServer struct {
	listenAddr  string
	listener net.Listener
}

func NewServer(address string) *TCPServer {
	return &TCPServer{
		listenAddr: address,
	}
}



func (s *TCPServer) Start () {
	listener , err := net.Listen("tcp" , s.listenAddr)

	if err != nil {
		log.Fatal("Couldn't start server" , err)
	}

	
	defer listener.Close()

	s.listener = listener

	go s.startConnectionsPolling()
}	

func (s *TCPServer) startConnectionsPolling(){
	for {
		conn , err := s.listener.Accept()

		if err != nil {
			log.Fatal("Couldn't get connection" , err)
			continue // to keep listening
		}

		go s.handleConnection(conn)
	}
}


func (s *TCPServer) handleConnection(conn net.Conn){
	defer conn.Close()

	buff := make([]byte , 2048)

	for {
		n , err := conn.Read(buff)

		if err != nil {
			fmt.Println("read error: " , err)
			return 
		}

		msg := buff[:n]

		fmt.Println(string(msg))
	}
}