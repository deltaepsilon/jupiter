package main

import (
	"fmt"
	"os"
)

func main() {
	if len(os.Args) < 2 {
		fmt.Println("Please provide a filepath as an argument")
		return
	}

	filepath := os.Args[1]

	fmt.Println("Analyzing...", filepath)
	AnalyzeMetadata(filepath)
}
