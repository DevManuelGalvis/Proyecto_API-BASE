# 🤖 Chatbot API experto en Python
Este proyecto es una API REST basada en FastAPI que funciona como un chatbot experto en Python. Utiliza el modelo Mistral a través de OpenRouter (compatible con la API de OpenAI) para generar respuestas conversacionales.

## 🚀 Requisitos
- Python 3.8 o superior
- Tener una API Key de OpenRouter
- Conexión a internet

## 🛠 Instalación
1. Clona este repositorio o descarga los archivos
2. Crea un entorno virtual:
```bash
python -m venv venv  
```
3. Activa el entorno virtual:
   - Windows: venv\Scripts\activate
   - macOS/Linux: source venv/bin/activate
4. Instala las dependencias:
```bash
pip install -r requirements.txt  
```
5. Crea un archivo .env en la raíz del proyecto con:
```env
API_KEY=tu_api_key_de_openrouter  
BASE_URL=https://openrouter.ai/api/v1  
```

## ▶ Ejecución
Inicia el servidor con:
```bash
uvicorn main:app --reload  
```
- API disponible en: http://127.0.0.1:8000
- Documentación Swagger UI: http://127.0.0.1:8000/docs

## 📬 Ejemplo de uso
Petición POST a /chat:
```json
{"pregunta": "¿Qué es una lista en Python?"}  
```
Respuesta esperada:
```json
{"respuesta": "Una lista en Python es una colección ordenada y mutable de elementos..."}  
```

## 🐳 Despliegue con Docker
Construye la imagen:
```bash
docker build -t python-chatbot .  
```
Ejecuta el contenedor:
```bash
docker run -d -p 8000:8000 --name chatbot --env-file .env python-chatbot  
```

## ☁️ Despliegue en Render
1. Crea un nuevo "Web Service" en Render
2. Conecta tu repositorio GitHub
3. Configura las variables de entorno
4. Usa este comando de inicio:
```bash
uvicorn main:app --host 0.0.0.0 --port 8000  
```

## 📁 Estructura del proyecto
```
chatbot-ia_python/  
├── main.py           # API con FastAPI  
├── config.py         # Contiene el PROMPT_SISTEMA  
├── .env              # Variables de entorno  
├── requirements.txt  # Dependencias  
├── Dockerfile        # Configuración para Docker  
└── README.md  
```

## 👨‍💻 Autor
Ing. Cristian Díaz

---
<p align="center">
  <img width="300" src="https://i.imgur.com/YYf2LgH.png">
</p>
