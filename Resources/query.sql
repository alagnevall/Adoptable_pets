DROP TABLE IF EXISTS all_pets;
DROP TABLE IF EXISTS all_pets_locs;

CREATE TABLE all_pets AS
SELECT * FROM dogs
UNION
SELECT * FROM cats
UNION
SELECT * FROM rabbits
UNION 
SELECT * FROM horses
UNION 
SELECT * FROM birds
UNION
SELECT * FROM barnyard
UNION
SELECT * FROM small_furry
UNION
SELECT * FROM scales_fins_others
;

CREATE TABLE all_pets_locs AS
SELECT pa.id, pa.name, pa.age, pa.gender, pa.size, pa.mixed, pa.primary_breed, pa.secondary_breed, pa.coat_length, pa.primary_color, pa.secondary_color, pa.declawed, pa.house_trained, pa.shots_current, pa.spayed_neutered, pa.special_needs, pa.good_with_cats, pa.good_with_children, pa.good_with_dogs, pa.species, pa.photo, pa.address, pa.city, pa.state, pa.postcode,pa.country, pc.latitude, pc.longitude, pa.status
FROM all_pets AS pa
INNER JOIN postcodes AS pc ON pa.postcode = pc.postcode
;


SELECT * FROM all_pets;