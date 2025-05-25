from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from openai import OpenAI
from config import PROMPT_SISTEMA
from dotenv import load_dotenv
import os

# Cargar variables de entorno
load_dotenv()

API_KEY = os.getenv("API_KEY")
BASE_URL = os.getenv("BASE_URL")

client = OpenAI(api_key=API_KEY, base_url=BASE_URL)

# Inicializar FastAPI
app = FastAPI()

# Modelo de entrada
class Pregunta(BaseModel):
    pregunta: str

# Ruta principal de la API
@app.post("/chat")
def obtener_respuesta(p: Pregunta):
    try:
        response = client.chat.completions.create(
            model="mistralai/mistral-small-3.1-24b-instruct:free",
            messages=[
                {"role": "system", "content": PROMPT_SISTEMA},
                {"role": "user", "content": p.pregunta}
            ],
            stream=False
        )

        respuesta = response.choices[0].message.content.strip()
        if not respuesta:
            respuesta = "No estoy seguro de cómo responder a eso. ¿Puedes reformular la pregunta?"

        return {"respuesta": respuesta}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
