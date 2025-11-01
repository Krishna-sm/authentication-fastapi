from fastapi import APIRouter,HTTPException,status,Depends
from fastapi.security import HTTPBearer,HTTPAuthorizationCredentials
from src.models.User import User as UserModel,LoginUser,UpdateUser
from src.config.db import db as MongoDB
import bcrypt
import bson
import os 
from dotenv import load_dotenv


import jwt


load_dotenv()

JWT_AUTH= os.getenv("JWT_AUTH","")
security  = HTTPBearer()


# berarer token
async def get_current_user(credentials:HTTPAuthorizationCredentials=Depends(security)):
    try:
        token = credentials.credentials
        payload = jwt.decode(token,JWT_AUTH,algorithms=["HS256"])
        return payload['userId']
    except  :
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="Invalid Token")




router = APIRouter(prefix="/api/v1/auth")

# collection 
authCollection = MongoDB['user']

@router.post("/register")
async def registerUser(data:UserModel):
    data = data.dict()
    # check existatnce of user 
    check_exist = await authCollection.find_one({"email":data['email'].lower()})
    if check_exist:
        raise HTTPException(status.HTTP_400_BAD_REQUEST,"User Already Exist with this email")
        return

    salt = bcrypt.gensalt(10)
    data['password'] = bcrypt.hashpw(data['password'].encode(),salt).decode()
    print(data)
    doc= await authCollection.insert_one(data)
    document = await authCollection.find_one({"_id":doc.inserted_id},{
        "name":1,
        "email":1,
        "address":1,
        "mobile":1
    })

    document['_id'] =  str(document['_id'])
    # print(doc)
    #token
    token =jwt.encode({"userId": document['_id'] },JWT_AUTH,algorithm="HS256")

    return {
        "msg":"User Register Successfully",
        "token":token,
        # "document":document
    }




@router.post("/login")
async def registerUser(data:LoginUser):
    data = data.dict()
    # check existatnce of user 
    check_exist = await authCollection.find_one({"email":data['email'].lower()},{
       
    })
    if not check_exist:
        raise HTTPException(status.HTTP_400_BAD_REQUEST,"User Does not Have Account")
        return

    is_match = bcrypt.checkpw(data['password'].encode(), check_exist['password'].encode())

    if not is_match:
        raise HTTPException(status.HTTP_400_BAD_REQUEST,"Invalid Credentials")
        return
    print(data)


    check_exist['_id'] =  str(check_exist['_id'])
    del check_exist['password']
    # print(doc)
    token =jwt.encode({"userId": check_exist['_id'] },JWT_AUTH,algorithm="HS256")


    return {
        "msg":"User Login Successfully",
        "token":token,
        # "document":document
    }



@router.get("/profile")
async def userProfile(data:str = Depends(get_current_user)):
    user = await authCollection.find_one({"_id":bson.ObjectId(data)},{
        "password":0
    })
    user['_id'] = str(user['_id'])
    return user




@router.put("/profile")
async def userProfile(data:UpdateUser,user:str = Depends(get_current_user)):

    await authCollection.find_one_and_update({"_id":bson.ObjectId(user)},{
        "$set":data.dict()
    })
    return {
        "msg":"Profile Updated !"
    }
    # user = await authCollection.find_one({"_id":bson.ObjectId(data)},{
    #     "password":0
    # })
    # user['_id'] = str(user['_id'])
    # return user
