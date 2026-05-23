from sqlalchemy import Boolean, Column, String, Integer
from database import Base

class Crane(Base):
    __tablename__ = "cranes"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, index=True)
    capacity = Column(String)
    reach = Column(String)
    image = Column(String)
    pdf = Column(String)
    featured = Column(Boolean, default=False)

class Order(Base):
    __tablename__ = "orders"

    id = Column(String, primary_key=True, index=True)
    crane_id = Column(String)
    crane_name = Column(String)
    customer_name = Column(String)
    phone = Column(String)
    email = Column(String, nullable=True)
    rental_date = Column(String)
    details = Column(String, nullable=True)
    status = Column(String)
    created_at = Column(String)

class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String)
    email = Column(String)
    content = Column(String)
    created_at = Column(String)
    status = Column(String, default="Nowe")
