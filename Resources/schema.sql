DROP TABLE IF EXISTS adoptable_pets;
DROP TABLE IF EXISTS postcodes;


CREATE TABLE "adoptable_pets" (
	"id" integer PRIMARY KEY,
	"name" varchar,
	"age" varchar,
	"gender" varchar,
	"size" varchar,
	"mixed" varchar,
	"primary_breed" varchar,
	"secondary_breed" varchar,
	"coat_length" varchar,
	"primary_color" varchar,
	"secondary_color" varchar,
	"declawed" varchar,
	"house_trained" varchar,
	"shots_current" varchar,
	"spayed_neutered" varchar,
	"special_needs" varchar,
	"good_with_cats" varchar,
	"good_with_children" varchar,
	"good_with_dogs" varchar,
	"species" varchar,
	"photo" varchar,
	"address" varchar,
	"city" varchar,
	"state" varchar,
	"postcode" varchar,
	"country" varchar,
	"status" varchar
); 

CREATE TABLE postcodes (
	"postcode" integer PRIMARY KEY,
	"latitude" decimal(8,6),
	"longitude" decimal(8,5)
);

SELECT * FROM adoptable_pets;