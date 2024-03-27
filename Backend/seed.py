# These are the imports which will setup the functions used in this file.
from app import app
from models import db, Transaction, Member, Books


# import json
# import random
# import flask
from flask import Flask


# from flask_bcrypt import Bcrypt
from faker import Faker


# We're assigning variables to our desired funcitons here so that we can call them within future Models.
# bcrypt = Bcrypt()
fake = Faker()


if __name__ == "__main__":
    with app.app_context():

        # We're going to go ahead and "seed" our database with made up members, transactions, and books.
        def seed_database():
            for i in range(5):
                member = Member(name=fake.name(), email=fake.email())
                # The following command is how we add the faked member to our database.
                db.session.add(member)

            for i in range(5):
                transaction = Transaction(
                    book_id=fake.name(),
                    member_id=fake.name(),
                    borrowed_on=fake.date(),
                    fee_per_day=fake.random_number(digits=2),
                )
                db.session.add(transaction)

            for i in range(5):
                book = Books(
                    isbn=fake.isbn13(),
                    title=fake.sentence(),
                    author=fake.name(),
                    image=fake.image_url(),
                )
                db.session.add(book)

            # We're not done just as of yet. We've created our fake data, and we've added said fake data to our databse, but we've not commited our changes just yet. So we're going to go ahead commit with the following command.
            db.session.commit()

        # Finally, when we're ready to seed our database we call our function.
        seed_database()
