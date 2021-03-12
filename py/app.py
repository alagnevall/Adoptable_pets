import numpy as np
import pandas as pd
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from config import user, password 
from flask import Flask, jsonify, render_template, request, Response
from flask_cors import CORS


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
CORS(app)


#################################################
# Flask Routes
#################################################

@app.route("/")

def API_doc():
    """API Documentation"""
    return render_template("index.html")
    

@app.route("/Adoption/1.0.2/animals")

def animals():
    #Create filtering for parameters
    # page = request.args.get('page', default = 1, type = int)
    status = request.args.get('status', default = '%', type = str)
    type = request.args.get('type', default = '%', type = str)
    breeds = request.args.get('breeds', default = '%', type = str)
    color = request.args.get('color', default = '%', type = str)
    age = request.args.get('age', default = '%', type = str)
    gender = request.args.get('gender', default = '%', type = str)
    size = request.args.get('size', default = '%', type = str)
    coat = request.args.get('coat', default = '%', type = str)
    # limit = request.args.get('limit', default = 20, type = int)
    

    # Create our session (link) from Python to the DB
    session = Session(engine)


    # Query all animals
    results = session.query(adoption).filter(adoption.type.like(type)).\
        filter(adoption.status.like(status)).\
        filter(adoption.primary_breed.like(breeds)).\
        filter(adoption.primary_color.like(color)).\
        filter(adoption.age.like(age)).\
        filter(adoption.gender.like(gender)).\
        filter(adoption.size.like(size)).\
        filter(adoption.coat_length.like(coat)).\
        filter(adoption.status.like(status))
        # paginate(page = page, per_page = limit)


    data = pd.read_sql(results.statement, engine)
    petdata = data.to_dict(orient="records")

    return jsonify(petdata)

    session.close()
  
if __name__ == "__main__":
    app.run(debug=True)