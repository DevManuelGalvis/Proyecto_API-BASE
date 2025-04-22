from openai import OpenAI
from config import PROMPT_SISTEMA
import os
from dotenv import load_dotenv

# Cargar variables del archivo .env
load_dotenv()

API_KEY = os.getenv("API_KEY")
BASE_URL = os.getenv("BASE_URL")

client = OpenAI(api_key=API_KEY, base_url=BASE_URL)

def obtener_respuesta(pregunta):
    try:
        response = client.chat.completions.create(
            model="mistralai/mistral-small-3.1-24b-instruct:free",
            messages=[
                {"role": "system", "content": PROMPT_SISTEMA},
                {"role": "user", "content": pregunta}
            ],
            stream=False
        )

        respuesta = response.choices[0].message.content.strip()
        if not respuesta:
            return "No estoy seguro de cómo responder a eso. ¿Puedes reformular la pregunta?"
        
        return respuesta
    except Exception as e:
        return f"Error en la API: {e}"


print("Chatbot: ¡Hola! Soy un experto en Python. Pregunta lo que quieras.")

while True:
    usuario = input("Usuario: ")
    if usuario.lower() in ["salir", "adios", "chao"]:
        print("Chatbot: ¡Hasta luego!")
        break

    respuesta = obtener_respuesta(usuario)
    print(f"Chatbot: {respuesta}")
