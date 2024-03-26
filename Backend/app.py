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
    return jsonify({"message": "Welcome to our library homepage."})

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
    return book.to_dict(), 200

# The following code is the same as the aforementioned code, it's just streamlined.
@app.route("/members", methods=["GET"])
def get_members():
    members = Member.query.all()
    return jsonify([member.to_dict() for member in members])

@app.route("/members/<int:member_id>", methods=["GET"])
def get_member(member_id):
    member = Member.query.get(member_id)
    if member is None:
        return jsonify({"error": "Member not found"}), 404
    return jsonify(member.to_dict()), 200

@app.route("/transactions", methods=["GET"])
def get_transactions():
    transactions = Transaction.query.all()
    return jsonify([transaction.to_dict() for transaction in transactions])

# We're making minor changes in the routing code to reflect the ability to execute the CrUD of CRUD.
@app.route("/books", methods=["POST"])
def add_book():
    data = request.get_json()
    new_book = Books(isbn=data['isbn'], title=data['title'], author=data['author'], image=data['image'])
    db.session.add(new_book)
    db.session.commit()
    return jsonify(new_book.to_dict()), 201

@app.route("/members/<int:member_id>", methods=["DELETE"])
def delete_member(member_id):
    member = Member.query.get(member_id)
    if member is None:
        return jsonify({"error": "Member not found"}), 404
    db.session.delete(member)
    db.session.commit()
    return jsonify({"message": "Member successfully deleted"}), 200

@app.route("/transactions/<int:transaction_id>", methods=["PATCH"])
def update_transaction(transaction_id):
    data = request.get_json()
    transaction = Transaction.query.get(transaction_id)
    if transaction is None:
        return jsonify({"error": "Transaction not found"}), 404
    transaction.borrowed_on = data.get('borrowed_on', transaction.borrowed_on)
    transaction.fee_per_day = data.get('fee_per_day', transaction.fee_per_day)
    db.session.commit()
    return jsonify(transaction.to_dict()), 200

# Finally, we're going to add the ability to run our app directly from the CLI with the follwing code snippet:
if __name__ == "__main__":
    app.run(port=5555, debug=True)