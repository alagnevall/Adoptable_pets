import numpy as np
import pandas as pd
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from config import user, password 
from flask import Flask, jsonify, render_template, request, Response


#################################################
# Database Setup
#################################################
engine = create_engine(f"postgresql://{user}:{password}@localhost:5432/pets_db")
print(engine)
# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
print(Base.classes.keys())

# Adoption = Base.classes.all_pets
adoption = Base.classes.adoptable_pets
# zips = Base.classes.postcodes

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def API_doc():
    """API Documentation"""
    return render_template("index.html")
    

@app.route("/Adoption/1.0.2/animals")
def animals():
    # Create our session (link) from Python to the DB
    session = Session(engine)


    # Query all animals
    results = session.query(adoption)

    data = pd.read_sql(results.statement, engine)
    petdata = data.to_dict(orient="records")

    return jsonify(petdata)

    session.close()
  
if __name__ == "__main__":
    app.run(debug=True)