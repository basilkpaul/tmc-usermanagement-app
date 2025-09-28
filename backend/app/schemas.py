from pydantic import BaseModel
from datetime import date

class UserBase(BaseModel):
    firstname: str
    lastname: str
    age: int
    dob: date

class UserCreate(UserBase):
    pass

class User(UserBase):
    id: int
    class Config:
        orm_mode = True