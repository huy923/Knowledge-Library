import ollama, os, glob,json
from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

app = FastAPI()

# EMBEDDING_MODEL = 'hf.co/CompendiumLabs/bge-base-en-v1.5-gguf'
EMBEDDING_MODEL = 'nomic-embed-text'
LANGUAGE_MODEL = 'hf.co/bartowski/Llama-3.2-1B-Instruct-GGUF'

VECTOR_DB_PATH = 'vector.json'
# Each element in the VECTOR_DB will be a tuple (chunk, embedding)
# The embedding is a list of floats, for example: [0.1, 0.04, -0.34, 0.21, ...]
VECTOR_DB = []

if os.path.exists(VECTOR_DB_PATH) is None:
	print(f'No vector database found at {VECTOR_DB_PATH}. Please run textToVector.py first.')
	exit()

with open(VECTOR_DB_PATH, 'r', encoding='utf-8') as file:
	VECTOR_DB = json.load(file)
print(f'Loaded {len(VECTOR_DB)} entries from saved vector database.')
def cosine_similarity(a, b):
	dot_product = sum([x * y for x, y in zip(a, b)])
	norm_a = sum([x ** 2 for x in a]) ** 0.5
	norm_b = sum([x ** 2 for x in b]) ** 0.5
	return dot_product / (norm_a * norm_b)

def retrieve(query, top_n=10, temperature=0.7, max_tokens = 100):
	query_embedding = ollama.embed(model=EMBEDDING_MODEL, input=query)['embeddings'][0]
	# temporary list to store (chunk, similarity) pairs
	similarities = []
	for chunk, embedding in VECTOR_DB:
		similarity = cosine_similarity(query_embedding, embedding)
		similarities.append((chunk, similarity))
	# sort by similarity in descending order, because higher similarity means more relevant chunks
	similarities.sort(key=lambda x: x[1], reverse=True)
	# finally, return the top N most relevant chunks
	print(similarities[:top_n])
	return similarities[:top_n]

class ChatRequest(BaseModel):
	input_query: str
	history: List[str] = []
	system_message: str = ""
	max_tokens: int = 100
	temperature: float = 0.7
	top_p: int = 10


@app.post('/chatbot')
async def chatbot(chat_request: ChatRequest):
	input_query = chat_request.input_query
	history = [msg for msg in chat_request.history if msg is not None]
	system_message = chat_request.system_message
	top_p = chat_request.top_p
	temperature = chat_request.temperature
	max_tokens = chat_request.max_tokens

	print(f"System message: {system_message} , top_p: {top_p}, temperature: {temperature}, max_tokens: {max_tokens}")

	retrieved_knowledge = retrieve(query=input_query,top_n=top_p,temperature=temperature,max_tokens=max_tokens)
	
	# for chunk, similarity in retrieved_knowledge:
	#     print(f' - (similarity: {similarity:.2f}) {chunk}')
	# instruction_prompt = f'''{chat_request.system_message}:
	# {'\n'.join([f' - {chunk}' for chunk, similarity in retrieved_knowledge])}
	# '''
	
	instruction_prompt = f'''You are a helpful chatbot.
  Use only the following pieces of context to answer the question. Don't make up any new information:
  {'\n'.join([f' - {chunk}' for chunk, similarity in retrieved_knowledge])}
  '''
	# instruction_prompt = f'''Bạn là trợ lý AI thân thiện.Chỉ sử dụng các phần sau của bối cảnh để trả lời câu hỏi. Đừng tạo ra bất kỳ thông tin mới nào:{'\n'.join([f' - {chunk}' for chunk, similarity in retrieved_knowledge])}'''
#     instruction_prompt = f'''You are a helpful chatbot.
# Use only the following pieces of context to answer the question. Don't make up any new information:
# {'\n'.join([f' - {chunk}' for chunk, similarity in retrieved_knowledge])}
# '''
	print(instruction_prompt)
	stream = ollama.chat(
		model=LANGUAGE_MODEL,
		messages=[
			{'role': 'system', 'content': instruction_prompt},
			{'role': 'user', 'content': input_query},
		],
		stream=True,
	)

	response_text = ""
	for chunk in stream:
		# token = chunk.get("message", {}).get("content", "")
		token = chunk['message']['content']
		# print(token)
		response_text += token
		
	return {"response": response_text}

