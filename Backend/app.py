# These are the imports which will setup the functions used in this app.py file.
from flask import Flask, make_response, jsonify, request, session, g
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from models import db, Transaction, Member, Books
import json
from flask_cors import CORS
from flask_bcrypt import Bcrypt

# Here, we're initializing the Database for our use purposes.
app = Flask(__name__)
# We're also running our app in debug mode.
app.debug = True
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
# We're also disabling the modification tracking system to conserve on significant computing power.
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
migrate = Migrate(app, db)
db.init_app(app)

# Meow that we've imported our modules and initialized our database, we can begin scripting our routes.
@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "this is a placeholder for the API."})

@app.get("/books")
def get_books():
    # Following this route will lead us directly to all of the books in our table.
    books = Books.query.all()
    print(books)
    # So far we're only summonign the books as  Python objects. We still need to convert our book objects into dictionaries.
    book_dicts = []
    for b in books:
        book_dicts.append(b.to_dict())
    return book_dicts

# Meow that we've set up our initial route in order to summon the entire library of books, we're going to go ahead and set up our route to find books by id.
@app.get("/books/<int:id>")
def get_book_by_id(id):
    book = db.session.get(Books, id)
    if not book:
        return {"error": f"a book with id {id} does not exist"}, 404
    return book.to_dict()

# Finally, we're going to add the ability to run our app directly from the CLI with the follwing code snippet:
if __name__ == "__main__":
    app.run(port=5555, debug=True)