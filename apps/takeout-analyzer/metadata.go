package main

import (
	"database/sql"
	"fmt"
	"strings"

	_ "github.com/mattn/go-sqlite3"

	"encoding/json"
	"os"
	"path/filepath"
)

const maxFiles = 1000000000

type Metadata struct {
	Title              string   `json:"title"`
	Description        string   `json:"description"`
	ImageViews         string   `json:"imageViews"`
	CreationTime       Time     `json:"creationTime"`
	PhotoTakenTime     Time     `json:"photoTakenTime"`
	GeoData            Geo      `json:"geoData"`
	GeoDataExif        Geo      `json:"geoDataExif"`
	People             []Person `json:"people"`
	URL                string   `json:"url"`
	GooglePhotosOrigin struct {
		MobileUpload struct {
			DeviceType string `json:"deviceType"`
		} `json:"mobileUpload"`
	} `json:"googlePhotosOrigin"`
}

type Time struct {
	Timestamp string `json:"timestamp"`
	Formatted string `json:"formatted"`
}

type Geo struct {
	Latitude      float64 `json:"latitude"`
	Longitude     float64 `json:"longitude"`
	Altitude      float64 `json:"altitude"`
	LatitudeSpan  float64 `json:"latitudeSpan"`
	LongitudeSpan float64 `json:"longitudeSpan"`
}

type Person struct {
	Name string `json:"name"`
}

const sqlStmt = `
CREATE TABLE IF NOT EXISTS metadata (
    title TEXT,
    description TEXT,
    imageViews INTEGER,
    creationTimeTimestamp INTEGER,
    creationTimeFormatted TEXT,
    photoTakenTimeTimestamp INTEGER,
    photoTakenTimeFormatted TEXT,
    geoDataLatitude REAL,
    geoDataLongitude REAL,
    geoDataAltitude REAL,
    geoDataLatitudeSpan REAL,
    geoDataLongitudeSpan REAL,
    geoDataExifLatitude REAL,
    geoDataExifLongitude REAL,
    geoDataExifAltitude REAL,
    geoDataExifLatitudeSpan REAL,
    geoDataExifLongitudeSpan REAL,
    people TEXT,
    url TEXT UNIQUE,
    googlePhotosOriginDeviceType TEXT
);
`

func AnalyzeMetadata(rootPath string) error {
	db, err := sql.Open("sqlite3", "./__data/metadata.sqlite")
	count := 0

	if err != nil {
		return err
	}

	defer db.Close()

	_, err = db.Exec(sqlStmt)
	if err != nil {
		return err
	}

	insertStmt, err := db.Prepare(`
    INSERT OR REPLACE INTO metadata(
        title, 
        description, 
        imageViews, 
        creationTimeTimestamp, 
        creationTimeFormatted, 
        photoTakenTimeTimestamp, 
        photoTakenTimeFormatted, 
        geoDataLatitude, 
        geoDataLongitude, 
        geoDataAltitude, 
        geoDataLatitudeSpan, 
        geoDataLongitudeSpan, 
        geoDataExifLatitude, 
        geoDataExifLongitude, 
        geoDataExifAltitude, 
        geoDataExifLatitudeSpan, 
        geoDataExifLongitudeSpan, 
        people, 
        url, 
        googlePhotosOriginDeviceType
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`)
	if err != nil {
		return err
	}
	defer insertStmt.Close()

	err = filepath.Walk(rootPath, func(path string, info os.FileInfo, err error) error {
		if count > maxFiles {
			return nil
		}

		if err != nil {
			return err
		}

		if !info.IsDir() && filepath.Ext(path) == ".json" {
			data, err := os.ReadFile(path)
			if err != nil {
				return err
			}

			var metadata Metadata
			err = json.Unmarshal(data, &metadata)
			if err != nil {
				return err
			}

			fmt.Println(count, ": ", metadata.URL)

			var peopleNames []string
			for _, person := range metadata.People {
				peopleNames = append(peopleNames, person.Name)
			}
			peopleNamesStr := strings.Join(peopleNames, ",")

			_, err = insertStmt.Exec(
				metadata.Title,
				metadata.Description,
				metadata.ImageViews,
				metadata.CreationTime.Timestamp,
				metadata.CreationTime.Formatted,
				metadata.PhotoTakenTime.Timestamp,
				metadata.PhotoTakenTime.Formatted,
				metadata.GeoData.Latitude,
				metadata.GeoData.Longitude,
				metadata.GeoData.Altitude,
				metadata.GeoData.LatitudeSpan,
				metadata.GeoData.LongitudeSpan,
				metadata.GeoDataExif.Latitude,
				metadata.GeoDataExif.Longitude,
				metadata.GeoDataExif.Altitude,
				metadata.GeoDataExif.LatitudeSpan,
				metadata.GeoDataExif.LongitudeSpan,
				peopleNamesStr,
				metadata.URL,
				metadata.GooglePhotosOrigin.MobileUpload.DeviceType,
			)
			if err != nil {
				return err
			}

			count++

			if count > maxFiles {
				return nil
			}
		}

		return nil
	})

	return err
}
