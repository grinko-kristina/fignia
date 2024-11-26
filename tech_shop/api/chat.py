import os
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.messages import SystemMessage, HumanMessage
from langchain.memory import ConversationBufferWindowMemory
from langchain_core.runnables.history import RunnableWithMessageHistory


class ChatbotService:
    def __init__(self, model='llama3-8b-8192'):
        groq_api_key = os.getenv('GROQ_API_KEY', '')

        self.groq_chat = ChatGroq(
            groq_api_key=groq_api_key,
            model_name=model
        )

        self.memory = ConversationBufferWindowMemory(
            max_token_limit=1000,
            return_messages=True
        )

    def get_response(self, user_input):
        # Створення prompt з історією повідомлень
        messages = [
            SystemMessage(content="Ти дружній AI асистент. Допомагай користувачам коротко і змістовно."),
        ]

        # Додавання попередніх повідомлень з пам'яті
        messages.extend(self.memory.chat_memory.messages[-5:])
        messages.append(HumanMessage(content=user_input))

        # Отримання відповіді
        response = self.groq_chat.invoke(messages).content

        # Збереження в пам'яті
        self.memory.chat_memory.add_user_message(user_input)
        self.memory.chat_memory.add_ai_message(response)

        return response