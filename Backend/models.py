from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
import string, datetime

metadata = MetaData(
    naming_convention={
        "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    }
)
db = SQLAlchemy(metadata=metadata)

class Transaction(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key = True)
    book_id = db.Column(db.String, db.ForeignKey("books.id"))
    member_id = db.Column(db.String, db.ForeignKey("members.id"))
    borrowed_on = db.Column(db.String, nullable = False)
    fee_per_day = db.Column(db.String, nullable = False)
    serialize_rules = ['-book.transactions','-member.transactions'] 
    book = db.relationship("Books", back_populates='transactions')
    member = db.relationship("Member", back_populates='transactions')

class Member(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False)
    email = db.Column(db.String, nullable = False)
    serialize_rules = ['-transactions.member']
    transactions= db.relationship("Transaction", back_populates= "member")

    @validates('name')
    def validate_title(self, key, name):
        for char in name:
            if not (("A" <= char and char <= "Z") or ("a" <= char and char <= "z") or (char == " ")):
                raise AttributeError('Invalid Name')
            return name

class Books(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key = True)
    isbn = db.Column(db.String, nullable = False)
    title = db.Column(db.String, nullable = False)
    author = db.Column(db.String, nullable = False)
    serialize_rules = ['-transactions.book']
    transactions= db.relationship("Transaction", back_populates= "book")
    image = db.Column(db.String, nullable = False)

    @validates('title')
    def validate_title(self, key, title):
        if title != str:
            raise AttributeError('Invalid Title')
        return title