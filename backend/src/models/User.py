from pydantic import BaseModel,Field,EmailStr
from typing import Union
from datetime import datetime
class User(BaseModel):
    name :str  =Field(...,description="Name is Required")
    email:EmailStr =Field(...,description="Email is Required")
    password:str =Field(...,description="Password is Required")
    #optional db field
    create_at: datetime = datetime.now() 
    address:str =""
    mobile:str  =""


class LoginUser(BaseModel):
    email:EmailStr =Field(...,description="Email is Required")
    password:str =Field(...,description="Password is Required")

class UpdateUser(BaseModel):
    name :str  =Field(...,description="Name is Required")
    address:str 
    mobile:str