import numpy as np
import json
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from config import user, password 
from flask import Flask, jsonify, render_template, request, Response
# from flask_marshmallow import Marshmallow

#################################################
# Database Setup
#################################################
engine = create_engine(f"postgresql://{user}:{password}@localhost:5432/pets_db")
# print(engine)
# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
print(Base.classes.keys())

# Adoption = Base.classes.all_pets
Adoption = Base.classes.dogs

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
    results = session.query(Adoption)
    session.close()

    # Convert list of tuples into normal list
    # all_names = list(np.ravel(results))

    # return(f'{type(results)}')
    return Response(json.dumps(results), mimetype='application/json')

if __name__ == "__main__":
    app.run(debug=True)