import motor.motor_asyncio
from dotenv import load_dotenv
import os


load_dotenv()

MONGO_URI= os.getenv("MONGO_URI","")
DB_NAME= os.getenv("DB_NAME","")

# client

client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URI)
db = client[DB_NAME]