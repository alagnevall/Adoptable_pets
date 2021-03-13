select
species,
count(species)
from adoptable_pets
group by species
order by count(species) desc